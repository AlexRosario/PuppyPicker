import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog, ActiveTab } from "../types";

export class ClassApp extends Component {
	state = {
		activeTab: "none",
		allDogs: null,
	};
	setActiveTab = (activeTab: ActiveTab) => {
		this.setState({ activeTab });
	};
	setAllDogs = (allDogs: Dog[] | null) => {
		this.setState({ allDogs });
	};

	componentDidMount() {
		Requests.getAllDogs().then((data) => {
			this.setState({
				allDogs: data,
				favoriteDogs: data.filter((dog: Dog) => dog.isFavorite),
				unfavoriteDogs: data.filter((dog: Dog) => !dog.isFavorite),
			});
		});
	}
	render() {
		const { activeTab, allDogs } = this.state;

		console.log(allDogs);
		return (
			<div className="App" style={{ backgroundColor: "goldenrod" }}>
				<header>
					<h1>pup-e-picker (Class Version)</h1>
				</header>
				<ClassSection
					allDogs={allDogs}
					setAllDogs={this.setAllDogs}
					activeTab={activeTab}
					setActiveTab={this.setActiveTab}>
					{/* should be inside of the ClassSection component using react children */}
					{activeTab !== "create-form" && (
						<ClassDogs
							activeTab={activeTab}
							allDogs={allDogs}
							setAllDogs={this.setAllDogs}
						/>
					)}
					{activeTab === "create-form" && (
						<ClassCreateDogForm setAllDogs={this.setAllDogs} />
					)}
				</ClassSection>
			</div>
		);
	}
}
