import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const { name } = useParams()
    const [data, setData] = useState({})

    const [prodName, changeName] = useState("")
    const [catName, changecategory] = useState("")
    const [prodsource, changeProdSrc] = useState("")

    const [responseText, setRes] = useState("")

    const fetchData = (name) => {
        fetch(`http://localhost:8080/api/user-items/${name}`)
            .then(resp => resp.json())
            .then(result => setData(result))
            .catch((err) => console.log(err));
    };

    const updateData = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:8080/api/user-items-update/${name}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: prodName || data.productName,
                    category: catName || data.category,
                    prodSrc: prodsource || data.prodSrc
                })
            })
            if (response.ok) {
                const responseData = await response.json();
                setRes(JSON.stringify(responseData, null, 2))
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData(name)
    }, [])

    return (
        <div>
            {data && <form 
            onSubmit={updateData}
            className="flex justify-center flex-col items-center shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded">
                <img src={data.prodSrc} alt={data.productName} className=" m-auto w-64 mb-10 shadow-lg rounded" />
                <input
                    type="text"
                    placeholder={data.productName}
                    className='shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3'
                    onChange={(e) => {
                        changeName(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder={data.category}
                    className='shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3'
                    onChange={(e) => {
                        changecategory(e.target.value)
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter new URL"
                    className='shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3'
                    onChange={(e) => {
                        changeProdSrc(e.target.value)
                    }}
                />
                <button
                    type="submit"
                    className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600"
                >Commit Changes</button>
            </form>
            }
            {responseText && <div>{responseText}</div>}
        </div>
    )
}

export default UpdateProduct
