function SignUp() {
  return (
    <>
      <div className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded">
        <img src="../../join-us.gif" alt="" className="w-32 m-auto"/>
        <h3 className="text-center text-2xl font-bold text-pink-700">Join us Today</h3>
        <p className="text-center text-slate-500 font-semibold">Become a part of our weird community!</p>
        <div className="flex flex-col mt-5 justify-center items-center">
          <input type="text" className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Enter Name" />
          <input type="email" className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Enter Email" />
          <input type="password" className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Set up a password" />
          <input type="password" className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Confirm our password" />
        </div>
        <div className="mt-[30px] mr-[52px] flex justify-end">
        <button className="bg-slate-300 rounded px-3 py-1.5 text-slate-600 mr-3 ">I already have an account</button>
        <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600">Create Account</button>
        </div>
      </div>

    </>
  )
}

export default SignUp
