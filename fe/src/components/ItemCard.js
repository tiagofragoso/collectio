import React from "react";
import {createUseStyles} from "react-jss";
import Microlink from "@microlink/react";
import styled from "styled-components";

const useStyles = createUseStyles({
	itemCard: {
		display: "flex",
	}
});

const StyledML = styled(Microlink)`
border-radius: 5px`;

export const ItemCard = ({index, item}) => {
	const classes = useStyles();

	return (
		<StyledML url={item.url} size="small" lazy/>
	);

	// return (
	// 	<div className={classes.itemCard}>
	// 		<span><b>{index}</b>.</span>
	// 		<a href={item.url}>{item.label}</a>
	// 	</div>
	// );
}

export default ItemCard;