import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [respText, setResp] = useState(null)
  const navigate = useNavigate()
  const onSubmit = (data) => {
    console.log(data)
    registerUser(data)
  }

  useEffect(() => {
    console.log(respText)
  }
    , [respText])

  const registerUser = async (data) => {
    try {
      const response = await fetch("https://onlinegoessilly-server.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname: data.fname, lname: data.lname, mail: data.mail, password: data.pass })

      })
      if (response.ok) {
        toast.success("Welcome to our community!")
        const responseText = await response.json()
        setResp(responseText)
        navigate('/')
      }
    }
    catch (err) {
      toast.error("Failed Somehow!")
      console.log(err)
    }
  }


  return (
    <>
      <form
        className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <img src="../../join-us.gif" alt="" className="w-32 m-auto" />
        <h3 className="text-center text-2xl font-bold text-pink-700">Join us Today</h3>
        <p className="text-center text-slate-500 font-semibold">Become a part of our weird community!</p>
        <div className="flex flex-col mt-5 justify-center items-center">
          <input
            type="text"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Your First Name"
            {...register("fname", {
              required: "Please enter the name",
              minLength: { value: 3, message: "Name should be of minimum 3 characters." },
              maxLength: { value: 30, message: "Name should be not more than 30 characters long" }
            })}
          />

          <input
            type="text"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Your Last Name"
            {...register("lname", {
              required: "Please enter the name",
              minLength: { value: 3, message: "Name should be of minimum 3 characters." },
              maxLength: { value: 30, message: "Name should be not more than 30 characters long" }
            })}
          />

          <input
            type="email"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Enter Email"
            {...register("mail", { required: "Please enter the mail", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
          />

          <input
            type="password"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Set up a password"
            {...register("pass", {
              required: "Please enter the password",
              minLength: {
                value: 10,
                message: "The password should be at least 10 characters long",
              }
            })}

          />
          <input
            type="password"
            className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3"
            placeholder="Confirm password"
            {...register("passre", {
              required: "Please re-enter the password",
              validate: (value) => value === watch("pass") || "Passwords do not match"

            })}
          />

          <div className="flex mt-3"><input type="checkbox" className="mr-3 cursor-pointer" />
            <label>I agree to the <span className="underline cursor-pointer text-pink-700">Terms and conditions</span></label></div>
        </div>
        <div className="mt-[30px] mr-[52px] flex justify-end">
          <button className="bg-slate-300 rounded px-3 py-1.5 text-slate-600 mr-3 "><Link to={"/Login"}>I already have an account</Link></button>
          <button type="submit" className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600">
            Create Account
          </button>
        </div>
      </form>

    </>
  )
}

export default SignUp
