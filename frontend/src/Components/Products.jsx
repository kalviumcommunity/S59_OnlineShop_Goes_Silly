import { useState, useEffect } from 'react'

const Products = () => {
    const [data, setData] = useState([])

    const fetchData = () => {
        fetch("https://onlineshopgoessilly-server.onrender.com/api")
            .then(resp => resp.json())
            .then(result => setData(result))
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        < div className="py-24">
            <h1 className='uppercase font-extrabold text-8xl text-center'>OUR STORE</h1>
            <p className='text-center font-md m-5 mb-10 font-semibold'>Buy the glorius Products of our store down below:</p>
            <div className='p-10 flex flex-wrap m-auto w-[90vw] bg-pink-700 rounded-2xl justify-center'>
                {data.map(ele => (
                    <div className='m-5 shadow-xl p-8 rounded-xl bg-white'>
                        <img src={ele.prodSrc} alt={ele.productName} className='w-64 h-56 object-contain' />
                        <div>
                            <h2 className='font-bold text-xl mt-5 w-64 text-left'>{ele.productName}</h2>
                            <p className='text-slate-500 text-md'>{ele.category}</p>
                        </div>
                        <button className='py-1.5 px-3 bg-black rounded mt-3 text-white'>Buy Here</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Products