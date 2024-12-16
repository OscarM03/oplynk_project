"use client";

import SearchForm from "@/components/home/SearchForm";
import SessionCreate from "@/components/home/SessionCreate";
import Sessions from "@/components/home/Sessions";
import { useState, useEffect } from "react";

export default function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	// const query = (await searchParams).query;
	// const params = query ?  query :  null;
	const [createdSession , setCreatedSession] = useState<any>(null);
	const [params, setParams] = useState<string | null>(null);

	useEffect(() => {
		const fetchParams = async () => {
			const resolvedParams = await searchParams;
			setParams(resolvedParams.query || null);
		};
		fetchParams();
	}, [searchParams]);

	const query = params;
	

	return (
		<main className="">
			<section className="container min-h-[60vh] md:min-h-[40vh] lg:min-h-[35vh] xl:min-h-[50vh]  flex flex-col justify-center items-center">
				<div className="md:w-[85%] relative">
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
					<SessionCreate setSession={setCreatedSession}/>
				</div>
			</section>
			<section className="container">
				<div className="pd-x mt-8 max-sm:mt-2">
					{/* <div className="flex justify-center">
						<div className="flex items-center justify-between w-[370px] border-2 border-dodger-blue rounded-full bg-dodger-blue">
							<input
								type="text"
								value={searchQuery}
								placeholder="Search for a session..."
								onChange={(e) => setSearchQuery(e.target.value)}
								className="p-2 w-[85%] rounded-l-full outline-none"
							/>
							<Image
								src="/assets/icons/search.png"
								alt="search"
								width={20}
								height={20}
								className="mr-4"
								onClick={handleSearch}
							/>
						</div>
					</div> */}

					<SearchForm query={query} />
					<Sessions params={params} newSession={createdSession}/>
					{/* <NextPrev currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
				</div>
			</section>
		</main>
	);
}
