import { Link } from "react-router-dom"
function NavBar() {
    return (
        <>
            <div className="flex justify-between shadow-md px-10 py-3 items-center ">
                <ul className="flex center items-center">
                    <li className="m-3 font-semibold cursor-pointer linkHover"><Link to={"/AddProduct"}>HOME</Link></li>
                    <li className="m-3 font-semibold cursor-pointer linkHover">STORE</li>
                    <li className="m-3 font-semibold cursor-pointer linkHover">ABOUT</li>
                </ul>
                <ul className="flex center items-center">
                    <li className="m-3 font-semibold cursor-pointer">LOGIN</li>

                    <li className="m-3 font-semibold bg-pink-700 text-white px-3 py-1.5 rounded cursor-pointer">
                        <Link to={"/SignUp"}>SignUp</Link>

                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavBar
