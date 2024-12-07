"use client";

import React from "react";
import NavAction from "./NavAction";
import {IsUserLoggedIn } from "@/lib/actions/user.actions";
import { useState, useEffect } from "react";


const MobileNav = () => {

	const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserId = async () => {
            setLoggedIn(await IsUserLoggedIn());
        };
        fetchUserId();
    }, []);
	
	return (
		<section className="sm:hidden flex justify-between items-center px-4 py-2 shadow-md bg-white">
			<div>
				<h1 className="text-xl font-extrabold textcolor">Oplynk</h1>
			</div>
			<NavAction loggedIn={loggedIn} />
		</section>
	);
};

export default MobileNav;
