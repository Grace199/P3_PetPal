import React, { useState, useEffect } from "react";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate } from "react-router-dom";

const Index = () => {
	const [formData, setFormData] = useState({
		account: {
			avatar: "",
			email: "",
			name: "",
		},
		province: "",
		city: "",
		phone_number: "",
		animal_preference: "",
		age_preference: "",
		sex_preference: "",
		size_preference: "",
		open_to_special_needs_animals: "",
		breed_preference: "",
	});
	const [toDelete, setDelete] = useState(false);
	const [prevUserName, setPrevUserName] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [phoneNumErr, setPhoneNumErr] = useState("");
	const [nameErr, setNameErr] = useState("");
	const [picErr, setPicErr] = useState("");

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name.includes("account.")) {
			setFormData((prevData) => ({
				...prevData,
				account: {
					...prevData.account,
					[name.split("account.")[1]]: value,
				},
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!toDelete) {
			try {
				const userID = parseInt(localStorage.getItem("userID"), 10) || "";

				var filteredFormData = new FormData();
				if (avatar) {
					filteredFormData.append('account.avatar', avatar);
				}
				if (prevUserName !== formData.account.name) {
					filteredFormData.append('account.name', formData.account.name);
				}

				for (const fieldName in formData) {
					if (fieldName !== 'account') {
						const fieldValue = formData[fieldName];
						if (fieldValue !== "") {
							filteredFormData.append(fieldName, fieldValue);
						}
					}
				}

				const rest = await ajax_or_login(`/accounts/seeker/${userID}/`, {
					method: "PATCH",
					body: filteredFormData,
				}, navigate);

				if (!rest.ok) {
					console.log("here");
					if (rest.status === 400) {
						console.log("error 400");
						const responseBody = await rest.json();
						if (responseBody) {
							console.log(responseBody);
							if (responseBody.phone_number) {
								console.log("pn");
								setPhoneNumErr("Please enter a valid Canadian phone number.");
							} else {
								setPhoneNumErr("");
							}
							if (responseBody.account) {
								if (responseBody.account.name) {
									setNameErr("Another user with that name already exists.");
								} else {
									setNameErr("");
								}
								if (responseBody.account.avatar) {
									setPicErr("Invalid profile picture.");
								} else {
									setPicErr("");
								}
							}
						}
					}
				} else {
					setPhoneNumErr("");
					setNameErr("");
					setPicErr("");
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const userID = parseInt(localStorage.getItem("userID"), 10) || "";
				const url = `/accounts/seeker/${userID}/`;

				const res = await ajax_or_login(url, {
					method: "DELETE",
				}, navigate);

				if (res.ok) {
					navigate("/login/");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchUserData = async () => {
		try {
			const rest = await ajax_or_login(
				`/accounts/seeker/${parseInt(localStorage.getItem("userID"), 10) || ""
				}/`,
				{ method: "GET" },
				navigate
			);
			if (rest.ok) {
				const data = await rest.json();
				setPrevUserName(data.account.name);
				setFormData({
					account: {
						avatar: data.account.avatar || null,
						email: data.account.email || "",
						name: data.account.name || "",
					},
					province: data.province || "",
					city: data.city || "",
					phone_number: data.phone_number || "",
					animal_preference: data.animal_preference || "",
					age_preference: data.age_preference || "",
					sex_preference: data.sex_preference || "",
					size_preference: data.size_preference || "",
					open_to_special_needs_animals:
						data.open_to_special_needs_animals || "",
					breed_preference: data.breed_preference || "",
				});

				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			setAvatar(file);
		}
	};


	return (
		<main>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex flex-col gap-6 justify-center items-center drop-shadow-xl">
					<label htmlFor="avatarInput" className="rounded-full min-h-[200px] aspect-square bg-black md:hidden">
						<div className="rounded-full min-h-[200px] aspect-square bg-black group relative cursor-pointer md:hidden">
							<img
								src={localStorage.getItem("avatar")}
								className="w-full group-hover:opacity-50 rounded-full border border-primary object-cover h-full"
								alt="Avatar"
							/>
							<i className="uil uil-edit-alt absolute left-[46%] top-[46%] hidden group-hover:block text-white text-4xl"></i>
						</div>
					</label>
					<div className="w-full drop-shadow-xl">
						<div className="bg-primary flex justify-center items-center h-28 rounded-t-3xl max-md:justify-evenly">
							<div className="flex justify-center items-center flex-col px-8">
								<input
									name="account.name"
									className="font-bold w-full text-5xl text-white text text-center max-sm:text-3xl bg-transparent"
									value={formData.account.name}
									onChange={handleInputChange}
								/>
								{nameErr !== "" ?
									<p className="font-semibold text-xs sm:text-sm text-red-500 pt-1">{nameErr}</p>
									:
									<></>
								}
							</div>
						</div>
						<div className="bg-white flex justify-center items-center rounded-b-3xl flex-row gap-20 max-2xl:gap-16 max-lg:gap-10 p-10 w-full">
							<div className="basis-2/3 w-full">
								<h1 className="font-medium text-3xl max-sm:text-2xl text-primary mb-2">
									Your Location
								</h1>
								<div className="flex flex-row gap-6 mb-10 max-lg:flex-col w-full">
									<div className="flex flex-col w-full">
										<label htmlFor="City" className="text-base text-text">
											City:
										</label>
										<input
											id="City"
											name="city"
											value={formData.city}
											onChange={handleInputChange}
											className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
										/>
									</div>
									<div className="flex flex-col w-full">
										<label htmlFor="Province" className="text-base text-text">
											Province:
										</label>
										<input
											value={formData.province}
											name="province"
											id="Province"
											type="text"
											onChange={handleInputChange}
											className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
										/>
									</div>
								</div>
								<h1 className="font-medium text-3xl max-sm:text-2xl text-primary mb-2">
									Contact Information
								</h1>
								<div className="flex flex-row gap-6 mb-8 max-lg:flex-col">
									<div className="flex flex-col w-full">
										<label htmlFor="Email" className="text-base text-text ">
											Email Address:
										</label>
										<div className="border-secondary rounded-md h-11 w-full border border-opacity-50 bg-white px-5 justify-left items-center flex">
											{formData.account.email}
										</div>

									</div>
									<div className="flex flex-col w-full">
										<label
											htmlFor="phone_number"
											className="text-base text-text"
										>
											Phone Number:
										</label>
										<input
											name="phone_number"
											value={formData.phone_number}
											type="text"
											onChange={handleInputChange}
											className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
										/>
										{phoneNumErr !== "" ?
											<p className="font-semibold text-xs sm:text-sm text-red-500 pt-1">{phoneNumErr}</p>
											:
											<></>
										}
									</div>
								</div>
							</div>
							<input
								type="file"
								id="avatarInput"
								accept="image/*"
								onChange={handleFileChange}
								className="hidden"
							/>

							<div className="rounded-full min-h-[200px] aspect-square bg-black group relative cursor-pointer max-md:hidden basis-1/3">
								<label htmlFor="avatarInput" className="w-full rounded-full">
									<img
										src={localStorage.getItem("avatar")}
										className="w-full group-hover:opacity-50 rounded-full border border-primary object-cover h-full"
										alt="Avatar"
									/>
									<i className="uil uil-edit-alt absolute left-[46%] top-[46%] hidden group-hover:block text-white text-4xl"></i>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-primary mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl flex-col rounded-3xl p-8">
					<h1 className="font-medium text-3xl text-white pb-2 mb-3">
						Preferences
					</h1>
					<div className="flex flex-col mb-2 w-full">
						<select
							name="animal_preference"
							value={formData.animal_preference}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
						>
							<option value="">Select a pet type</option>
							<option value="dog">Dog</option>
							<option value="cat">Cat</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="flex flex-col mb-2 w-full">
						<select
							name="age_preference"
							value={formData.age_preference}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
						>
							<option value="">Select an age</option>
							<option value={1}>Infant</option>
							<option value={2}>Young</option>
							<option value={3}>Adult</option>
							<option value={4}>Senior</option>
						</select>
					</div>
					<div className="flex flex-col mb-2 w-full">
						<select
							name="sex_preference"
							value={formData.sex_preference}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
						>
							<option value="">Select a gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div className="flex flex-col mb-2 w-full">
						<select
							name="size_preference"
							value={formData.size_preference}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
						>
							<option value="">Select a size</option>
							<option value={1}>Small</option>
							<option value={2}>Medium</option>
							<option value={3}>Large</option>
						</select>
					</div>
					<div className="flex flex-col mb-2 w-full">
						<select
							name="open_to_special_needs_animals"
							value={formData.open_to_special_needs_animals}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
						>
							<option value="">Open to special needs?</option>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
					</div>
					<div className="flex flex-col mb-2 w-full">
						<label htmlFor="Breed" className="text-white">
							Breed:
						</label>
						<input
							name="breed_preference"
							type="text"
							value={formData.breed_preference}
							onChange={handleInputChange}
							className="border-primary rounded-md h-11 border border-opacity-50 bg-white px-5"
						/>
					</div>
				</div>
				<div className="flex justify-center items-center mt-16 gap-16 max-md:flex-col max-md:gap-3">
					<button
						className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl"
						onClick={() => setDelete(false)}
					>
						Update Profile
					</button>
					<button
						className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl"
						onClick={() => setDelete(true)}
					>
						Delete Profile
					</button>
				</div>
			</form>
		</main>
	);
};

export default Index;
