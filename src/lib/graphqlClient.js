import { createClient } from "urql";
import useAuth from "./useAuth";

const client = createClient({
  url: "/graphql",
  fetchOptions: () => {
    const { data } = useAuth.getState();

    return {
      headers: { authorization: `Bearer ${data?.access_token}` },
    };
  },
});

export default client;
