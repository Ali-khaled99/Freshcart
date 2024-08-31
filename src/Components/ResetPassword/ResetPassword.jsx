import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    let navigate = useNavigate()
    let validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Enter valid email"),
        newPassword: Yup.string().required("newPassword is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be Minimum eight characters, at least one letter, one number and one special character"),
    })
    let form = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        onSubmit: ResetPassword,
        validationSchema
    })

    async function ResetPassword(val) {
        setErrorMsg("")
        let req = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", val).catch((err) => {
            setErrorMsg(err.response.data.message)
          })
        console.log(req);
        if(req.data.token){
            navigate('/login')
        }
    }
    return (<>
        <div>
            <h2 className='text-3xl text-green-500 text-center my-6 font-semibold'>Reset Password</h2>
            <form onSubmit={form.handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onBlur={form.handleBlur} onChange={form.handleChange} type="email" name='email' id='email' />
                    {(form.errors.email && form.touched.email) ? <div className='p-4 my-3 rounded-lg bg-red-500'><p className='text-lg text-white py-6'>{form.errors.email}</p></div> : ""}
                </div>

                <div className='mb-3'>
                    <label htmlFor="newPassword">newPassword</label>
                    <input className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' onBlur={form.handleBlur} onChange={form.handleChange} type="password" name="newPassword" id="newPassword" />
                    {(form.errors.newPassword && form.touched.newPassword) ? <div className='p-4 my-3 rounded-lg bg-red-500'><p className='text-lg text-white py-6'>{form.errors.newPassword}</p></div> : ""}
                </div>

                <button disabled={!(form.isValid && form.dirty)} type="submit" className=" p-4 mx-auto block bg-green-500 text-white py-2 rounded-lg font-semibold mt-4 mb-4" >Update Password </button>

            </form>
        </div>
    </>
    )
}
