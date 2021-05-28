const axios = require("axios");

const livechatValidationUrl = "https://accounts.livechat.com/v2/info";

const validateAuth = async (request) => {
  const authorizationHeader = request?.headers?.authorization ?? "";

  const { data, error } = await axios
    .get(livechatValidationUrl, {
      headers: {
        authorization: authorizationHeader,
      },
    })
    .catch((error) => ({ error }));

  return [data, error];
};

module.exports = validateAuth;
