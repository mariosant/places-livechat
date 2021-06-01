import useAuth from "@/lib/useAuth.js";
import useMessagebox from "@/lib/useMessagebox.js";
import Router from "@/router.jsx";

const App = () => {
  const { data } = useAuth();
  const { initialize } = useMessagebox();

  initialize();

  return data ? <Router /> : null;
};

export default App;
