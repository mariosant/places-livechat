import ky from "ky";
import useAuth from "./useAuth";

const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const { data } = useAuth.getState();

        request.headers.set("authorization", `Bearer ${data?.access_token}`);
      },
    ],
  },
});

export default api;
