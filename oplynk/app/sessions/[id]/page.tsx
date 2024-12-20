
"use client";

import Gifts from "@/components/gifts/Gifts";
import ContributionChart from "@/components/sessionpage/ContributionChart";
import MessageForm from "@/components/sessionpage/MessageForm";
import UpdateSession from "@/components/sessionpage/UpdateSession";
import { deleteSession, getSessionById } from "@/lib/actions/session.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SessionProps {
	params: Promise<{ id: string }>;
}
const Session = ({
	params
}: SessionProps) => {
	const [sessionId, setSessionId] = useState('');
	const [session, setSession] = useState<any>({});
	const [isGiftsOpen, setIsGiftsOpen] = useState(false);
	const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const fetchParamsAndSession = async () => {
			try {
				const resolvedParams = await params;
				const id = resolvedParams.id;
				setSessionId(id);

				const [fetchedSession, currentUser] = await Promise.all([
					getSessionById(id),
					getCurrentUser(),
				])
				setSession(fetchedSession);
				setUser(currentUser);
				console.log("Session", fetchedSession);
				console.log("User", currentUser);
			} catch (error) {
				console.error("Error fetching session", error);
			}
		};

		fetchParamsAndSession();
	}, [params]);

	const handleDeleteSession = async (sessionId: string) => {
		try {
			await deleteSession(sessionId);
			window.location.href = '/';
		} catch (error) {
			console.error("Error deleting session", error);
		}
	}

	return (
		<main className="container">
			<section className="flex flex-col items-center justify-center xl:min-h-[40vh] md:min-h-[30vh] min-h-[40vh] relative">
				<div className="text-center xl:w-[60vw] md:w-[80vw]">
					<h1 className="text-4xl font-extrabold textcolor">
						{session.title}
					</h1>
					<p className="font-medium text-center mt-4 max-sm:mt-6">
						{session.description}
					</p>
				</div>
				<button className="btn mt-4 max-sm:mt-6 flex-center gap-2"
					onClick={() => {
						setIsGiftsOpen(true);
					}}
				>
					Send Gifts
					<Image
						src="/assets/icons/giftbox.png"
						alt="giftbox"
						width={20}
						height={20}
					/>
				</button>
				{user && session && user.$id === session.user_Id && (
					<div className='absolute max-sm:top-[16%] right-[4%] top-[40%] flex flex-col items-center space-y-2 border-2 p-1 rounded-full '>
					<div className='' onClick={() => setIsUpdateFormOpen(true)}>
						<Image
							src="/assets/icons/edit.png"
							alt="edit"
							width={16}
							height={16}
						/>
					</div>
					<div className='' onClick={() => handleDeleteSession(session.$id)}>
						<Image
							src="/assets/icons/delete.png"
							alt="edit"
							width={16}
							height={16}
						/>
					</div>
				</div>
				)}
			</section>
			<section className="pd-x flex justify-between flex-col my-6 space-y-6">
				{session.target > 0 && (
					<div className="border-4 border-dodger-blue rounded-lg">
					<div className="rounded-lg">
						<ContributionChart target={session.target} contributed={session.contributed} gifts={session.giftsReceived}/>
					</div>
					{/* <div className="sm:w-[40%] bg-white rounded-lg text-2xl font-extrabold p-6 text-center">Gifts Received</div> */}
				</div>
				)}
				<div>
					<div>
						<h2 className="text-xl font-extrabold text-center ">Chat with other members</h2>
					</div>
					<MessageForm sessionId={sessionId} />
				</div>


			</section>
			{isGiftsOpen && (
				<Gifts
					closeGifts={() => setIsGiftsOpen(false)}
					receiverId={session.user_Id}
					sessionId={session.$id}
				/>
			)}

			{isUpdateFormOpen && (
				<UpdateSession closeForm={() => setIsUpdateFormOpen(false)} session={session} setSession={setSession}/>
			)}
		</main>
	);
};

export default Session;
