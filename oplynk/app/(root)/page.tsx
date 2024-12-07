import Image from "next/image";

export default function Home() {
    return (
		<main>
			<section className="container min-h-[60vh] md:min-h-[40vh] lg:min-h-[35vh] xl:min-h-[50vh]  flex flex-col justify-center items-center">
				<div className="md:w-[80%]">
					<h1 className="text-3xl sm:text-4xl text-center font-extrabold ">
						Connecting The{" "}
						<span className="textcolor text-4xl sm:text-5xl">Globe</span>
					</h1>
					<h1 className="text-2xl  sm:text-3xl font-extrabold mt-2 text-center">
						Through{" "}
						<span className="textcolor text-3xl sm:text-4xl">
							Meaningful
						</span>{" "}
						<span className="inline-block mt-2"> Contributions</span>
					</h1>
					<p className="text-center mt-2 text-gray-700">
						Join a global network dedicated to creating value through impactful
						contributions. Our platform ensures every effort counts, fostering
						collaboration and accountability to drive real change. Together, we
						can achieve more
					</p>
					<div className="flex justify-center">
					<button className="btn mt-4 flex gap-2 items-center">
						Create Session
						<Image
						src="/assets/icons/create.png"
						alt="create"
						width={20}
						height={20}
						/>
					</button>
					</div>
				</div>
			</section>
			<section className="container">
			<div className="pd-x mt-10 max-sm:mt-2">
				<div className="flex justify-center">
				<div className="flex items-center justify-between w-[370px] border-2 border-dodger-blue rounded-full bg-dodger-blue">
					<input
					type="text"
					placeholder="Search for a session..."
					className="p-2 w-[310px] rounded-l-full outline-none"
					/>
					<Image
					src="/assets/icons/search.png"
					alt="search"
					width={20}
					height={20}
					className="mr-4"
					/>
				</div>
				</div>

				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-20 gap-10">
				<div className=" bg rounded-lg ">
					<div className=" rounded-lg p-4 bg-white shadow-royal-blue relative translate-x-3 translate-y-3 max-sm:translate-x-2 max-sm:translate-y-2">
						<div className="flex justify-between items-center">
							<h1 className="font-bold ">November 19, 2024</h1>
							<p className="text-dodger-blue font-extrabold bg-body-bg px-4 py-1 rounded-full ">
							Coding
							</p>
						</div>
					<div className="flex items-center justify-between mt-4">
						<h1 className="text-lg font-bold text-dodger-blue">
							@OscarM
						</h1>
						<Image
							src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
							alt="avatar"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col items-center gap-6 mt-2">
						<h1 className="text-3xl font-extrabold mt-2 ">
							JavaScript Code
						</h1>
						<Image
							src="/assets/images/javascript.jpg"
							alt="JavaScript Code Image"
							width={400}
							height={250}
							className="rounded-lg"
						/>
					</div>
					<p className="text-gray-700 font-medium text-center mt-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
						hic eveniet totam nam accusamus minima voluptate dolor quis
						illo similique.
					</p>
					</div>
				</div>
				<div className=" bg rounded-lg">
					<div className=" rounded-lg p-4 bg-white shadow-royal-blue relative translate-x-3 translate-y-3 max-sm:translate-x-2 max-sm:translate-y-2">
						<div className="flex justify-between items-center">
							<h1 className="font-bold ">November 19, 2024</h1>
							<p className="text-dodger-blue font-extrabold bg-body-bg px-4 py-1 rounded-full ">
							Coding
							</p>
						</div>
					<div className="flex items-center justify-between mt-4">
						<h1 className="text-lg font-bold text-dodger-blue">
							@OscarM
						</h1>
						<Image
							src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
							alt="avatar"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col items-center gap-6 mt-2">
						<h1 className="text-3xl font-extrabold mt-2 ">
							JavaScript Code
						</h1>
						<Image
							src="/assets/images/javascript.jpg"
							alt="JavaScript Code Image"
							width={400}
							height={250}
							className="rounded-lg"
						/>
					</div>
					<p className="text-gray-700 font-medium text-center mt-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
						hic eveniet totam nam accusamus minima voluptate dolor quis
						illo similique.
					</p>
					</div>
				</div>
				<div className=" bg rounded-lg">
					<div className=" rounded-lg p-4 bg-white shadow-royal-blue relative translate-x-3 translate-y-3 max-sm:translate-x-2 max-sm:translate-y-2">
						<div className="flex justify-between items-center">
							<h1 className="font-bold ">November 19, 2024</h1>
							<p className="text-dodger-blue font-extrabold bg-body-bg px-4 py-1 rounded-full ">
							Coding
							</p>
						</div>
					<div className="flex items-center justify-between mt-4">
						<h1 className="text-lg font-bold text-dodger-blue">
							@OscarM
						</h1>
						<Image
							src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
							alt="avatar"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</div>
					<div className="flex flex-col items-center gap-6 mt-2">
						<h1 className="text-3xl font-extrabold mt-2 ">
							JavaScript Code
						</h1>
						<Image
							src="/assets/images/javascript.jpg"
							alt="JavaScript Code Image"
							width={400}
							height={250}
							className="rounded-lg"
						/>
					</div>
					<p className="text-gray-700 font-medium text-center mt-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
						hic eveniet totam nam accusamus minima voluptate dolor quis
						illo similique.
					</p>
					</div>
				</div>
				</div>
			</div>
			</section>
		</main>
    );
}
