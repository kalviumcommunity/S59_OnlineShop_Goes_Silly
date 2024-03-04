function Footer() {
    return (
        <>
            <div className="bg-pink-200 py-10 px-20 flex justify-between">
                <div>
                    <h2 className="text-pink-700 text-2xl font-bold">Important Links</h2>
                    <div className="flex">
                        <ul className="text-pink-700 p-3 ">
                            <li className="mt-1.5">Home</li>
                            <li className="mt-1.5">About</li>
                            <li className="mt-1.5">Contacts</li>
                        </ul>
                        <ul className="text-pink-700 p-3 ">
                            <li className="mt-1.5">Home</li>
                            <li className="mt-1.5">About</li>
                            <li className="mt-1.5">Contacts</li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    <h2 className="text-pink-700 text-2xl font-bold">Contact Info:</h2>
                    <p className="pt-3"><b>Developed and Designed by:</b><br />Shubham Thakur</p>
                    <p>Squad 59, Kalvium</p>
                    <p>Chitkara University - Himachal Pradesh</p>
                </div>
            </div>
            <div className="bg-pink-700 text-slate-200 p-3 text-center">
                We own none of the assets used here. They belong to their respective owners.
            </div>
        </>
    )
}

export default Footer
