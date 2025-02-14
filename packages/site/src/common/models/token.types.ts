export interface TokenDetails {
  currency: string;
  issuer: string;
  domain?: string;
  blackholed?: boolean;
  rippling?: boolean;
  kyced?: boolean;
}

export interface TrustLineParams {
  issuer: string;
  currency: string;
  limit: number;
} 