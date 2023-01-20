import { ConfigurableModuleBuilder } from '@nestjs/common';
import { RequestModuleOptions } from './request.options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<RequestModuleOptions>()
    .setFactoryMethodName('createRequestOptions')
    .build();
