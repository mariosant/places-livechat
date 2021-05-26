import loadable from "@loadable/component";
import useAuth from "@/lib/useAuth";

const Router = loadable(() => import("./router.jsx"));

const App = () => {
  const { data } = useAuth();

  return data ? <Router /> : null;
};

export default App;
