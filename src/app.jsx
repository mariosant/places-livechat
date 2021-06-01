import loadable from "@loadable/component";
import useAuth from "@/lib/useAuth";
import useMessagebox from "@/lib/useMessagebox";

const Page = loadable(() => import("@/pages/points"));

const App = () => {
  const { data } = useAuth();
  const { initialize } = useMessagebox();

  initialize();

  return data ? <Page /> : null;
};

export default App;
