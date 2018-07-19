/* tslint:disable */

/**
 *
 */
export const getRequestOptions = (headers = {}) => {
  return {
    credentials: "same-origin",
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage["id_token"]}`,     
      'Content-Type': 'application/json',
    }
  };
};