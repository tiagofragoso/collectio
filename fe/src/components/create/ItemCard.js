import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Controller } from "react-hook-form";
import { List, Form, Input, Button, Icon } from "semantic-ui-react";

const useStyles = createUseStyles({
    itemCard: {
        boxShadow: "0px 0px 5px 0px rgba(176,176,176,1)",
        marginBottom: "1.5em",
        position: "relative",
    },
    itemRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        padding: "12px 8px",
    },
    left: {
        padding: "8px",
        marginRight: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dragIcon: {
        color: "rgba(0,0,0,.3)",
        cursor: "grab",
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
    closeBtn: {
        position: "absolute",
        marginRight: "0",
        top: "-11px",
        right: "-11px",
        opacity: "0.6",
        "&:hover": {
            opacity: "1",
        },
    },
});

export const ItemCard = ({ item, index, control, remove }) => {
    const classes = useStyles();
    return (
        <List.Item key={item.id} className={classes.itemCard}>
            <div className={classes.itemRow}>
                <div className={classes.left}>
                    <span className={classes.index}>{index + 1}</span>
                    <Icon className={classes.dragIcon} fitted name="move" />
                    {/* <Button
                        type="button"
                        basic compact
                        size="tiny" icon="move"
                        onClick={() => {
                            console.log("dragging");
                        }}
                    /> */}
                </div>
                <Form.Group widths="equal" className={classes.itemForm}>
                    <Controller
                        control={control}
                        name={`items[${index}].label`}
                        defaultValue={item.label}
                        render={({ name, value, onChange }) => (
                            <Form.Field>
                                <label>Label</label>
                                <Input
                                    className={classes.itemInput}
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="My label"
                                />
                            </Form.Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name={`items[${index}].url`}
                        defaultValue={item.url}
                        render={({ name, value, onChange }) => (
                            <Form.Input
                                className={classes.itemInput}
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
                    <Button className={classes.closeBtn} circular compact size="mini" icon="close" onClick={() => remove(index)} />
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
