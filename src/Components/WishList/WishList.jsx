import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { AuthContext } from '../../Contexts/AuthContext'
import { addProductToCart, addProductToWishList } from '../../cartService'
import { data } from 'autoprefixer'


export default function WishList({ product }) {
    let { userToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState()
    const [wishList, setWishList] = useState()

    useEffect(() => {
        getUserWishList()
    }, [])

    async function getUserWishList() {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
        ).finally(() => {
            setIsLoading(false)
        })
        setWishList(data.data)
        // console.log(x);
    }

    async function removeProductFromWishList(productId) {

        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
        setWishList(data.data)
        toast.success("product has been removed successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        getUserWishList()
    }

    if (isLoading) {
        return <LoadingScreen />
    }
    return (<>
        <h2 className='text-3xl text-green-500 font-semibold text-center my-8'>My WishList</h2>
        {wishList?.map((wishItem, index) => {
            return <div key={index} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <img src={wishItem.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 flex flex-col justify-center items-center text-left">
                        <h2 className="text-lg font-bold text-gray-900">{wishItem.title}</h2>
                        <span className="mt-2 text-green-700 w-full text-md">${wishItem.price}</span>
                        <span className='w-full mt-2 mx-0 text-red-700 cursor-pointer' onClick={() => removeProductFromWishList(wishItem._id)} ><i className="fa-solid fa-trash me-2"></i>Remove</span>
                    </div>
                    <div className="mt-4 flex justify-center items sm:space-y-6 sm:mt-0 sm:block md:flex sm:space-x-6">
                        <div className="flex items-center justify-center">
                            <button onClick={() => addProductToCart(wishItem._id, userToken)} className='px-2 py-3 border border-green-500 mx-4 rounded-lg'>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        })}

    </>

    )
}

