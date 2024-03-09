import { useState, useEffect } from 'react';

function UpdateProduct() {
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [respData, setResponseData] = useState()
    const fetchData = () => {
        fetch(`http://localhost:8080/api/user-items/${name}`)
            .then(resp => resp.json())
            .then(result => setData(result))
            .catch((err) => console.log(err));
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/delete-user-items/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if(response.ok){
                const responseData = await response.json();
                setResponseData(JSON.stringify(responseData, null, 2))
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <div className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded">
                <input onChange={(e) => setName(e.target.value)} />
                <div className="mt-[30px] mr-[52px] flex justify-end">
                    <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600" onClick={() => fetchData()}>Find Product</button>
                </div>
            </div>
            {data &&
                <div className='m-5 shadow-xl p-8 rounded-xl bg-white'>
                    <img src={data.prodSrc} alt={data.productName} className='w-64 h-56 object-contain' />
                    <div>
                        <h2 className='font-bold text-xl mt-5 w-64 text-left'>{data.productName}</h2>
                        <p className='text-slate-500 text-md'>{data.category}</p>
                    </div>
                    <button className="bg-red-600 mr-3 rounded px-3 py-1.5 text-white" onClick={()=> deleteData(data._id)}>Delete</button>

                    <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600">Update</button>
                </div>
            }
            {respData && <div>{respData}</div>}
        </>
    );
}

export default UpdateProduct;
