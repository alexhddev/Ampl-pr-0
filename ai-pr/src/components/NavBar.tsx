import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/chatReact"}>ChatReact</NavLink>
        <NavLink to={"/chatSimple"}>ChatSimple</NavLink>
        <NavLink to={"/generateReact"}>Generate React</NavLink>
        <NavLink to={"/generateSimple"}>Generate Simple</NavLink>
    </div>
}