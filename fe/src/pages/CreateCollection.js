import React from "react";
import * as yup from "yup";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { navigate } from "@reach/router";
import { Header, Form, List, Button, Input } from "semantic-ui-react";
import { createUseStyles } from "react-jss";
import { yupResolver } from "@hookform/resolvers/yup";

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

const schema = yup.object().shape({
    name: yup.string().max(75).required(),
    items: yup.array().min(1).max(9).of(yup.object().shape({
        label: yup.string().max(50),
        url: yup.string().url().required(),
    })),
});

export const CreateCollection = () => {
    const classes = useStyles();

    const { control, handleSubmit, reset, errors } = useForm({
        defaultValues: {
            name: "",
            items: [{ label: "", url: "" }],
        },
        mode: "onChange",
        resolver: yupResolver(schema),
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
                            <Form.Field
                                error={!!errors.name}
                            >
                                <label>Name</label>
                                <Input
                                    name={name}
                                    value={value}
                                    onChange={onChange}
                                    size="big"
                                    maxLength={75}
                                    placeholder="My collection"
                                />
                            </Form.Field>
                        )}
                    />
                    <section>
                        <Header size="medium">Items</Header>
                        <List>
                            {fields.map((item, index) => (
                                <ItemCard
                                    error={errors.items ? errors.items[index] : null}
                                    key={index}
                                    item={item}
                                    index={index}
                                    control={control}
                                    remove={fields.length > 1 ? remove : undefined}
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
