import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Dropdown, Segment, Icon, Input, Popup } from "semantic-ui-react";

import ItemCard from "../components/view/ItemCard";
import { formatDate } from "../utils/date";
import useGetCollection from "../hooks/getCollection";
import FetchingPageLayout from "../components/common/FetchingPageLayout";

const useStyles = createUseStyles({
    collectionHeader: {
        display: "flex",
    },
    title: {
    },
    subtitle: {
        marginBottom: "1em",
        display: "flex",
        justifyContent: "space-between",
    },
    copyBtn: {
        cursor: "pointer",
    },
    noMargin: {
        margin: 0,
    },
});

const sizeOptions = [
    {
        key: "small",
        text: "Compact",
        value: "small",
        icon: "align justify",
    },
    {
        key: "medium",
        text: "Medium",
        value: "medium",
        icon: "th list",
    },
    {
        key: "large",
        text: "Large",
        value: "large",
        icon: "grid layout",
    },
];

export const ViewCollection = ({ id }) => {
    const classes = useStyles();
    const [size, setSize] = useState("small");
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [popupTimeout, setPopupTimeout] = useState(null);
    const [collection, loading, error] = useGetCollection(id);

    const onSizeChange = (_event, { value }) => {
        setSize(value);
    };

    const urlInputRef = useRef(null);

    const url = `http://localhost:8080/${id}`;

    const urlFocus = () => {
        urlInputRef.current.value = url;
        urlInputRef.current.select();
    };

    const urlBlur = () => {
        urlInputRef.current.value = id;
    };

    const copyToClipboard = () => {
        urlInputRef.current.select();
        document.execCommand("copy");
        urlInputRef.current.blur();
    };

    const handleOpen = () => {
        setPopupIsOpen(true);

        setPopupTimeout(setTimeout(() => {
            setPopupIsOpen(false);
        }, 5000));
    };

    const handleClose = () => {
        setPopupIsOpen(false);
        clearTimeout(popupTimeout);
    };

    return (
        <FetchingPageLayout loading={loading} error={error}>
            {!loading && !error && collection &&
                <article>
                    <h2 className={classes.title}>{collection.name}</h2>
                    <div className="ui small transparent action input">
                        <Popup
                            trigger={
                                <Icon
                                    className={classes.copyBtn}
                                    name="copy"
                                    onClick={copyToClipboard}
                                />}
                            content={"URL copied to clipboard"}
                            open={popupIsOpen}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            on="click"
                            position="left center"
                        />

                        <input
                            readOnly
                            type="text"
                            value={id}
                            ref={urlInputRef}
                            onFocus={urlFocus}
                            onBlur={urlBlur}
                            size={id.length}
                        />
                    </div>
                    <div className={classes.subtitle}>
                        <p className={classes.noMargin}>
                            {collection.items.length} item{collection.items.length > 1 ? "s" : ""} |
                            Created at {formatDate(collection.createdAt)}
                        </p>
                        <Dropdown
                            inline
                            header="adjust size"
                            value={size}
                            options={sizeOptions}
                            onChange={onSizeChange}
                            renderLabel={(item) => ({
                                icon: item.icon,
                            })}
                        />
                    </div>
                    <section>
                        {collection.items.map((item, index) => <ItemCard key={index} _index={index + 1} item={item} size={size} />)}
                    </section>
                </article>
            }
        </FetchingPageLayout>
    );
};

ViewCollection.propTypes = {
    id: PropTypes.string.isRequired,
};

ViewCollection.defaultProps = {
    id: "",
};

export default ViewCollection;
