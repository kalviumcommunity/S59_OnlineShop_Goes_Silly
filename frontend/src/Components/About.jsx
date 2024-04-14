function About() {
    return (
        <>
            <h1 className='uppercase font-extrabold text-8xl text-center mt-5'>ABOUT US</h1>
            <p className="bg-pink-200 border border-pink-700 rounded-2xl w-[70vw] px-7 text-center py-5 m-auto my-12 text-pink-700"> From inflatable unicorn horns for cats to self-stirring coffee mugs, we've curated a collection of the most delightfully nonsensical products the internet has to offer. Embrace the absurdity and dive into a world where the only rule is: the weirder, the better!</p>
            <p className="w-[70vw] m-auto my-10 bg-pink-200 border border-pink-700 rounded-2xl w-[70vw] px-7 py-5 text-pink-700">
                This an ASAP Project built as a part of the Full Stack web development course under Kalvium. The technology used to build the Project includes the following list: <br />
                <ol className="mt-5">
                    <li>React.js Library for client side</li>
                    <li>Node.js for server side runtime</li>
                    <li>Express for backend side</li>
                    <li>MongoDB as the database</li>
                    <li>Render to host the server</li>
                    <li>Cloudflare to host the frontend</li>
                </ol>
                <p className="mt-5">
                    We own none of the assets used here. They belong to their respective owners. This is just a project for educational purposes.
                </p>
            </p>


        </>
    )
}

export default About
