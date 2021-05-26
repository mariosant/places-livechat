import Router from "preact-router";
import PointsPage from "@/pages/points";

export default () => (
  <Router>
    <PointsPage path="/" />

    <div default className="p-2">
      Not found
    </div>
  </Router>
);
