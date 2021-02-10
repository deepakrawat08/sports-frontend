import React, { Children } from "react";
import Menu from "./Menu";
import './helper/base.css'
const Base = ({
	title = "",
	description="",
	children }) => {
	return (
		<div id='parent_container'>
			<Menu >
			<div className="container_base" >
				<p className="base_title">{title}</p>
				<p className="base_description">{description}</p>
			</div>
				<div >{children}</div>
			</Menu>
		</div>
	);
};
export default Base;
