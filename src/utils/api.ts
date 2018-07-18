/* tslint:disable */

import * as isomorphicFetch from "isomorphic-fetch";

import * as api from "../generated/api";

import { getRequestOptions } from "./apiHelpers";
const BASE_PATH_STARGATE_API = `${process.env.STARGATE_API_URL}`.replace(/\/+$/, "");


const fetch = isomorphicFetch;

/**
 * This will create an instance of T, iterate the instance it created and rebind all
 * methods to the instance so that when they are called by redux-saga, they are guaranteed
 * to have the right context.
 *
 * @param cls
 * @returns {T}
 */
function rebind<T>(cls: T & any): T {

  const instance = new cls(isomorphicFetch);

  for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
    const method = instance[name];

    if (!(method instanceof Function) || method === cls) {
      continue;
    }

    instance[name] = (...args) => {

      /** */
      const requestOptions = getRequestOptions();
      // const requestOptions = {}; 
      if (args.length === 0) {
        const options = requestOptions;
        
        return method.call(instance, options);
      } else if (args.length === 1) {
        const params = args[0];

        return method.apply(instance, [params, requestOptions]);
      } else if (args.length > 1) {
        const params = args[0];
        const options = {
          ...requestOptions,
          ...args[1]
        };

        return method.apply(instance, [params, options]);
      }
    };
  }

  return instance as T;
}

export const UsersApi = rebind<api.UsersApi>(api.UsersApi);
export const AdminsApi = rebind<api.AdminsApi>(api.AdminsApi);

/**
 *
 *
 * @param requestUrl
 * @param options
 */
export const request = (requestUrl, options): Promise<any> => {

  return fetch(requestUrl, options).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
      } else {
          throw response;
      }
  });
};


