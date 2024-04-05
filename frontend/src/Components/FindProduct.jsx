import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners'
import getCookie from '../utilComponents/GetUserNameUtil';

function FindProduct() {
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(null)
    const [respData, setResponseData] = useState()
    const username = getCookie("user")
    
    const fetchData = () => {
        fetch(`http://localhost:8080/api/user-items/${name}/${username}`)
            .then(resp => resp.json())
            .then(result => {
                setLoading(false)
                setData(result)
            })
            .catch((err) => console.log(err));
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/delete-user-items/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                const responseData = await response.json();
                setResponseData(JSON.stringify(responseData, null, 2))
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <div className="flex justify-center flex-col items-center shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded">
                <img src="../../search-gif.gif" alt="" className=" m-auto w-32" />

                <h1 className='text-center text-2xl font-bold text-pink-700'>Find My Product!</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name' className='shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3' />
                <div className="mt-[30px] mr-[52px] flex justify-end">
                    <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600" onClick={() => {
                        setLoading(true)
                        setTimeout(() => {
                            fetchData()
                        }, 2000)
                    }}>Find Product</button>
                </div>
            </div>
            {loading && <div className='ml-[45vw] mt-[2vw]'><BounceLoader color='#ec1c74' size={150} /></div>}
            {data && data.prodSrc &&
                <div className='m-5 shadow-xl p-8 rounded-xl bg-white'>
                    <img src={data.prodSrc} alt={data.productName} className='w-64 h-56 object-contain' />
                    <div>
                        <h2 className='font-bold text-xl mt-5 w-64 text-left'>{data.productName}</h2>
                        <p className='text-slate-500 text-md'>{data.category}</p>
                    </div>
                    <button className="bg-red-600 mr-3 rounded px-3 py-1.5 text-white" onClick={() => deleteData(data._id)}>Delete</button>
                    <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600">
                        <Link to={`/UpdateProduct/${data.productName}`}>Update</Link>
                    </button>
                </div>
            }


            {respData && <div>{respData}</div>}
        </>
    );
}

export default FindProduct;
