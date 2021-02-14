import React from "react";
import { Router } from "@reach/router";

import ViewCollection from "./pages/ViewCollection";

export const AppRouter = () => (
<Router>
	<ViewCollection path="/collections/:id" />
</Router>
);

export default AppRouter;