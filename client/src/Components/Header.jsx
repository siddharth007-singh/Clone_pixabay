import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Log} from "../asset";
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithRedirect} from "firebase/auth";
import {firebaseAuth} from "../config/firebase.config";
import {createNewUser} from "../sanity";
import {SET_USER} from "../context/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {mainMenu} from "../utils/support";

const Header = () => {
    const [isHover, setIsHover] = useState(false);
    const[color, setColor] = useState(false);
    const user = useSelector((state)=>state.user);

    const dispatch = useDispatch();

    const provider = new GoogleAuthProvider();

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

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

    //Css part
    const HeaderStyle = {
        head:{
            position: "fixed",
            left:"20px",
            top:"10px",
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
        uplodeButtonStyle:{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            borderRadius: "9999px",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: isHover? "rgb(110 231 183)" : "rgb(167 243 208)",
            // backgroundColor: "#00ab6b",
            opacity: 1,
        },
        userMenu:{
            position: "absolute",
            right: "0px",
            top: "3rem",
            borderRadius: "0.375rem",
            // shadowColor:
            width: "16rem",
            opacity: 1,
            display: "flex",
            flexDirection:"column",
            alignItems:"flex-start",
            justifyContent:"center",
            gap: "0.75rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            backgroundColor: "rgb(25 27 38 )",
            color: "rgb(249 250 251)",
            fontWeight: 600
        },
        LogoutStyle:{

        }
    }

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
            <div className="flex items-center justify-center" style={{gap:"1rem"}}>
                {user?(
                    <>
                        <div style={HeaderStyle.beforeLogin} >
                            <img
                                src={user?.photoURL}
                                style={HeaderStyle.beforeLogin.Img}
                                alt=""
                                referrerPolicy="no-referrer"
                            />
                            <div style={HeaderStyle.userMenu}>
                                <h2>{user?.displayName}</h2>

                                {mainMenu && mainMenu.map(menu=>(
                                    <NavLink
                                        to={`/newPost/${menu?.slug}`} key={menu?.id} style={{color:"rgb(249 250 251)"}}>
                                        {menu?.name}
                                    </NavLink>
                                ))}
                                <div className="w-full h-[1px] bg-grey-700"></div>
                                <p className="text-xl text-grey-300" onClick={logOut}>Logout</p>
                            </div>
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

                {user && (
                    <NavLink
                        to={"/newPost/upload"}
                        style={HeaderStyle.uplodeButtonStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >Upload</NavLink>
                )}

            </div>
        </header>
    );
};



export default Header;