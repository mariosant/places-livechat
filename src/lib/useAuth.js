import create from "zustand";
import AccountsSdk from "@livechat/accounts-sdk";

const clientId = import.meta.env.VITE_APP_LIVECHAT_CLIENT_ID;

const accounts = new AccountsSdk({
  client_id: clientId,
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
    window.location.href = `https://accounts.livechatinc.com?response_type=token&client_id=${clientId}&redirect_uri=${window.location.href}`;
  });

export default useAuth;
