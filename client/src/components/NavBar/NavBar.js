import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './logoHenry.png'

import s from './NavBar.module.css';

export default function NavBar() {
    return (
        <header className={s.navbar}>
            <div>
                <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </div>
            <nav>
                <ul className={s.list}>
                    <li className={s.listitem}>
                        <NavLink className={s.navlink} exact to="/home" >Home</NavLink>
                        <NavLink className={s.navlink} to="/form" >Create Recipe</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}