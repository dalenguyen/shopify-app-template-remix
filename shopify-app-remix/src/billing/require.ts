import { Session } from "@shopify/shopify-api";

import { BasicParams } from "../types";
import { RequireBillingOptions } from "./types";
import { AppConfigArg } from "../config-types";

export function requireBillingFactory<Config extends AppConfigArg>(
  { api, logger }: BasicParams,
  session: Session
) {
  return async function requireBilling(options: RequireBillingOptions<Config>) {
    const logContext = {
      shop: session.shop,
      plans: options.plans,
      isTest: options.isTest,
    };

    logger.debug("Checking billing for the shop", logContext);

    // TODO Return the full info once the feature is deployed into the library package. Also, should we type the plans
    // option here by the config?
    const result = await api.billing.check({
      session,
      ...options,
      plans: options.plans as string[],
    });

    if (!result) {
      logger.debug("Billing check failed", logContext);
      throw await options.onFailure(new Error("Billing check failed"));
    }

    logger.debug("Billing check succeeded", logContext);

    return result;
  };
}