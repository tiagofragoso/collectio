import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { navigate } from "@reach/router";

import PageLayout from "../components/PageLayout";

export const CreateCollection = () => {
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
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
            method: "POST", // *GET, POST, PUT, DELETE, etc.
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
            <h2>
                New collection
            </h2>
            <section>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        name="name"
                        placeholder="My collection"
                        ref={register()}
                    />
                    <section>
                        <h4>Items</h4>
                        <ul>
                            {fields.map((item, index) => (
                                <li key={item.id}>
                                    <input
                                        name={`items[${index}].label`}
                                        placeholder="label"
                                        ref={register()}
                                    />
                                    <input
                                        name={`items[${index}].url`}
                                        placeholder="url"
                                        ref={register()}
                                    />
                                    <button type="button" onClick={() => remove(index)}>
                                        x
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <button
                            type="button"
                            onClick={() => {
                                append({ label: "", url: "" });
                            }}
                        >
                            +
                        </button>
                        <input type="submit" />
                    </section>
                </form>
            </section>
        </PageLayout>
    );
};

export default CreateCollection;
