import SimpleFormExample from "@pages/SimpleFormExample";
import FieldArrayExample from "@pages/FieldArrayExample";
import TableEditorExample from "@pages/TableEditorExample";

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
  {
    title: "Table Editor",
    path: "/table-editor",
    component: TableEditorExample,
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
