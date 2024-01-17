import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";

import { Dog, DogProps } from "../types"; // Import the Dog type

export const FunctionalDogs = ({
	displayFavorites,
	favoriteDogs,
	unfavoriteDogs,
	allDogs,
	setAllDogs,
	setFavoriteDogs = () => {},
	setUnfavoriteDogs = () => {},
}: DogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const dogsToDisplay =
		displayFavorites === "all"
			? allDogs
			: displayFavorites === "favorited"
			? favoriteDogs
			: unfavoriteDogs;

	const refreshState = () => {
		Requests.getAllDogs().then((data: Dog[]) => {
			setAllDogs(data);
			setFavoriteDogs(data.filter((dog) => dog.isFavorite));
			setUnfavoriteDogs(data.filter((dog) => !dog.isFavorite));
		});
	};

	const handleDeleteDog = (dogId: number) => {
		alert("clicked trash");
		setIsLoading(true);
		Requests.deleteDog(dogId)
			.catch((error) => {
				console.error("Error deleting dog:", error);
			})
			.finally(() => {
				setIsLoading(false);
				refreshState();
			});
	};

	const handleIsFavorite = (dogId: number) => {
		alert("clicked heart");
		setIsLoading(true);
		const dog = dogsToDisplay!.find((dog) => dog.id === dogId);
		if (dog) {
			Requests.updateDog(dogId, dog.isFavorite)
				.catch((error) => {
					console.error("Error updating dog:", error);
				})
				.finally(() => {
					setIsLoading(false);
					refreshState();
				});
		}
	};

	return (
		<>
			{dogsToDisplay?.map((dog, index) => (
				<DogCard
					dog={dog}
					key={dog.id}
					isLoading={isLoading}
					onTrashIconClick={() => handleDeleteDog(dog.id)}
					onHeartClick={() => handleIsFavorite(dog.id)}
					onEmptyHeartClick={() => handleIsFavorite(dog.id)}
				/>
			))}
			;
		</>
	);
};
