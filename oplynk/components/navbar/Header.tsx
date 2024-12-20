"use client";

import {getCurrentUser, IsUserLoggedIn } from "@/lib/actions/user.actions";
import Link from "next/link";
import React from "react";
import NavAction from "./NavAction";
import { useState, useEffect } from "react";

const navLinks = [
	{
		label: "Sessions",
		href: "/sessions",
	},
	{
		label: "Gifts Library",
		href: "/gifts",
	}
]

const Header = () => {

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
		<header className="hidden sm:flex justify-between items-center sm:px-8 lg:px-12 py-2 shadow-md bg-white">
			<div>
				<Link href="/"> <h1 className="text-2xl font-extrabold textcolor">Oplynk</h1></Link>
			</div>
			<nav>
				<ul className="flex space-x-6 ">
					{navLinks.map((link, index) => (
						<li key={index} className="text-gray-600 hover:text-dodger-blue">
							<Link href={link.href}>
							 	<h2>{link.label}</h2>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<NavAction loggedIn={loggedIn} user={user}/>
		</header>
	);
};

export default Header;
