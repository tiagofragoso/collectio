import React from "react";
import { createUseStyles } from "react-jss";
import Microlink from "@microlink/react";
import styled from "styled-components";

const useStyles = createUseStyles({
    itemCard: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        backgroundColor: "#e1e8ed",
        maxWidth: "500px",
        marginBottom: "1em",
    },
    itemLabel: {
        padding: "12px 8px",
    },
});

const StyledML = styled(Microlink)`
border-radius: 5px`;

export const ItemCard = ({ _index, item }) => {
    const classes = useStyles();

    return (
        <div className={classes.itemCard}>
            <StyledML url={item.url} size="small" lazy/>
            <span className={classes.itemLabel}>{item.label}</span>
        </div>
    );
};

export default ItemCard;
