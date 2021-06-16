const axios = require("axios");
const Keyv = require("keyv");

const tokensCache = new Keyv();

const livechatValidationUrl = "https://accounts.livechat.com/v2/info";

const validateAuth = async (request) => {
  const authorizationHeader = request?.headers?.authorization ?? "";

  const cachedData = await tokensCache.get(authorizationHeader);

  if (cachedData) {
    return cachedData;
  }

  const { data } = await axios.get(livechatValidationUrl, {
    headers: {
      authorization: authorizationHeader,
    },
  });

  await tokensCache.set(authorizationHeader, data);

  return data;
};

module.exports = validateAuth;
