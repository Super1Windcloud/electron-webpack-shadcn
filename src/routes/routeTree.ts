import { Route as rootRoute } from "./__root";
import { Route as indexRoute } from "./index";
import { Route as insightsRoute } from "./insights";

export const routeTree = rootRoute.addChildren([indexRoute, insightsRoute]);
