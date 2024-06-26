import { useState, useEffect } from 'react'
import getCookie from '../utilComponents/GetUserNameUtil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddProduct({logged}) {
  const [productName, setproductName] = useState("");
  const [prodSrc, setprodSrc] = useState("");
  const [category, setcategory] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const username = getCookie("user")
  }, [])

  useEffect(() => {
    if (!logged) {
      console.log(logged)
      navigate('/')
    }
  }, [logged])

  const handleProduct = (event) => {
    setproductName(event.target.value);
  };

  const handleProdSrc = (event) => {
    setprodSrc(event.target.value);
  };

  const handleCategory = (event) => {
    setcategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://onlinegoessilly-server.onrender.com/api/new-item", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: productName, prodSrc: prodSrc, category: category, userName: getCookie("user") })
      });

      if (response.ok) {
        toast.success("Product Added Successfully!")
      }
    } catch (err) {
      toast.error("Failed to Add. Try Again Later")
      console.log(err);
    }
  };
  return (
    <>
      <div className="shadow-xl w-[40vw] m-auto px-5 my-12 py-10 pb-15 rounded">
        <img src="../../add-items.gif" alt="" className=" m-auto w-32" />
        <h3 className="text-center text-2xl font-bold text-pink-700">Add your own item!</h3>
        <div className="flex flex-col mt-5 justify-center items-center">
          <input value={productName} onChange={handleProduct} type="text" className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Enter Product Name" />
          <select className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3 text-slate-400" onChange={handleCategory}>
            <option disabled selected className="text-slate-400">Enter Category</option>
            <option>Gifts</option>
            <option>Beauty and Makeup</option>
            <option>Home Accessories</option>
            <option>Clothes</option>
          </select>
          <input type="text" value={prodSrc} onChange={handleProdSrc} className="shadow-md rounded border border-grey px-1.5 py-[5px] w-[400px] m-3" placeholder="Add  Image URL" />
        </div>
        <div className="mt-[30px] mr-[52px] flex justify-end">
          <button className="bg-pink-700 rounded px-3 py-1.5 text-white hover:bg-pink-600" onClick={handleSubmit}>Add Product</button>
        </div>
      </div>
    </>
  )
}

export default AddProduct
