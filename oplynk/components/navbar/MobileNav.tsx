"use client";

import React from "react";
import NavAction from "./NavAction";
import { getCurrentUser, IsUserLoggedIn } from "@/lib/actions/user.actions";
import { useState, useEffect } from "react";
import Link from "next/link";


const MobileNav = () => {

	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<any>()

	useEffect(() => {
		const fetchUserId = async () => {
			const [user, userLoginState] = await Promise.all([
				getCurrentUser(),
				IsUserLoggedIn()
			]);
			setUser(user)
			setLoggedIn(userLoginState)
		};
		fetchUserId();
	}, []);


	return (
		<section className="sm:hidden flex justify-between items-center px-4 py-2 shadow-md bg-white">
			<div>
				<Link href="/"> <h1 className="text-2xl font-extrabold textcolor">Oplynk</h1></Link>
			</div>
			<NavAction loggedIn={loggedIn} user={user} />
		</section>
	);
};

export default MobileNav;
