import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Controller } from "react-hook-form";
import { List, Form } from "semantic-ui-react";
import NSIconButton from "../common/NSIconButton";

const useStyles = createUseStyles({
    itemRow: {
        backgroundColor: "#e0e1e2",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        padding: "8px",
    },
    left: {
        padding: "4px",
        marginRight: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    index: {
        color: "rgba(0,0,0,.5)",
        fontWeight: "bold",
        fontSize: "2rem",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
    },
    itemForm: {
        flexGrow: "1",
    },
    right: {
        marginLeft: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});

export const ItemCard = ({ item, index, control, remove }) => {
    const classes = useStyles();
    return (
        <List.Item key={item.id}>
            <div className={classes.itemRow}>
                <div className={classes.left}>
                    <span className={classes.index}>{index + 1}</span>
                    <NSIconButton
                        size="small" icon="move" onClick={() => {
                            console.log("dragging");
                        }}
                    />
                </div>
                <Form.Group widths="equal" className={classes.itemForm}>
                    <Controller
                        control={control}
                        name={`items[${index}].label`}
                        defaultValue={item.label}
                        render={({ name, value, onChange }) => (
                            <Form.Input
                                name={name}
                                value={value}
                                onChange={onChange}
                                label="Label"
                                placeholder="My label"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={`items[${index}].url`}
                        defaultValue={item.url}
                        render={({ name, value, onChange }) => (
                            <Form.Input
                                name={name}
                                value={value}
                                onChange={onChange}
                                label="URL"
                                placeholder="My URL"
                            />
                        )}
                    />
                </Form.Group>
                <div className={classes.right}>
                    <NSIconButton icon="close" onClick={() => remove(index)} />
                </div>
            </div>
        </List.Item>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    control: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
};

export default ItemCard;
