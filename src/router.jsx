import loadable from "@loadable/component";
import Router from "preact-router";

const PointsPage = loadable(() => import("@/pages/points"));
const OptionsPage = loadable(() => import("@/pages/options"));

export default () => (
  <Router>
    <PointsPage path="/points" />
    <OptionsPage path="/options" />

    <div default className="p-2">
      Not found
    </div>
  </Router>
);
