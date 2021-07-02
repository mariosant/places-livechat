import { Provider } from "@urql/preact";
import graphqlClient from "@/lib/graphqlClient.js";
import useAuth from "@/lib/useAuth.js";
import useMessagebox from "@/lib/useMessagebox.js";
import Router from "@/router.jsx";

const App = () => {
  const { data } = useAuth();
  const { initialize } = useMessagebox();

  initialize();

  return data ? (
    <Provider value={graphqlClient}>
      <Router />
    </Provider>
  ) : null;
};

export default App;
