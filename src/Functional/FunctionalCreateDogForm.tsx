import React, { useState } from "react";
import { Requests } from "../api";
import { dogPictures } from "../dog-pictures";
import { SetProps, Dog } from "../types";
import toast from "react-hot-toast";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ setAllDogs }: SetProps) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(defaultSelectedImage);
	const [isFavorite, setIsFavorite] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		Requests.postDog({ name, description, image, isFavorite })
			.catch(() => console.error("Error: could not post."))
			.then(() => {
				toast.success(
					"Thank you for bringing this pup into the World! 🐶 woof!"
				);
			})
			.finally(() => {
				setIsLoading(false);
			});
		Requests.getAllDogs().then((data: Dog[]) => {
			setAllDogs(data);
		});
		setName("");
		setDescription("");
		setImage(defaultSelectedImage);
		setIsFavorite(false);
	};

	return (
		<>
			<form action="" id="create-dog-form" onSubmit={handleSubmit}>
				<h4>Create a New Dog</h4>
				<label htmlFor="name">Dog Name</label>
				<input
					type="text"
					id="name"
					disabled={isLoading}
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="description">Dog Description</label>
				<textarea
					id="description"
					cols={80}
					rows={10}
					disabled={isLoading}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label htmlFor="picture">Select an Image</label>
				<div className="select-format">
					<select
						id="picture"
						value={image}
						disabled={isLoading}
						onChange={(e) => setImage(e.target.value)}>
						{Object.entries(dogPictures).map(([label, pictureValue]) => (
							<option value={pictureValue} key={pictureValue}>
								{label}
							</option>
						))}
					</select>
					<img className="doggie-image" src={image}></img>
				</div>

				<input type="submit" disabled={isLoading} />
			</form>
		</>
	);
};
