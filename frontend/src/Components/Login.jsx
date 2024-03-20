import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import LogoutUtil from "../utilComponents/LogoutUtil"
import LoginUtil from "../utilComponents/LoginUtil"
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BounceLoader } from 'react-spinners'


function Login({ setlog, logged }) {
    const { register, handleSubmit, reset } = useForm()
    const [logging, setLogProcess] = useState(null)
    const navigate = useNavigate()

    const handleLogout = () => {
        confirmAlert({
            title: "Confirm Logout",
            message: "Are you sure you wish to logout?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "No",
                    onClick: () => {
                        console.log("Logout cancelled")
                    }
                }
            ]
        })
    }

    const authUser = async (data) => {
        setLogProcess(true)
        await LoginUtil(setlog, data)
        setLogProcess(false)
        navigate('/')
        
    };

    const logout = async () => {
        reset()
        await LogoutUtil(setlog)
    };

    const doSubmit = async (data) => {
        try {
            await handleSubmit(authUser)(data)
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {logging &&
                <div className="fixed inset-0 bg-white bg-opacity-[0.5] flex justify-center items-center">
                    <div>
                        <BounceLoader color='#ec1c74' size={150} />
                    </div>
                </div>
            }

            <form
                className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
                onSubmit={handleSubmit(doSubmit)}
            >
                <img src="../../join-us.gif" alt="" className="w-32 m-auto" />
                <h3 className="text-center text-2xl font-bold text-pink-700">Let Me In!</h3>
                <p className="text-center text-slate-500 font-semibold">Post, Sell and Earn! These are the three steps to money.</p>
                <div className="flex flex-col mt-5 justify-center items-center">
                    <input
                        type="email"
                        className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
                        placeholder="Enter Email"
                        {...register("mail", { required: "Please enter the mail", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                    />

                    <input
                        type="password"
                        className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
                        placeholder="Enter password"
                        {...register("pass", {
                            required: "Please enter the password",
                            minLength: {
                                value: 10,
                                message: "The password should be at least 10 characters long",
                            }
                        })}

                    />
                </div>
                {!logged && <div className="mt-[30px] mr-[52px] flex justify-end">
                    <button className="bg-slate-300 rounded px-3 py-1.5 text-slate-600 mr-3 ">I want to join!</button>
                    <button type="submit" className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600">
                        Log In
                    </button>
                </div>}
                {logged &&
                    <button
                        onClick={handleLogout}
                        className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600 ml-52 mt-3">
                        Log Out
                    </button>}
            </form>


        </>
    )
}

export default Login
