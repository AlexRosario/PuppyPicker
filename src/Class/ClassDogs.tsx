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

	favoriteDogs = this.props.allDogs?.filter((dog) => dog.isFavorite);
	unfavoriteDogs = this.props.allDogs?.filter((dog) => !dog.isFavorite);

	getDogsToDisplay = () => {
		return this.props.activeTab === "none"
			? this.props.allDogs
			: this.props.activeTab === "favorites"
			? this.props.allDogs?.filter((dog) => dog.isFavorite)
			: this.props.allDogs?.filter((dog) => !dog.isFavorite);
	};

	refreshState = () => {
		Requests.getAllDogs().then((data) => {
			this.props.setAllDogs(data);
		});
	};

	handleDeleteDog = (dogId: number) => {
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
		this.setState({ isLoading: true });

		const dog = this.props.allDogs!.find((dog: Dog) => dog.id === dogId);
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
