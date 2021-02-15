import React from "react";
import { createUseStyles } from "react-jss";

import Header from "./Header";
import Footer from "./Footer";

const useStyles = createUseStyles({
    page: {
        minHeight: "100vh",
        position: "relative",
    },
    main: {
        padding: "12px 0px",
        maxWidth: "768px",
        margin: "0 auto",
    },
});


export const PageLayout = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.page}>
            <Header />
            <main className={classes.main}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default PageLayout;
