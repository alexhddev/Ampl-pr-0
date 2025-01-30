import { NavLink } from 'react-router'

export default function NavBar() {

    return <div className="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/places"}>Places</NavLink>
        <NavLink to={"/places/create"}>Create</NavLink>
        <NavLink to={"/auth"} style={{ float: "right" }}>Login</NavLink>
    </div>
}