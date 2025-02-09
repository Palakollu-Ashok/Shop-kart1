import axios from "axios";

export const commonRequest = async (methods, url, body, header) => {
  const token = sessionStorage.getItem("userToken");

  let config = {
    method: methods,
    url,
    headers: header
      ? header
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
    data: body,
  };

  return axios(config)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};
