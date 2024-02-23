import Information from "@/components/Information/Information";
import Layout from "@/components/Layout/Layout";
import ProfilePage from "@/components/Profile/ProfilePage";
import React, { useEffect, useState } from "react";
import { userService } from "src/services";
import jwt_decode from "jwt-decode";

const Profile = () => {

    const [user, setUser] = useState(null);
    const [isLoggedInUser, setIsLoggedInUser] = useState({});

    useEffect(() => {
        getUserInfo();
    }, [isLoggedInUser.sub === null || isLoggedInUser.sub === undefined])

    async function getUserInfo() {
        if (userService.userValue !== null) {
            let token = await userService.userValue.data;
            setIsLoggedInUser(jwt_decode(token));
            getUser(isLoggedInUser.sub);
        }
        else {
            console.log("null e girdi")
        }
    }

    const getUser = (username) => {
        console.log("get username okumuyor ", username)
        userService.getByUsername(username).then((response) => {
            if (response.data) {
                setUser(response.data);
            }
        })
            .catch((error) => { console.log("error getByUsername") });
    };


    return (
        <Layout pageTitle="Profile"> {console.log(user)}
            {/*<PageHeader title="Login" />*/}
            <ProfilePage user={user} setUser={setUser} />
            <Information />
            {/*<GoogleMap />*/}
        </Layout>
    );
};

export default Profile;
