import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/chat"}>Places</NavLink>
        <NavLink to={"/generate"}>Create</NavLink>
    </div>
}