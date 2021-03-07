import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import Microlink from "@microlink/react";

const useStyles = createUseStyles({
    itemCard: {
        boxShadow: "0px 0px 3px 0px rgba(176,176,176,1)",
        // marginBottom: "1.5em",
        display: "flex",
        flexDirection: "column",
    },
    cardHeader: {
        padding: "1em",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,.1)",
    },
    itemIndex: {
        color: "rgba(0,0,0,.5)",
        fontWeight: "bold",
        fontSize: "1.8rem",
    },
    itemLabel: {
        marginLeft: "1em",
    },
    noLabel: {
        color: "rgba(0,0,0,.5)",
    },
});

const sizeMap = Object.freeze({
    small: "small",
    medium: "normal",
    large: "large",
});

export const ItemCard = ({ index, item, size }) => {
    const classes = useStyles();

    return (
        <div className={classes.itemCard}>
            <header className={classes.cardHeader}>
                <span className={classes.itemIndex}>{index}</span>
                {item.label ?
                    <span className={classes.itemLabel}>{item.label}</span> :
                    <span className={`${classes.itemLabel} ${classes.noLabel}`}>No label</span>
                }
            </header>
            <Microlink url={item.url} size={sizeMap[size]} lazy />
        </div>
    );
};

ItemCard.propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
};

export default ItemCard;
