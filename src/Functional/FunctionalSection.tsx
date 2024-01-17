// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { SectionProps } from "../types";

export const FunctionalSection = ({
	children,
	displayForm,
	setDisplayForm,
	displayFavorites,
	setDisplayFavorites,
	favoriteDogs,
	unfavoriteDogs,
}: SectionProps) => {
	return (
		<section id="main-section">
			<div className="container-header">
				<div className="container-label">Dogs: </div>
				<Link to={"/class"} className="btn">
					Change to Class
				</Link>
				<div className="selectors">
					{/* This should display the favorited count */}
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

					{/* This should display the unfavorited count */}
					<div
						className={`selector ${
							displayFavorites === "unfavorited" && !displayForm ? "active" : ""
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
};
