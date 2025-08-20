import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOrCreate(profile: any): Promise<User> {
    let user = await this.userRepository.findOne({ where: { email: profile.email } });

    if (!user) {
      user = this.userRepository.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.picture,
      });

      user = await this.userRepository.save(user);

      // Now generate loginToken with userId and update DB
      user.loginToken = this.generateLoginToken(Number(user.id));
      await this.userRepository.save(user);

    } else {
      // Optionally update token on each login
      user.loginToken = this.generateLoginToken(Number(user.id));
      await this.userRepository.save(user);
    }

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

   generateLoginToken(userId: number): string {
    const expiresInMs = 1000 * 60 * 60 * 24; // 24 hours expiry
    const expiresAt = Date.now() + expiresInMs;

    const payload = JSON.stringify({ userId, expiresAt });
    const random = randomBytes(16).toString('hex');

    const token = Buffer.from(`${payload}:${random}`).toString('base64');
    return token;
  }
}
