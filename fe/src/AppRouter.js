import React from "react";
import { Router } from "@reach/router";

import ViewCollection from "./pages/ViewCollection";
import CreateCollection from "./pages/CreateCollection";

export const AppRouter = () => (
    <Router>
        <CreateCollection path="/" default/>
        <ViewCollection path="/:id" />
    </Router>
);

export default AppRouter;
