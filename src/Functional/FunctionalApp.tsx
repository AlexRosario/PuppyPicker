import { useState, useEffect } from "react";
import { Requests } from "../api";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog, ActiveTab } from "../types";

export function FunctionalApp() {
	const [activeTab, setActiveTab] = useState<ActiveTab>("none");
	const [allDogs, setAllDogs] = useState<Dog[] | null>(null);

	useEffect(() => {
		Requests.getAllDogs().then((data) => {
			setAllDogs(data);
		});
	}, []);

	return (
		<div className="App" style={{ backgroundColor: "skyblue" }}>
			<header>
				<h1>pup-e-picker (Functional)</h1>
			</header>
			<FunctionalSection
				allDogs={allDogs}
				setAllDogs={setAllDogs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}>
				{activeTab !== "create-form" && (
					<FunctionalDogs
						activeTab={activeTab}
						allDogs={allDogs}
						setAllDogs={setAllDogs}
					/>
				)}
				{activeTab === "create-form" && (
					<FunctionalCreateDogForm setAllDogs={setAllDogs} />
				)}
			</FunctionalSection>
		</div>
	);
}
