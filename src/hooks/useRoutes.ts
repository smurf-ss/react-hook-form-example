import { useMemo } from "react";

import routes from "@routes/routes";

type UseRoutesProps = { isDrawer?: boolean } | undefined;

const useRoutes = (props: UseRoutesProps = {}) => {
  const { isDrawer = false } = props;

  const renewRoutes = useMemo(() => {
    return routes.filter((route) => (isDrawer ? route.isDrawer : true));
  }, [isDrawer]);

  return renewRoutes;
};

export default useRoutes;
