import React from "react";
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
	itemCard: {
		display: "flex",
	}
});

export const ItemCard = ({index, item}) => {
	const classes = useStyles();

	return (
		<div className={classes.itemCard}>
			<span><b>{index}</b>.</span>
			<a href={item.url}>{item.label}</a>
		</div>
	);
}

export default ItemCard;