import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Dropdown, Icon } from "semantic-ui-react";

import PageLayout from "../components/common/PageLayout";
import ItemCard from "../components/view/ItemCard";
import { formatDate } from "../utils/date";
import useGetCollection from "../hooks/getCollection";

const useStyles = createUseStyles({
    title: {
        marginBottom: 0,
    },
    subtitle: {
        marginBottom: "1em",
        display: "flex",
        justifyContent: "space-between",
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
    const [collection, loading, error] = useGetCollection(id);

    const onSizeChange = (_event, { value }) => {
        setSize(value);
    };

    return (
        <PageLayout>
            { loading && <p>loading</p> }
            { error && <p>error</p> }
            {!loading && !error && collection &&
            <article>
                <h2 className={classes.title}>{collection.name}</h2>
                <div className={classes.subtitle}>
                    <small>
                        {collection.items.length} item{collection.items.length > 1 ? "s" : ""} |
                        Created at {formatDate(collection.createdAt)}
                    </small>
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

                    {/* <div>
                        <input type="radio" name="size" value="small" checked={size === "small"} onChange={onSizeChange} />
                        <input type="radio" name="size" value="medium" checked={size === "medium"} onChange={onSizeChange} />
                        <input type="radio" name="size" value="large" checked={size === "large"} onChange={onSizeChange} />
                    </div> */}
                </div>
                <section>
                    {collection.items.map((item, index) => <ItemCard key={index} _index={index + 1} item={item} size={size} />)}
                </section>
            </article>
            }
        </PageLayout>
    );
};

ViewCollection.propTypes = {
    id: PropTypes.string.isRequired,
};

ViewCollection.defaultProps = {
    id: "",
};

export default ViewCollection;
