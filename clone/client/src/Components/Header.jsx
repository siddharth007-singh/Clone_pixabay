import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Logo} from "../asset";
import {FcGoogle} from "react-icons/fc";

const Header = () => {
    const [user, setUser] = useState(null);
    return(
        <header className={`fixed inset-x-0 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between z-50 transition-all 
        duration-300`}
        >
            {/*Logo Section*/}
            <NavLink to={"/"}>
                <img
                    src={Logo}
                    alt="Main Logo "
                    className="w-24 h-auto object-contain p-2"
                />
            </NavLink>
            {/*UserProfile Section */}
            {user?(
                <>
                    <div className="relative cursor-pointer">
                        <img
                            src=""
                            className="rounded-full w-10 h-10 object-cover"
                            alt=""
                        />
                    </div>
                </>
            ):(
                <>
                    <div className={`flex items-center justify-center gap-2 border
                     border-e-gray-300 px-2 py-1 rounded-md backdrop-blur-md cursor-pointer hover:shadow-md active:scale-95 transition-all
                     ease-in-out duration-150`}>
                        <FcGoogle/>
                        <p>Login</p>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;