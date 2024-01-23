import { ReactNode } from "react";

// Add your own custom types in here
export interface Dog {
	id: number;
	name: string;
	image: string;
	description: string;
	isFavorite: boolean;
}
export type ActiveTab = "none" | "create-form" | "favorites" | "unfavorites";
export type SectionProps = {
	children: ReactNode;
	activeTab: string;
	allDogs: Dog[] | null;
	setAllDogs: (dogs: Dog[] | null) => void;
	setActiveTab: (activeTab: ActiveTab) => void;
};

export type SetProps = {
	setAllDogs: (dogs: Dog[] | null) => void;
};

export type DogProps = {
	activeTab: string;
	allDogs: Dog[] | null;
	setAllDogs: (dogs: Dog[] | null) => void;
};
