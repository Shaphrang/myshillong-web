export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type VendorStatus = 'pending' | 'active' | 'inactive' | 'rejected';
export type DealStatus = 'draft' | 'active' | 'expired' | 'paused';
export type PlacementStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
export type AdTargetType = 'vendor' | 'deal' | 'category' | 'external_url';
export type BillingStatus = 'unpaid' | 'pending' | 'paid' | 'cancelled' | 'refunded';

export type Database = {
  public: {
    Tables: Record<string, { Row: Record<string, unknown>; Insert: Record<string, unknown>; Update: Record<string, unknown> }>;
    Views: Record<string, { Row: Record<string, unknown> }>;
    Functions: Record<string, unknown>;
  };
};
