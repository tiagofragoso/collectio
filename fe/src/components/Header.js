import React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
	navbar: {
		width: "100vw",
		height: "60px",
		backgroundColor: "rgb(54,53,60)",
		color: "white",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	logoText: {
		fontSize: "1.5rem",
		letterSpacing: "2px"
	}
});

export const Header = () => {
	const classes = useStyles();
	return (
		<header className={classes.navbar}>
			<span className={`${classes.logoText} no-select`}>
				<b>collect.</b>io
			</span>
		</header>
	);
};

export default Header;