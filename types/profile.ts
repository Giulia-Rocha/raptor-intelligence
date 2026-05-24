export type CustomerProfileType = 'enthusiast' | 'lifestyle' | 'rational' | 'tech';

export interface SalesArgument {
  id: string;
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface CustomerProfile {
  type: CustomerProfileType;
  label: string;
  description: string;
  detectedSignals: string[];
  salesArguments: SalesArgument[];
}
