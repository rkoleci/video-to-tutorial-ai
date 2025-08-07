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
        loginToken: this.generateLoginToken(),
      });

      await this.userRepository.save(user);
    } else {
      // Optionally update token on each login
      user.loginToken = this.generateLoginToken();
      await this.userRepository.save(user);
    }

    return user;
  }

  private generateLoginToken(): string {
    return randomBytes(32).toString('hex');
  }
}
