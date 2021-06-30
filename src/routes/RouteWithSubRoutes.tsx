import { Route } from "react-router-dom";

import { Routes } from "@routes/routes";

function RouteWithSubRoutes(route: Routes) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} />
      )}
    />
  );
}

export default RouteWithSubRoutes;
