"use client"
import { storeUserInfo } from "@/services/user-info";

async function yourDatabaseQueryToFetchUserData(email, password) {
    try {
        const options = { email, password }
        const resUser = await fetch(`https://dream-maker-super-shop-backend.vercel.app/api/v1/auth/signin`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(options),
        })
        const dataUser = await resUser.json();

        if (resUser.ok) {
            const { accessToken } = dataUser.data;

            console.log(accessToken)
            const user = {
                accessToken
            };
            return user;
        } else {
            console.error("Login failed:", dataUser.message);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export default yourDatabaseQueryToFetchUserData;