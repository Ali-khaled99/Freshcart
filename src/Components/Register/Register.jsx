import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {

    const [isLoading , setIsLoading] = useState(false)
    const [errorMsg , setErrorMsg] = useState("")
    const [successMsg , setSuccessMsg] = useState("")
    const navigate = useNavigate()
    

    let {handleSubmit , values , handleChange, errors , touched, handleBlur} = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        onSubmit: register,
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required").min(3, "name must be more than 2 characters").max(20, "name must be less than 20 characters"),
            email: Yup.string().required("Email is required").email("Enter valid email"),
            password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"password must be Minimum eight characters, at least one letter, one number and one special character"),
            rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref("password")], "passwords does not match"),
            phone: Yup.string().required("Phone is required")
        })
    })


    async function register() {
        setIsLoading(true)
        setErrorMsg("")
        setSuccessMsg("")
        
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) => {
            setIsLoading(false)
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 500);
        }).catch((err) => {
            setIsLoading(false)
            setErrorMsg(err.response.data.message);
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name='name' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
                        {touched.name && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name='email' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
                        {touched.email && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name='password' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
                        {touched.password && errors.password && <p className="text-red-500 text-sm ">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="repassword" name='rePassword' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Confirm your password" />
                        {touched.rePassword && errors.rePassword && <p className="text-red-500 text-sm ">{errors.rePassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
                        <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name='phone' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your phone" />
                        {touched.phone && errors.phone && <p className="text-red-500 text-sm ">{errors.phone}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-3 disabled:bg-gray-400" disabled={isLoading}>Register {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                    {errorMsg && <p className='text-center text-red-500'>{errorMsg}</p>}
                    {successMsg && <p className='text-center text-green-500'>{successMsg}</p>}
                </form>
                <p className="text-center text-gray-600 mt-4">Already have an account? <Link to={'/login'} className="text-blue-500 font-semibold">Sign In</Link></p>
            </div>
        </div>
    )
}
