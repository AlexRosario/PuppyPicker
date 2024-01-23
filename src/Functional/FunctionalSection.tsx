// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { SectionProps } from "../types";

export const FunctionalSection = ({
	children,
	activeTab,
	setActiveTab,
	allDogs,
}: SectionProps) => {
	const favoriteDogs = allDogs?.filter((dog) => dog.isFavorite);
	const unfavoriteDogs = allDogs?.filter((dog) => !dog.isFavorite);
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
						className={`selector ${activeTab === "none" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("none");
						}}>
						All( {allDogs?.length} )
					</div>
					<div
						className={`selector ${activeTab === "favorites" ? "active" : ""}`}
						onClick={() => {
							setActiveTab("favorites");
						}}>
						favorited ( {favoriteDogs?.length} )
					</div>

					{/* This should display the unfavorited count */}
					<div
						className={`selector ${
							activeTab === "unfavorites" ? "active" : ""
						}`}
						onClick={() => {
							setActiveTab("unfavorites");
						}}>
						unfavorited ( {unfavoriteDogs?.length} )
					</div>
					<div
						className={`selector ${
							activeTab === "create-form" ? "active" : ""
						}`}
						onClick={() => {
							setActiveTab("create-form");
						}}>
						create dog
					</div>
				</div>
			</div>
			<div className="content-container">{children}</div>
		</section>
	);
};
