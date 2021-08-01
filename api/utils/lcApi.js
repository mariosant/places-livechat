const axios = require("axios");

const createClient = ({ token }) => {
  const client = axios.create({
    baseURL: "https://api.livechatinc.com/v3.3/configuration",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Region": token.substring(0, 3),
    },
  });

  client.interceptors.response.use((response) => response.data);

  return { client };
};

module.exports = createClient;
