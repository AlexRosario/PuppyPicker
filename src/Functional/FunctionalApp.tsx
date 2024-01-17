import { useState, useEffect } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";

export function FunctionalApp() {
	const [displayForm, setDisplayForm] = useState<boolean>(false);
	const [displayFavorites, setDisplayFavorites] = useState<string>("all");
	const [allDogs, setAllDogs] = useState<Dog[] | null>(null);
	const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
	const [unfavoriteDogs, setUnfavoriteDogs] = useState<Dog[]>([]);

	useEffect(() => {
		Requests.getAllDogs().then((data) => {
			setAllDogs(data);
			setFavoriteDogs(data.filter((dog: Dog) => dog.isFavorite));
			setUnfavoriteDogs(data.filter((dog: Dog) => !dog.isFavorite));
		});
	}, []);

	return (
		<div className="App" style={{ backgroundColor: "skyblue" }}>
			<header>
				<h1>pup-e-picker (Functional)</h1>
			</header>
			<FunctionalSection
				displayForm={displayForm}
				setDisplayForm={setDisplayForm}
				displayFavorites={displayFavorites}
				setDisplayFavorites={setDisplayFavorites}
				favoriteDogs={favoriteDogs}
				unfavoriteDogs={unfavoriteDogs}>
				{!displayForm && (
					<FunctionalDogs
						displayFavorites={displayFavorites}
						allDogs={allDogs}
						setAllDogs={setAllDogs}
						favoriteDogs={favoriteDogs}
						setFavoriteDogs={setFavoriteDogs}
						unfavoriteDogs={unfavoriteDogs}
						setUnfavoriteDogs={setUnfavoriteDogs}
					/>
				)}
				{displayForm && (
					<FunctionalCreateDogForm
						setAllDogs={setAllDogs}
						setUnfavoriteDogs={setUnfavoriteDogs}
						setFavoriteDogs={setFavoriteDogs}
					/>
				)}
			</FunctionalSection>
		</div>
	);
}
