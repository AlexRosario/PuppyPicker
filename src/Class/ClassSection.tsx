// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { SectionProps } from "../types";

export class ClassSection extends Component<SectionProps> {
	render() {
		const {
			children,
			displayForm,
			setDisplayForm,
			displayFavorites,
			setDisplayFavorites,
			favoriteDogs,
			unfavoriteDogs,
		} = this.props;

		return (
			<section id="main-section">
				<div className="container-header">
					<div className="container-label">Dogs: </div>
					<Link to={"/functional"} className="btn">
						Change to Functional
					</Link>
					<div className="selectors">
						<div
							className={`selector ${
								displayFavorites === "all" && !displayForm ? "active" : ""
							}`}
							onClick={() => {
								if (displayForm === true) {
									setDisplayForm(!displayForm);
								}
								setDisplayFavorites("all");
							}}>
							All
						</div>
						<div
							className={`selector ${
								displayFavorites === "favorited" && !displayForm ? "active" : ""
							}`}
							onClick={() => {
								if (displayForm === true) {
									setDisplayForm(!displayForm);
								}
								setDisplayFavorites("favorited");
							}}>
							favorited ( {favoriteDogs?.length} )
						</div>
						<div
							className={`selector ${
								displayFavorites === "unfavorited" && !displayForm
									? "active"
									: ""
							}`}
							onClick={() => {
								if (displayForm === true) {
									setDisplayForm(!displayForm);
								}
								setDisplayFavorites("unfavorited");
							}}>
							unfavorited ( {unfavoriteDogs?.length} )
						</div>
						<div
							className={`selector ${displayForm ? "active" : ""}`}
							onClick={() => {
								if (displayForm === false) {
									setDisplayForm(!displayForm);
								}
							}}>
							create dog
						</div>
					</div>
				</div>
				<div className="content-container">{children}</div>
			</section>
		);
	}
}
