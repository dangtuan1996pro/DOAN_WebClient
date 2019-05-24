import axios from "axios";

export const apiCall = async ({ endPoint, method, payload, headers, params }) => {
  try {
    const result = await axios({
      method: method,
      url: endPoint,
      headers: headers,
      data: payload,
      params: params,
    });
    return {
      response: result,
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      response: null,
      error: e.request.status,
    };
  }
};
