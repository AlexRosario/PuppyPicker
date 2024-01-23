import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";

import { Dog, DogProps } from "../types";

export const FunctionalDogs = ({
	activeTab,
	allDogs,
	setAllDogs,
}: DogProps) => {
	const favoriteDogs = allDogs?.filter((dog) => dog.isFavorite);
	const unfavoriteDogs = allDogs?.filter((dog) => !dog.isFavorite);
	const [isLoading, setIsLoading] = useState(false);
	const dogsToDisplay =
		activeTab === "none"
			? allDogs
			: activeTab === "favorites"
			? favoriteDogs
			: unfavoriteDogs;

	const refreshState = () => {
		Requests.getAllDogs().then((data: Dog[]) => {
			setAllDogs(data);
		});
	};

	const handleDeleteDog = (dogId: number) => {
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
		setIsLoading(true);
		const dog = allDogs!.find((dog) => dog.id === dogId);
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
			{dogsToDisplay?.map((dog) => (
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
