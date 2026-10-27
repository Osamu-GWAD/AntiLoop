export interface Account {
  id: number;
  email: string;
  alias?: string;
  status: 'active' | 'included' | 'excluded' | 'disabled';
  tier: string;
  useAICredits?: boolean | number;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
  quota?: QuotaData;
}

export interface QuotaFamily {
  name: string;
  label: string;
  percent: number;
  remaining?: number;
  limit?: number;
  resetTime?: string;
}

export interface QuotaData {
  families: QuotaFamily[];
  resetTime?: string;
  overallPercent?: number;
  isUnlimited?: boolean;
}

export interface Provider {
  id: number;
  name: string;
  apiType: 'openai_chat' | 'anthropic';
  baseUrl: string;
  apiKey: string;
  modelId: string;
  enabled: boolean | number;
  extraHeaders?: string;
  extraParams?: string;
  maxContextTokens?: number;
  maxOutputTokens?: number;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatusInfo {
  enabled: boolean;
  currentEmail: string;
  currentTier: string;
  activeSource: string;
  proxyEnabled: boolean;
  proxyPort?: number;
  quotaThreshold?: number;
  networkMode?: number;
  networkEnhance?: boolean;
  maxRetries?: number;
}

export interface ActivateParams {
  storagePath: string;
  ideVersion: string;
  platform: string;
  binaryMtimeMs: number;
}

export interface ActivateResult {
  total: number;
  active: number;
  currentEmail: string;
  currentTier: string;
  autoEnabled: boolean;
  proxyPort: number;
  proxyEnabled: boolean;
  quota?: QuotaData;
  quotaPending?: boolean;
  binaryUpdated?: boolean;
}

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: number;
  method: string;
  params?: any;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id?: number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  method?: string;
  params?: any;
}
