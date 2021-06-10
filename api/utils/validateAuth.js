const axios = require("axios");

const livechatValidationUrl = "https://accounts.livechat.com/v2/info";

const validateAuth = async (request) => {
  const authorizationHeader = request?.headers?.authorization ?? "";

  const { data } = await axios.get(livechatValidationUrl, {
    headers: {
      authorization: authorizationHeader,
    },
  });

  return data;
};

module.exports = validateAuth;
