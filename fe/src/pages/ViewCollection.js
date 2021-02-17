import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";

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
    },
});

export const ViewCollection = ({ id }) => {
    const classes = useStyles();
    const [collection, loading, error] = useGetCollection(id);
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
                </div>
                <section>
                    {collection.items.map((item, index) => <ItemCard key={index} _index={index + 1} item={item} />)}
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
