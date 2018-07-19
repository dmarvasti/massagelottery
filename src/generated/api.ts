/* tslint:disable */

/**
 * Massage Lottery API
 * Hackathon 2018
 *
 * OpenAPI spec version: 1.0.0
 * Contact: rotem.cohen@wework.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as querystring from "querystring";
import * as url from "url";

import * as isomorphicFetch from "isomorphic-fetch";
import * as assign from "core-js/library/fn/object/assign";

interface Dictionary<T> { [index: string]: T; }
export interface FetchAPI { (url: string, init?: any): Promise<any>; }

// const BASE_PATH = "https://virtserver.swaggerhub.com/rcohen-ww/MassageLottery/1.0.0".replace(/\/+$/, "");
const BASE_PATH = "http://206.189.225.97".replace(/\/+$/, "");

export interface FetchArgs {
  url: string;
  options: any;
}

export class BaseAPI {
  basePath: string;
  fetch: FetchAPI;

  constructor(fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) {
      this.basePath = basePath;
      this.fetch = fetch;
  }
};

export interface InlineResponse200 {
  "selectedSlotId"?: number;
}

export interface Lottery {
  "id"?: number;
  "location"?: string;
  "isFinished"?: boolean;
  "slots"?: Array<Slot>;
}

export interface Lottery1 {
  "isFinished": boolean;
}

export interface Slot {
  "id"?: number;
  "startTime"?: string;
  "winner"?: User;
  "entryCount"?: number;
}

export interface Slot1 {
  "isSelected": boolean;
}

export interface User {
  "id"?: number;
  "email"?: string;
  "fullName"?: string;
}



/**
* AdminsApi - fetch parameter creator
*/
export const AdminsApiFetchParamCreator = {
  /**
   * 
   * @summary add a lottery entry
   */
  addLottery(options?: any): FetchArgs {
      const baseUrl = `/lottery/`;
      let urlObj = url.parse(baseUrl, true);
      let fetchOptions: RequestInit = assign({}, { method: "POST" }, options);

      let contentTypeHeader: Dictionary<string> = {};
      if (contentTypeHeader) {
          fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
      }
      return {
          url: url.format(urlObj),
          options: fetchOptions,
      };
  },
  /**
   * 
   * @summary generate lottery results
   * @param lotteryId 
   * @param lottery true to select, false to deselect. will overwrite previous selection
   */
  executeLottery(params: {  "lotteryId": number; "lottery"?: Lottery1; }, options?: any): FetchArgs {
      // verify required parameter "lotteryId" is set
      if (params["lotteryId"] == null) {
          throw new Error("Missing required parameter lotteryId when calling executeLottery");
      }
      const baseUrl = `/lottery/{lotteryId}/`
          .replace(`{${"lotteryId"}}`, `${ params["lotteryId"] }`);
      let urlObj = url.parse(baseUrl, true);
      let fetchOptions: RequestInit = assign({}, { method: "PATCH" }, options);

      let contentTypeHeader: Dictionary<string> = {};
      contentTypeHeader = { "Content-Type": "application/json" };
      if (params["lottery"]) {
          fetchOptions.body = JSON.stringify(params["lottery"] || {});
      }
      if (contentTypeHeader) {
          fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
      }
      return {
          url: url.format(urlObj),
          options: fetchOptions,
      };
  },
};

/**
* AdminsApi - functional programming interface
*/
export const AdminsApiFp = {
  /**
   * 
   * @summary add a lottery entry
   */
  addLottery(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Lottery> {
      const fetchArgs = AdminsApiFetchParamCreator.addLottery(options);
      return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
          return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                  return response.json();
              } else {
                  throw response;
              }
          });
      };
  },
  /**
   * 
   * @summary generate lottery results
   * @param lotteryId 
   * @param lottery true to select, false to deselect. will overwrite previous selection
   */
  executeLottery(params: { "lotteryId": number; "lottery"?: Lottery1;  }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const fetchArgs = AdminsApiFetchParamCreator.executeLottery(params, options);
      return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
          return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                  return response;
              } else {
                  throw response;
              }
          });
      };
  },
};

