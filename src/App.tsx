import { Switch } from "react-router-dom";

import RouteWithSubRoutes from "@routes/RouteWithSubRoutes";

import Drawer from "@components/Drawer";

import useRoutes from "@hooks/useRoutes";

function App() {
  const routes = useRoutes();

  return (
    <Drawer>
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </Drawer>
  );
}

export default App;
