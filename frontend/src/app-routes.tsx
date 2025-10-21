import { renderRoutes } from "react-router-config";
import App from "./app";
import DbTables from "./pages/db-tables";
import Example from "./pages/example";
import Results from "./pages/results";

export const routes = [
  {
    path: "/",
    component: () => <App />,
    exact: true,
  },
  {
    path: "/database-tables",
    component: () => <DbTables />,
    exact: true,
  },
  {
    path: "/example",
    component: () => <Example />,
    exact: true,
  },
  {
    path: "/results/project/:pid/assessment/:aid",
    component: () => <Results />,
    exact: true,
  },
];

const Routes = ({ basename }: { basename: string }) => {
  return <>{renderRoutes(routes)}</>;
};

export default Routes;
