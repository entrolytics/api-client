import type { ApiClient } from '../client';
import type {
  AccountEntitlements,
  AccountUsage,
  ApiResponse,
  CheckoutOptions,
  CheckoutResponse,
  PortalResponse,
  Subscription,
} from '../types';

export function createBillingEndpoints(client: ApiClient) {
  return {
    /**
     * Get current account usage for the billing period.
     */
    getUsage(): Promise<ApiResponse<AccountUsage>> {
      return client.get<AccountUsage>('/billing/usage');
    },

    /**
     * Get account entitlements based on current plan.
     */
    getEntitlements(): Promise<ApiResponse<AccountEntitlements>> {
      return client.get<AccountEntitlements>('/billing/entitlements');
    },

    /**
     * Get current subscription details.
     */
    getSubscription(): Promise<ApiResponse<Subscription>> {
      return client.get<Subscription>('/billing/subscription');
    },

    /**
     * Create a Stripe checkout session for upgrading/changing plan.
     */
    createCheckoutSession(
      options: CheckoutOptions
    ): Promise<ApiResponse<CheckoutResponse>> {
      return client.post<CheckoutResponse>('/billing/checkout', options);
    },

    /**
     * Create a Stripe billing portal session for managing subscription.
     */
    createPortalSession(): Promise<ApiResponse<PortalResponse>> {
      return client.post<PortalResponse>('/billing/portal');
    },
  };
}
