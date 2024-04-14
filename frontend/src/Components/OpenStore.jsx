import { useState, useEffect, CSSProperties } from 'react'
import { BounceLoader } from 'react-spinners'

const OpenStore = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("all")
    const [filteredData, setFilterData] = useState([])
    const fetchData = () => {
        fetch("https://onlinegoessilly-server.onrender.com/api/user-item/")
            .then(resp => resp.json())
            .then(result => {
                setLoading(false)
                setData(result)
                setFilterData(result)
            })
            .catch((err) => console.log(err))
    }

    const fetchUsers = () => {
        fetch("https://onlinegoessilly-server.onrender.com/api/users")
            .then(resp => resp.json())
            .then(result => {
                setUsers(result)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (filter === 'All') {
            setFilterData(data);
        } else {
            let data2 = data.filter(element => {
                return element.userName === filter;
            });
            setFilterData(data2);
        }
    }, [filter]);


    useEffect(() => {
        fetchData()
        fetchUsers()
    }, [])

    return (
        <>
            < div className="py-24">
                <h1 className='uppercase font-extrabold text-8xl text-center'>OUR OPEN STORE</h1>
                <p className='text-center font-md m-5 mb-10 font-semibold'>Contribute Some Silly Products here!</p>
                {loading && <div className='ml-[45vw] mt-[10vw]'>  <BounceLoader color='#ec1c74' size={150} /></div>}

                <select className="ml-10 bg-pink-700 py-1.5 px-3 rounded text-white" onChange={(e) => setFilter(e.target.value)}>
                    <option>All</option>
                    {users.map(user => (
                        <option>{user}</option>
                    ))}
                </select>

                <div className='p-10 flex flex-wrap m-auto w-[90vw] rounded-2xl justify-center'>
                    {data && filteredData.map(ele => (
                        <div className='m-5 shadow-xl p-8 rounded-xl bg-white'>
                            <img src={ele.prodSrc} alt={ele.productName} className='w-64 h-56 object-contain' />
                            <div>
                                <h2 className='font-bold text-xl mt-5 w-64 text-left'>{ele.productName}</h2>
                                <p className='text-slate-500 text-md'>{ele.category}</p>
                                <p className='text-slate-500 text-md'>Contributed By : {ele.userName}</p>
                            </div>
                            <button className='py-1.5 px-3 bg-black rounded mt-3 text-white'>Buy Here</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default OpenStore