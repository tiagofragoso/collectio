import React from "react";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import ItemCard from "../components/ItemCard";
import { formatDate } from "../utils/date";
import useGetCollection from "../hooks/getCollection";

export const ViewCollection = ({ id }) => {

    const [data, loading, error] = useGetCollection(id);

    return (
        <PageLayout>
            { loading && <p>loading</p> }
            { error && <p>error</p> }
            {!loading && !error && data &&
            <div>
                <h2>{data.name}</h2>
                <div>
                    <span>Created at {formatDate(data.createdAt)}</span>
                </div>
                <div>
                    {data.items.map((item, index) => <ItemCard key={index} _index={index + 1} item={item} />)}
                </div>
            </div>
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
