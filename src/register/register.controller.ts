import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Get('states')
  async getStates() {
    try {
      const states = await this.registerService.getStates();
      return { success: true, data: states };
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch states', message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('districts/:state')
  async getDistricts(@Param('state') state: string) {
    try {
      const districts = await this.registerService.getDistricts(state);
      return { success: true, data: districts };
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch districts', message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('mandals/:district')
  async getMandals(@Param('district') district: string) {
    try {
      const mandals = await this.registerService.getMandals(district);
      return { success: true, data: mandals };
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch mandals', message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('tenants')
  async getTenants() {
    try {
      const tenants = await this.registerService.getTenants();
      return { success: true, data: tenants };
    } catch (error) {
      throw new HttpException(
        { error: 'Failed to fetch tenants', message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
