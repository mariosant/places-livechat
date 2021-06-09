import loadable from "@loadable/component";
import Router from "preact-router";

const MessageBoxPage = loadable(() => import("@/pages/messageBox"));
const SettingsPage = loadable(() => import("@/pages/settings"));

export default () => (
  <Router>
    <MessageBoxPage path="/messagebox" />
    <SettingsPage path="/settings" />

    <div default className="p-2">
      Not found
    </div>
  </Router>
);
