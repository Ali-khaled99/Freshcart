import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'


export default function ForgotPassword() {

    const [errorMsg, setErrorMsg] = useState("")
    let [formStatus, setFormStatus] = useState(true)
    let navigate = useNavigate()

    
    let validationSchema = Yup.string().required("email required").email("enter valid email")

    let validationSchema2 = Yup.string().required("resetCode required").matches(/^[0-9]{5,6}$/, "enter valid code")

    let Formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: forgotPassword,
        validationSchema
    })
    let Formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: verifyResetCode,
        validationSchema2
    })

    async function forgotPassword(value) {
        setErrorMsg("")
        console.log(value);
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            value).catch((err) => {
                setErrorMsg(err.response.data.message)
            })
        if (req.data.statusMsg == 'success') {
            setFormStatus(false)
        }
    }

    async function verifyResetCode(value){
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",value).catch((err) => {
            setErrorMsg(err.response.data.message)
        })
        if(req.data.status == "Success"){
            navigate('/resetPassword')
        }
    }

    return (<>
        {errorMsg ? <div className='p-4 my-3 rounded-lg bg-red-500'><p className='text-lg text-white py-6'>{errorMsg}</p></div> : ""}
        {formStatus ?
            <form onSubmit={Formik.handleSubmit}>
                <div className="my-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Please enter your email</label>
                    <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} type="email" id="email" name='email' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Email" />
                </div>
                <button type='submit' className='px-4 py-2 transition-all border border-green-500 rounded-lg text-green-600 hover:bg-green-800 hover:text-white'>Send</button>
            </form>
            :
            <form onSubmit={Formik2.handleSubmit}>
                <div className="my-4">
                    <label htmlFor="resetCode" className="block text-gray-700 font-semibold mb-2">Please enter reset code</label>
                    <input value={Formik2.values.resetCode} onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} type="resetCode" id="resetCode" name='resetCode' className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Verification Code" />
                </div>

                {Formik2.errors.resetCode && Formik2.touched.resetCode ? <div className='p-4 my-3 rounded-lg bg-red-500'><p className='text-lg text-white py-6'>{Formik2.errors.resetCode}</p></div> : ""}
                <button type='submit' className='px-4 py-2 transition-all border border-green-500 rounded-lg text-green-600 hover:bg-green-800 hover:text-white'>verify Code</button>
            </form>}


    </>

    )
}
