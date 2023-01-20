import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  constructor(private readonly config: ConfigService) {}

  /**
   * The API key to use for the API.
   */
  get apiKey(): string {
    return this.config.get('API_KEY', 'DEMO_KEY');
  }

  /**
   * Maximum number of concurrent requests to the API.
   */
  get apiConcurrentRequests(): number {
    return this.config.get('CONCURRENT_REQUESTS', 5);
  }

  /**
   * The API key to use for the API.
   */
  get appPort(): number {
    return this.config.get('PORT', 8080);
  }
}