/**
* AdminsApi - object-oriented interface
*/
export class AdminsApi extends BaseAPI {
  /**
   * 
   * @summary add a lottery entry
   */
  addLottery(options?: any) {
      return AdminsApiFp.addLottery(options)(this.fetch, this.basePath);
  }
  /**
   * 
   * @summary generate lottery results
   * @param lotteryId 
   * @param lottery true to select, false to deselect. will overwrite previous selection
   */
  executeLottery(params: {  "lotteryId": number; "lottery"?: Lottery1; }, options?: any) {
      return AdminsApiFp.executeLottery(params, options)(this.fetch, this.basePath);
  }
};

/**
* AdminsApi - factory interface
*/
export const AdminsApiFactory = function (fetch?: FetchAPI, basePath?: string) {
  return {
      /**
       * 
       * @summary add a lottery entry
       */
      addLottery(options?: any) {
          return AdminsApiFp.addLottery(options)(fetch, basePath);
      },
      /**
       * 
       * @summary generate lottery results
       * @param lotteryId 
       * @param lottery true to select, false to deselect. will overwrite previous selection
       */
      executeLottery(params: {  "lotteryId": number; "lottery"?: Lottery1; }, options?: any) {
          return AdminsApiFp.executeLottery(params, options)(fetch, basePath);
      },
  };
};


/**
* UsersApi - fetch parameter creator
*/
export const UsersApiFetchParamCreator = {
  /**
   * 
   * @summary Get Lottery slots
   * @param lotteryId 
   */
  getLottery(params: {  "lotteryId": number; }, options?: any): FetchArgs {
      // verify required parameter "lotteryId" is set
      if (params["lotteryId"] == null) {
          throw new Error("Missing required parameter lotteryId when calling getLottery");
      }
      const baseUrl = `/lottery/{lotteryId}/`
          .replace(`{${"lotteryId"}}`, `${ params["lotteryId"] }`);
      let urlObj = url.parse(baseUrl, true);
      let fetchOptions: RequestInit = assign({}, { method: "GET" }, options);

      let contentTypeHeader: Dictionary<string> = {};
      if (contentTypeHeader) {
          fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
      }
      return {
          url: url.format(urlObj),
          options: fetchOptions,
      };
  },
  /**
   * 
   * @summary returns user current state for specific lottery
   * @param lotteryId 
   */
  lotterySelectionState(params: {  "lotteryId": number; }, options?: any): FetchArgs {
      // verify required parameter "lotteryId" is set
      if (params["lotteryId"] == null) {
          throw new Error("Missing required parameter lotteryId when calling lotterySelectionState");
      }
      const baseUrl = `/lotterySelection/{lotteryId}/`
          .replace(`{${"lotteryId"}}`, `${ params["lotteryId"] }`);
      let urlObj = url.parse(baseUrl, true);
      let fetchOptions: RequestInit = assign({}, { method: "GET" }, options);

      let contentTypeHeader: Dictionary<string> = {};
      if (contentTypeHeader) {
          fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
      }
      return {
          url: url.format(urlObj),
          options: fetchOptions,
      };
  },
  /**
   * 
   * @summary register to a slot
   * @param slotId 
   * @param slot true to select, false to deselect. will overwrite previous selection
   */
  registerSlot(params: {  "slotId": number; "slot"?: Slot1; }, options?: any): FetchArgs {
      // verify required parameter "slotId" is set
      if (params["slotId"] == null) {
          throw new Error("Missing required parameter slotId when calling registerSlot");
      }
      const baseUrl = `/slot/{slotId}/`
          .replace(`{${"slotId"}}`, `${ params["slotId"] }`);
      let urlObj = url.parse(baseUrl, true);
      let fetchOptions: RequestInit = assign({}, { method: "PATCH" }, options);

      let contentTypeHeader: Dictionary<string> = {};
      contentTypeHeader = { "Content-Type": "application/json" };
      if (params["slot"]) {
          fetchOptions.body = JSON.stringify(params["slot"] || {});
      }
      if (contentTypeHeader) {
          fetchOptions.headers = assign({}, contentTypeHeader, fetchOptions.headers);
      }
      return {
          url: url.format(urlObj),
          options: fetchOptions,
      };
  },
};

