import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Execute database seed with initial data' })
  @ApiResponse({
    status: 200,
    description: 'Seed executed successfully. Database populated with initial data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error. Failed to execute seed.',
  })
  executeSeed() {
    return this.seedService.runSeed();
  }
}
