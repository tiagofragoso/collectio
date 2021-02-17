import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Microlink from "@microlink/react";
import styled from "styled-components";

const useStyles = createUseStyles({
    itemCard: {
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        backgroundColor: "#e1e8ed",
        // maxWidth: "500px",
        marginBottom: "1em",
    },
    itemLabel: {
        padding: "12px 8px",
    },
});

const StyledML = styled(Microlink)`
border-radius: 5px;
max-width: 100%;
`;

export const ItemCard = ({ _index, item }) => {
    const classes = useStyles();

    return (
        <div className={classes.itemCard}>
            <StyledML url={item.url} size="small" lazy />
            <span className={classes.itemLabel}>{item.label}</span>
        </div>
    );
};

ItemCard.propTypes = {
    _index: PropTypes.number.isRequired,
    item: PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
};

export default ItemCard;
