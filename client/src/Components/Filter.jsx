import React from 'react';
import {filterMenu} from "../utils/support";
import {NavLink} from "react-router-dom";

const Filter = ()=>{

    return(
        <div className="flex items-start justify-start xl:items-center xl:justify-center overflow-x-scroll gap-12 pt-6 scrollbar-none">
            {filterMenu && filterMenu.map((menu)=>(
                <FilterButtons key={menu.id} label={menu.label} icon={menu.icon} to={menu.to}/>
            ))}
        </div>
    )
};

export const FilterButtons = ({label, icon, to})=>{
    const Icon = icon;
    return(
        <NavLink>
            <div className={`flex items-center justify-center gap-2 px-4 py-2  rounded-full ${active && "bg-zinc-100"} cursor-pointer`}>
                <Icon className={}/>
            </div>
        </NavLink>
    )
}

export default Filter;