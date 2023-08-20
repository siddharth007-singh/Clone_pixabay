import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Log} from "../asset";
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import {firebaseAuth} from "../config/firebase.config";
import {createNewUser} from "../sanity";
import {SET_USER} from "../context/actions/userActions";
import {useDispatch, useSelector} from "react-redux";

const HeaderStyle = {
    head:{
        position: "fixed",
        left:"20px",
        right:"20px",
        display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex:50,
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "300ms",
    },

    logo:{
        width: "10rem",
        height: "auto",
        objectFit: "contain",
        padding: "0.5rem",
    },

    beforeLogin:{
        position: "relative",
        cursor: "pointer",

        Img:{
            borderRadius: "9999px",
            width: "2.5rem",
            height: "2.5rem",
            objectFit: "cover",
        }
    },

    afterLogin:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap: "0.5rem",
        borderWidth: "1px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        paddingTop: "0.25rem",
        paddingBottom: "0.25rem",
        borderRadius: "0.375rem",
        cursor: "pointer",
        transitionProperty: "all",
        // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transitionDuration: "150ms",

    },
}


const Header = () => {
    // const [user, setUser] = useState(null);
    const[color, setColor] = useState(false);
    const user = useSelector((state)=>state.user);

    const dispatch = useDispatch();

    const provider = new GoogleAuthProvider();

    const changeColor = ()=>{
        if(typeof window!=="undefined"){
            if(window.scrollY>=1){
                setColor(true);
            }
            else{
                setColor(false);
            }
        }
    };

    if(typeof window!=="undefined"){
        window.addEventListener("scroll", changeColor);
    }

    const signWithGmail = async ()=>{
        await signInWithRedirect(firebaseAuth, provider).then(result=>{
            createNewUser(result?.user?.providerData[0]).then(()=>{
                console.log('New User Created');
                dispatch(SET_USER(result?.providerData[0]))
            });
        });
    };

    return(
        <header style={HeaderStyle.head} className={`${color?'bg-white': 'bg-transparent'}`}
        >
            {/*Logo Section*/}
            <NavLink to={"/"}>
                <img
                    src={Log}
                    alt="Main Logo "
                    style={HeaderStyle.logo}
                />
            </NavLink>
            {/*UserProfile Section */}
            {user?(
                <>
                    <div style={HeaderStyle.beforeLogin}>
                        <img
                            src={user?.photoURL}
                            style={HeaderStyle.beforeLogin.Img}
                            alt=""
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </>
            ):(
                <>
                    <div style={HeaderStyle.afterLogin} onClick={signWithGmail}>
                        <FcGoogle/>
                        <p>Login</p>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;