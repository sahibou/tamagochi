export * from './completion.service';
import { CompletionService } from './completion.service';
export * from './getCapabilities.service';
import { GetCapabilitiesService } from './getCapabilities.service';
export const APIS = [CompletionService, GetCapabilitiesService];
