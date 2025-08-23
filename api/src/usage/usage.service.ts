import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usage } from './usage.entity';



@Injectable()
export class UsageService {
    constructor(
        @InjectRepository(Usage)
        private readonly usageRepo: Repository<Usage>,
    ) { }

    async findByIp(ip: string): Promise<Usage> {
        const record: Usage = await this.usageRepo.findOneOrFail({ where: { ip } })

        return record;
    }

    async update(ip: string): Promise<Usage | null> {

        const record: Usage | null = await this.usageRepo.findOne({ where: { ip } })

        if (!record) {
            const usage = this.usageRepo.create({
                ip,
                hits: 1
            });
            const res = await this.usageRepo.save(usage);
            return res
        } else {
            record.hits += 1
            const res = await this.usageRepo.save(record);
            return res
        }

    }

}
