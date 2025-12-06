/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare module "sslcommerz-lts" {
  interface SSLCommerzConfig {
    store_id: string;
    store_passwd: string;
    is_live: boolean;
  }

  class SSLCommerz {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(data: any): Promise<any>;
  }

  export = SSLCommerz;
}
