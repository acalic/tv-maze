import Homepage from "@pages/Homepage";
import ShowDetails from "@pages/ShowDetails";
import SeasonDetails from "@pages/SeasonDetails";

const routes = [
  { path: ["/", "/shows"], name: "Homepage", Component: Homepage },
  { path: "/shows/:id", name: "ShowDetails", Component: ShowDetails },
  { path: "/seasons/:id", name: "SeasonDetails", Component: SeasonDetails },
];

export default routes;
