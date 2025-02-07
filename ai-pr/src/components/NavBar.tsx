import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/chat"}>Chat</NavLink>
        <NavLink to={"/generate"}>Generate</NavLink>
    </div>
}