/**
* UsersApi - functional programming interface
*/
export const UsersApiFp = {
  /**
   * 
   * @summary Get Lottery slots
   * @param lotteryId 
   */
  getLottery(params: { "lotteryId": number;  }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Lottery> {
      const fetchArgs = UsersApiFetchParamCreator.getLottery(params, options);
      return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
          return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                  return response.json();
              } else {
                  throw response;
              }
          });
      };
  },
  /**
   * 
   * @summary returns user current state for specific lottery
   * @param lotteryId 
   */
  lotterySelectionState(params: { "lotteryId": number;  }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<InlineResponse200> {
      const fetchArgs = UsersApiFetchParamCreator.lotterySelectionState(params, options);
      return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
          return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                  return response.json();
              } else {
                  throw response;
              }
          });
      };
  },
  /**
   * 
   * @summary register to a slot
   * @param slotId 
   * @param slot true to select, false to deselect. will overwrite previous selection
   */
  registerSlot(params: { "slotId": number; "slot"?: Slot1;  }, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<any> {
      const fetchArgs = UsersApiFetchParamCreator.registerSlot(params, options);
      return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
          return fetch(basePath + fetchArgs.url, fetchArgs.options).then((response) => {
              if (response.status >= 200 && response.status < 300) {
                  return response;
              } else {
                  throw response;
              }
          });
      };
  },
};

/**
* UsersApi - object-oriented interface
*/
export class UsersApi extends BaseAPI {
  /**
   * 
   * @summary Get Lottery slots
   * @param lotteryId 
   */
  getLottery(params: {  "lotteryId": number; }, options?: any) {
      return UsersApiFp.getLottery(params, options)(this.fetch, this.basePath);
  }
  /**
   * 
   * @summary returns user current state for specific lottery
   * @param lotteryId 
   */
  lotterySelectionState(params: {  "lotteryId": number; }, options?: any) {
      return UsersApiFp.lotterySelectionState(params, options)(this.fetch, this.basePath);
  }
  /**
   * 
   * @summary register to a slot
   * @param slotId 
   * @param slot true to select, false to deselect. will overwrite previous selection
   */
  registerSlot(params: {  "slotId": number; "slot"?: Slot1; }, options?: any) {
      return UsersApiFp.registerSlot(params, options)(this.fetch, this.basePath);
  }
};

/**
* UsersApi - factory interface
*/
export const UsersApiFactory = function (fetch?: FetchAPI, basePath?: string) {
  return {
      /**
       * 
       * @summary Get Lottery slots
       * @param lotteryId 
       */
      getLottery(params: {  "lotteryId": number; }, options?: any) {
          return UsersApiFp.getLottery(params, options)(fetch, basePath);
      },
      /**
       * 
       * @summary returns user current state for specific lottery
       * @param lotteryId 
       */
      lotterySelectionState(params: {  "lotteryId": number; }, options?: any) {
          return UsersApiFp.lotterySelectionState(params, options)(fetch, basePath);
      },
      /**
       * 
       * @summary register to a slot
       * @param slotId 
       * @param slot true to select, false to deselect. will overwrite previous selection
       */
      registerSlot(params: {  "slotId": number; "slot"?: Slot1; }, options?: any) {
          return UsersApiFp.registerSlot(params, options)(fetch, basePath);
      },
  };
};

