import React, { useContext } from 'react'
import RatingStars from '../RatingStars/RatingStars'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { addProductToCart, addProductToWishList } from '../../cartService'

export default function Product({ product }) {

    let { userToken } = useContext(AuthContext)

    return (
        <div className="max-w-2xl mx-auto relative mt-6">
            <i onClick={() => addProductToWishList(product._id, userToken)} className="target: cursor-pointer fa-solid fa-heart fa-2x absolute top-0 end-0 m-3"></i>
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <Link to={"/productDetails/" + product._id}>
                    <img className="rounded-t-lg p-8" src={product.imageCover} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={"/productDetails/" + product._id}>
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
                    </Link>
                    <p className='line-clamp-2'>{product.description}</p>
                    <RatingStars rating={product.ratingsAverage} />
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                        <button onClick={() => addProductToCart(product._id, userToken)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                            to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
