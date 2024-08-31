import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';
export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()
  let { setUserToken } = useContext(AuthContext)

  let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues: {
      "email": "",
      "password": "",
    },
    onSubmit: login,
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Enter valid email"),
      password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be Minimum eight characters, at least one letter, one number and one special character"),
    })
  })

  async function login() {
    setIsLoading(true)
    setErrorMsg("")
    await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data }) => {
      setIsLoading(false)
      setUserToken(data.token)
      localStorage.setItem("token", data.token)
      if (location.pathname == "/login") {
        navigate("/")
      } else {
        navigate(location.pathname)
      }

    }).catch((err) => {
      setIsLoading(false)
      setErrorMsg(err.response.data.message)
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome To FreshCart</h2>
        <form onSubmit={handleSubmit} >
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 disabled:bg-gray-400 mb-4" disabled={isLoading}>Login {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
          {errorMsg && <p className='text-center text-red-500'>{errorMsg}</p>}
        </form>
        <p className="text-center text-gray-600 mt-4">Don't have an account? <Link to={'/register'} className="text-blue-500 font-semibold">Sign Up</Link></p>
        <p className="text-center  mt-4"><Link to={'/forgotPassword'} className="text-gray-600 font-semibold hover:text-blue-600">Forgot Your Password ?</Link></p>
      </div>
    </div>
  )
}
