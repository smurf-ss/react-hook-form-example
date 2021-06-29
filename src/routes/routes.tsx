import SimpleFormExample from "../pages/SimpleFormExample";
import FieldArrayExample from "../pages/FieldArrayExample";

export type Routes = {
  path: string;
  title: string;
  component: any;
  isDrawer: boolean;
  exact: boolean;
};

const routes: Routes[] = [
  {
    path: "/",
    title: "",
    component: SimpleFormExample,
    isDrawer: false,
    exact: true,
  },
  {
    title: "Simple Form",
    path: "/simple",
    component: SimpleFormExample,
    isDrawer: true,
    exact: false,
  },
  {
    title: "Field Arrays",
    path: "/field-arrays",
    component: FieldArrayExample,
    isDrawer: true,
    exact: false,
  },
  //   {
  //     path: "*",
  //     component: <>NoMatch</>,
  //     exact: false,
  //     isDrawer: false,
  //   },
];

export default routes;
