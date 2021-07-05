const axios = require("axios");
const DataLoader = require("dataloader");

const createClient = ({ token }) => {
  const client = axios.create({
    baseURL: "https://api.livechatinc.com/v3.3/configuration",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Region": token.substring(0, 3),
    },
  });

  client.interceptors.response.use((response) => response.data);

  const groupLoader = new DataLoader(async (keys) => {
    const groups = await client.post("/action/list_groups", {});

    return keys.map((key) => groups.find((group) => String(group.id) === key));
  });

  return { client, groupLoader };
};

module.exports = createClient;
