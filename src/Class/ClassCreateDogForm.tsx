import React, { Component } from "react";
import { Requests } from "../api";
import { dogPictures } from "../dog-pictures";
import { SetProps, Dog } from "../types";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface FormState extends Omit<Dog, "id"> {
	isLoading: boolean;
}

export class ClassCreateDogForm extends Component<SetProps> {
	state: FormState = {
		name: "",
		description: "",
		image: defaultSelectedImage,
		isFavorite: false,
		isLoading: false,
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		this.setState({ isLoading: true });
		const { name, description, image, isFavorite } = this.state;
		Requests.postDog({ name, description, image, isFavorite } as Omit<
			FormState,
			"isLoading"
		>)
			.catch(() => console.error("Error: could not post."))
			.then(() => {
				toast.success(
					"Thank you for bringing this pup into the World! 🐶 woof!"
				);
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
		Requests.getAllDogs().then((data: Dog[]) => {
			this.props.setAllDogs(data);
		});
		this.setState({
			name: "",
			description: "",
			image: defaultSelectedImage,
			isFavorite: false,
		});
	};

	render() {
		const { name, description, image, isLoading } = this.state;

		return (
			<>
				<form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
					<h4>Create a New Dog</h4>
					<label htmlFor="name">Dog Name</label>
					<input
						type="text"
						id="name"
						disabled={isLoading}
						value={name}
						onChange={(e) => this.setState({ name: e.target.value })}
					/>
					<label htmlFor="description">Dog Description</label>
					<textarea
						id="description"
						cols={80}
						rows={10}
						disabled={isLoading}
						value={description}
						onChange={(e) => this.setState({ description: e.target.value })}
					/>
					<label htmlFor="picture">Select an Image</label>
					<div className="select-format">
						<select
							id="picture"
							value={image}
							disabled={isLoading}
							onChange={(e) => this.setState({ image: e.target.value })}>
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
	}
}

// use this as your default selected image
