import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

// Non-Submitting Icon Button
export const NSIconButton = ({ icon, ...props }) => (
    <button
        className="ui icon button" type="button" {...props}
    >
        <Icon name={icon} />
    </button>
);

NSIconButton.propTypes = {
    icon: PropTypes.string.isRequired,
};

export default NSIconButton;
