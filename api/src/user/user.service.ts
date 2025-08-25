import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export interface TokenPayload {
  userId: string;
  expiresAt: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOrCreate(profile: any): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email: profile.email } });
  
    if (!user) {
      // First insert without token
      user = this.userRepository.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture,
      });
  
      user = await this.userRepository.save(user); // now user.id is available
  
      // Generate token with user.id and update
      user.loginToken = this.generateLoginToken(String(user.id));
      user = await this.userRepository.save(user); // update with token
    } else {
      // Refresh token on login
      user.loginToken = this.generateLoginToken(String(user.id));
      user = await this.userRepository.save(user);
    }
  
    return user;
  }
  

  async findUserById(id: string): Promise<User | null> {
    // If your PK is numeric, casting avoids type mismatch issues.
    return this.userRepository.findOne({ where: { id: id } });
  }

  // --- Key derivation helper (stable 32-byte key for AES-256) ---
  private getAesKey(): Buffer {
    const secret = this.configService.get<string>('TOKEN_SECRET') ?? '';
    if (!secret) {
      throw new Error('TOKEN_SECRET is not set');
    }
    // scryptSync(secret, salt, keylen)
    return scryptSync(secret, 'login-token', 32);
  }

  generateLoginToken(userId: string): string {
    console.log(111, 'generate', userId)
    const expiresInMs = 1000 * 60 * 60 * 24; // 24 hours
    const expiresAt = Date.now() + expiresInMs;

    const payload = JSON.stringify({ userId, expiresAt });
    const random = randomBytes(16).toString('hex');

    // Create the data to encrypt (separator is ';')
    const dataToEncrypt = `${payload};${random}`;

    const iv = randomBytes(16);
    const key = this.getAesKey();

    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return "ivHex;cipherHex"
    return `${iv.toString('hex')};${encrypted}`;
  }

  decryptLoginToken(encryptedToken: string): TokenPayload | null {
    try {
      // Expect "ivHex;cipherHex"
      const [ivHex, encryptedData] = encryptedToken.split(';');
      if (!ivHex || !encryptedData) return null;

      const iv = Buffer.from(ivHex, 'hex');
      const key = this.getAesKey();

      const decipher = createDecipheriv('aes-256-cbc', key, iv);
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      // We originally encrypted `${payload};${random}` — split by ';'
      const [jsonPart] = decrypted.split(';'); // ignore the random suffix
      if (!jsonPart) return null;

      console.log(111, { jsonPart})
      const payload: TokenPayload = JSON.parse(jsonPart);
      console.log(111, { payload})
      // Basic shape & expiry checks
    
      // if (Date.now() > payload.expiresAt) {
      //   return null; // expired
      // }

      return payload;
    } catch {
      return null; // invalid/corrupted token
    }
  }

  async validateTokenAndGetUser(encryptedToken: string): Promise<User | null> {
    const payload = this.decryptLoginToken(encryptedToken);
    if (!payload) return null;
    return this.findUserById(payload.userId.toString());
  }

  isTokenExpired(encryptedToken: string): boolean {
    return this.decryptLoginToken(encryptedToken) === null;
  }
}
