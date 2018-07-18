/**
 *
 */
export const getRequestOptions = (headers = {}) => {
  return {
    credentials: "same-origin",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
};