import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,

    @InjectRepository(Tenant)
    private readonly tenantRepo: Repository<Tenant>,
  ) {}

  async getStates() {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('DISTINCT loc.state', 'state')
      .getRawMany();

    return rows.map(r => r.state);
  }

  async getDistricts(state: string) {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('DISTINCT loc.district', 'district')
      .where('loc.state = :state', { state })
      .getRawMany();

    return rows.map(r => r.district);
  }

  async getMandals(district: string) {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('loc.mandal', 'mandal')
      .where('loc.district = :district', { district })
      .getRawMany();

    return rows.map(r => r.mandal);
  }

  async getTenants() {
    return this.tenantRepo.find();
  }
}
