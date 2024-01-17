import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog, DogProps } from "../types";

type loadState = {
	isLoading: boolean;
};

export class ClassDogs extends Component<DogProps, loadState, Dog> {
	state: loadState = {
		isLoading: false,
	};

	refreshState = () => {
		Requests.getAllDogs().then((data) => {
			this.props.setAllDogs(data);
			this.props.setFavoriteDogs(data.filter((dog: Dog) => dog.isFavorite));
			this.props.setUnfavoriteDogs(data.filter((dog: Dog) => !dog.isFavorite));
		});
	};
	getDogsToDisplay = () => {
		return this.props.displayFavorites === "all"
			? this.props.allDogs
			: this.props.displayFavorites === "favorited"
			? this.props.favoriteDogs
			: this.props.unfavoriteDogs;
	};

	handleDeleteDog = (dogId: number) => {
		alert("clicked trash");
		this.setState({ isLoading: true });
		Requests.deleteDog(dogId)
			.catch((error) => {
				console.error("Error deleting dog:", error);
			})
			.finally(() => {
				this.setState({ isLoading: false });
				this.refreshState();
			});
	};

	handleIsFavorite = (dogId: number) => {
		alert("clicked heart");
		this.setState({ isLoading: true });
		const dogsToDisplay = this.getDogsToDisplay();
		const dog = dogsToDisplay?.find((dog: Dog) => dog.id === dogId);
		if (dog) {
			Requests.updateDog(dogId, dog.isFavorite)
				.catch((error) => {
					console.error("Error updating dog:", error);
				})
				.finally(() => {
					this.setState({ isLoading: false });
					this.refreshState();
				});
		}
	};

	render() {
		const dogsToDisplay = this.getDogsToDisplay();
		const { isLoading } = this.state;

		return (
			<>
				{dogsToDisplay?.map((dog, index) => (
					<DogCard
						dog={dog}
						key={index}
						isLoading={isLoading}
						onTrashIconClick={() => this.handleDeleteDog(dog.id)}
						onHeartClick={() => this.handleIsFavorite(dog.id)}
						onEmptyHeartClick={() => this.handleIsFavorite(dog.id)}
					/>
				))}
			</>
		);
	}
}
