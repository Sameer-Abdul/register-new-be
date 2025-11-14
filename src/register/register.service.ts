// src/register/register.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';
import { Location } from './entities/location.entity';
import { Tenant } from './entities/tenant.entity';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    
    @InjectRepository(Location)
    private locationRepo: Repository<Location>,
    
    @InjectRepository(Tenant)
    private tenantRepo: Repository<Tenant>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto): Promise<Register> {
    const register = new Register();
    Object.assign(register, createRegisterDto);
  
    // Convert marriageDate string to Date object if it exists
    if (createRegisterDto.marriageDate) {
      register.marriageDate = new Date(createRegisterDto.marriageDate);
    }
    
    return this.registerRepository.save(register);
  }

  async findOne(id: number): Promise<Register> {
    const register = await this.registerRepository.findOne({
      where: { id },
      relations: ['payment'],
    });
    
    if (!register) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
    
    return register;
  }

  async getStates(): Promise<string[]> {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('DISTINCT loc.state', 'state')
      .getRawMany();

    return rows.map(r => r.state);
  }

  async getDistricts(state: string): Promise<string[]> {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('DISTINCT loc.district', 'district')
      .where('loc.state = :state', { state })
      .getRawMany();

    return rows.map(r => r.district);
  }

  async getMandals(district: string): Promise<string[]> {
    const rows = await this.locationRepo
      .createQueryBuilder('loc')
      .select('loc.mandal', 'mandal')
      .where('loc.district = :district', { district })
      .getRawMany();

    return rows.map(r => r.mandal);
  }

  async getTenants() {
    return await this.tenantRepo.find();
  }
}
