import { ReactNode } from "react";

// Add your own custom types in here
export interface Dog {
	id: number;
	name: string;
	image: string;
	description: string;
	isFavorite: boolean;
}

export type SectionProps = {
	children: ReactNode;
	displayForm: boolean;
	setDisplayForm: (value: boolean) => void;
	displayFavorites: string;
	setDisplayFavorites: (value: string) => void;
	favoriteDogs: Dog[];
	unfavoriteDogs: Dog[];
};

export type SetProps = {
	setAllDogs: (dogs: Dog[] | null) => void;
	setFavoriteDogs: (dogs: Dog[]) => void; // Optional
	setUnfavoriteDogs: (dogs: Dog[]) => void; // Optional
};

export type DogProps = {
	displayFavorites: string;
	favoriteDogs: Dog[];
	unfavoriteDogs: Dog[];
	allDogs: Dog[] | null;
	setAllDogs: (dogs: Dog[] | null) => void;
	setFavoriteDogs: (dogs: Dog[]) => void;
	setUnfavoriteDogs: (dogs: Dog[]) => void;
};
