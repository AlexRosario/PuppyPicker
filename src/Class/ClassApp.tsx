import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { Dog } from "../types";

export class ClassApp extends Component {
	state = {
		displayForm: false,
		displayFavorites: "all",
		allDogs: null,
		favoriteDogs: [],
		unfavoriteDogs: [],
	};
	setDisplayForm = (displayForm: boolean) => {
		this.setState({ displayForm });
	};

	setDisplayFavorites = (displayFavorites: string) => {
		this.setState({ displayFavorites });
	};

	setAllDogs = (allDogs: Dog[] | null) => {
		this.setState({ allDogs });
	};

	setFavoriteDogs = (favoriteDogs: Dog[]) => {
		this.setState({ favoriteDogs });
	};

	setUnfavoriteDogs = (unfavoriteDogs: Dog[]) => {
		this.setState({ unfavoriteDogs });
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
		const {
			displayForm,
			displayFavorites,
			allDogs,
			favoriteDogs,
			unfavoriteDogs,
		} = this.state;

		console.log(allDogs);
		return (
			<div className="App" style={{ backgroundColor: "goldenrod" }}>
				<header>
					<h1>pup-e-picker (Class Version)</h1>
				</header>
				<ClassSection
					displayForm={displayForm}
					setDisplayForm={this.setDisplayForm}
					displayFavorites={displayFavorites}
					setDisplayFavorites={this.setDisplayFavorites}
					favoriteDogs={favoriteDogs}
					unfavoriteDogs={unfavoriteDogs}>
					{/* should be inside of the ClassSection component using react children */}
					{!displayForm && (
						<ClassDogs
							displayFavorites={displayFavorites}
							allDogs={allDogs}
							setAllDogs={this.setAllDogs}
							favoriteDogs={favoriteDogs}
							setFavoriteDogs={this.setFavoriteDogs}
							unfavoriteDogs={unfavoriteDogs}
							setUnfavoriteDogs={this.setUnfavoriteDogs}
						/>
					)}
					{displayForm && (
						<ClassCreateDogForm
							setAllDogs={this.setAllDogs}
							setUnfavoriteDogs={this.setUnfavoriteDogs}
							setFavoriteDogs={this.setFavoriteDogs}
						/>
					)}
				</ClassSection>
			</div>
		);
	}
}
