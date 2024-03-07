import Products from "./Products"
import {Link} from 'react-router-dom'
function HomePage() {
    return (
        <>
            <div>
                <img src="../../pink-panther-gif.gif" alt="" className="w-fit m-auto" />
                <div className="flex justify-center items-center mb-12">
                    <input type="text" className="shadow-md rounded-xl border border-grey px-5 py-[8px] w-[450px] mt-5" placeholder="Let us search something her funny 🐷" />
                    <button className="border border-pink-700 px-5 py-[8px] bg-pink-700 text-white mt-5 relative right-[40px] rounded-2xl shadow-md ">Search</button>
                    <button className="border border-pink-700 w-10 h-10 justify-center items-center bg-pink-700 text-white mt-5 rounded-full shadow-md "><Link to="/AddProduct">+</Link></button>
                </div>

                <div className=" mr-12 text-center">
                    <h1 className="text-7xl font-semibold text-center" >A DIVE INTO</h1>
                    <h1 className="text-7xl font-extrabold text-pink-700 mt-1.5">SILLIEST ONLINE PRODUCTS</h1>
                </div>

                <p className="bg-pink-200 border border-pink-700 rounded-2xl w-[70vw] px-7 text-center py-5 m-auto my-12 text-pink-700"> From inflatable unicorn horns for cats to self-stirring coffee mugs, we've curated a collection of the most delightfully nonsensical products the internet has to offer. Embrace the absurdity and dive into a world where the only rule is: the weirder, the better!</p>

                <div className="flex justify-center">
                    <img src="../../kid-img.jpg" alt="kid-img" className="h-[500px] w-[500px] rounded" />
                    <div className="font-bold text-6xl w-[30vw] text-right m-10">WE <span className="text-pink-700">LOVE </span > FUN AND <span className="text-pink-700"> FUN </span>LOVES US!
                        <br />
                    </div>
                </div>
            </div>
            <Products />
        </>
    )
}

export default HomePage
