import { useState, useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
    const [redirect,setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    // console.log(subpage);
    if(subpage===undefined) {
        subpage='profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }
    
    if(redirect){
        return <Navigate to={redirect} /> 
    }

    return (
        <div>
            <AccountNav />
            {subpage==='profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button onClick={logout} className="primary max-w-sm mt-4">Logout</button>
                </div>
            )}
            {subpage==='places' && (
               <PlacesPage />
            )}
        </div> 
    );
}

//When user is rendered first , it is rendering as null,
//and that's why it's navigating to login (as usercontext takes time to fetch the profile).

//For logout button, we need an api end point to logout
//Reset the cookie. 

