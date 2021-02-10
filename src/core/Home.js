import React from "react";
import Base from "./Base";
import "./helper/home.css";
export default function Home() {
	return (
		<Base>
			<div class="home_title_div">
				<div class="home_title_inner_div">
					<div class="home_title_heading">
						<h2>Welcome to Khelotsav</h2>
					</div>
					<div class="home_about_p">
						<p>
							This web site helps in organising kehlotsav sport
							event. The main focus of this web site is to make
							registration process easy and to reduce the problems
							that occurs during registration. Using this web site
							anyone can make their registration to participate in
							this event. Before making your registration please
							read the process of making registration in order to
							avoid mistakes.
						</p>
					</div>
				</div>
			</div>
		</Base>
	);
}
