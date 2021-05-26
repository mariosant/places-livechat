import create from "zustand";
import AccountsSdk from "@livechat/accounts-sdk";

const accounts = new AccountsSdk({
  client_id: import.meta.env.VITE_APP_LIVECHAT_CLIENT_ID,
  prompt: true,
});

const useAuth = create(() => ({
  login: () => {},
}));

accounts
  .redirect()
  .authorizeData()
  .then((authorizeData) => {
    accounts.verify(authorizeData);
    useAuth.setState({ data: authorizeData });
  })
  .catch(() => {
    accounts.redirect().authorize();
  });

export default useAuth;
