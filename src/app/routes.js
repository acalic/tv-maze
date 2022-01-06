import Homepage from "@pages/Homepage";
import Favorites from "@pages/Favorites";
import ShowDetails from "@pages/ShowDetails";
import SeasonDetails from "@pages/SeasonDetails";

const routes = [
  { path: ["/", "/shows"], name: "Homepage", Component: Homepage },
  { path: "/favorites", name: "Favorites", Component: Favorites },
  { path: "/shows/:id", name: "ShowDetails", Component: ShowDetails },
  { path: "/seasons/:id", name: "SeasonDetails", Component: SeasonDetails },
];

export default routes;
