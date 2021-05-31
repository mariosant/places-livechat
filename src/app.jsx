import loadable from "@loadable/component";
import useAuth from "@/lib/useAuth";
import useWidget from "@/lib/useWidget";

const Router = loadable(() => import("./router.jsx"));

const App = () => {
  const { data } = useAuth();
  const { initialize } = useWidget();

  initialize();

  return data ? <Router /> : null;
};

export default App;
