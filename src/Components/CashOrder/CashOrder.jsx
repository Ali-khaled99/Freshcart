import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import * as Yup from 'yup'


export default function CashOrder() {
    let {cartId} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    let nav = useNavigate()
    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: {
            "city": "",
            "phone": "",
            "details": ""
        },
        onSubmit,
        validationSchema: Yup.object({
            city: Yup.string().required("City is required"),
            phone: Yup.string().required("Phone is required"),
            details: Yup.string().required("Details is required")
        })
    })

    async function onSubmit() {
        setIsLoading(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/orders/" + cartId, { ShippingAddress: values },
            {
                headers: {
                    token: localStorage.getItem("token")
                },
                params: {
                    url: 'http://localhost:5173'
                }
            }
        ).then(({ data }) => {
            setIsLoading(false)
            location.href = data.session.url;
        }).catch((err) => {
            setIsLoading(false)
        }).finally(() => {
            toast.success("Your order was created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            nav('/')
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Your Shipping Address</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name='city' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your city" />
                        {touched.city && errors.city && <p className="text-red-500 text-sm ">{errors.city}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name='phone' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your phone" />
                        {touched.phone && errors.phone && <p className="text-red-500 text-sm ">{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-gray-700 font-semibold mb-2">Details</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name='details' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your details" />
                        {touched.details && errors.details && <p className="text-red-500 text-sm ">{errors.details}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:bg-gray-400 mb-4" disabled={isLoading}>Check out {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                </form>
            </div>
        </div>
    )
}
