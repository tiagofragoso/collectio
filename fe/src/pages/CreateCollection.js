import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { navigate } from "@reach/router";
import { Header, Form, List, Button } from "semantic-ui-react";
import { createUseStyles } from "react-jss";

import PageLayout from "../components/common/PageLayout";
import ItemCard from "../components/create/ItemCard";

const useStyles = createUseStyles({
    actions: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    addBtn: {
        border: "1px dashed rgba(0,0,0,0.6)!important",
        boxShadow: "none!important",
        "&:hover": {
            border: "1px solid!important",
        },
    },
});

export const CreateCollection = () => {
    const classes = useStyles();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            items: [{ label: "", url: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const url = `${process.env.REACT_APP_API_URL}/collections`;

    const onSubmit = async (data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.status !== 201) {
            return;
        }
        const { _id } = await res.json();
        navigate(_id);
    };

    return (
        <PageLayout>
            <Header size="huge">
                New collection
            </Header>
            <section>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ name, value, onChange }) => (
                            <Form.Input
                                name={name}
                                value={value}
                                onChange={onChange}
                                label="Name"
                                placeholder="My collection"
                            />
                        )}
                    />
                    <section>
                        <Header size="medium">Items</Header>
                        <List>
                            {fields.map((item, index) => (
                                <ItemCard
                                    key={index}
                                    item={item}
                                    index={index}
                                    control={control}
                                    remove={remove}
                                />
                            ))}
                        </List>
                    </section>
                    <Button
                        className={classes.addBtn}
                        basic compact fluid
                        type="button"
                        icon="add"
                        content="Add item"
                        onClick={() => {
                            append({ label: "", url: "" });
                        }}
                    />
                    <section className={classes.actions}>
                        <Button
                            type="button" onClick={() => {
                                reset({ name: "", items: [{ label: "", url: "" }] });
                            }} content="Reset"
                        />
                        <Form.Button primary content="Submit" />
                    </section>
                </Form>
            </section>
        </PageLayout>
    );
};

export default CreateCollection;
