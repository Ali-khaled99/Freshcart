import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingScreen from '../LoadingScreen/LoadingScreen'



export default function Categories() {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [subCategory, SetSubCategory] = useState([])
  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    setIsLoading(true)
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories").finally(() => {
      setIsLoading(false)
    })
    setCategories(data.data);
  }

  async function getSubCategories(categoryId) {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories/" + categoryId + "/subcategories")
    SetSubCategory(data.data)
    console.log(data.data);
  }
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <>
      <div  className='grid grid-cols-3 gap-5 my-8' >
        {categories.map((category, index) => {
          return <div onClick={() => getSubCategories(category._id)} className='hover:shadow-lg hover:transition-all hover:shadow-green-200' key={index}>
            <div className='border border-gray-300'>
              <div>
                <img className='object-cover w-full' style={{ "height": "300px" }} src={category.image} alt="" />
              </div>
              <div>
                <span className='block my-6 text-center text-green-600 font-semibold text-2xl'>{category.name}</span>
              </div>
            </div>

          </div>
        })}

      </div>
        <div className='w-11/12 mx-auto'>
        <h2 className='text-green-500 text-3xl text-center font-semibold'>subCategories</h2>
        <div className='grid grid-cols-3 gap-5 my-8'>
          {subCategory.map((subCategory,index) => {
            return <>
            <div key={index} onClick={() => getSubCategories(category._id)} className='hover:shadow-lg hover:transition-all hover:shadow-green-200' >
            <div className='border border-gray-300'>
              <div>
                <h3 className='text-nowrap w-full block my-6 text-center font-semibold text-2xl'>{subCategory.name}</h3>
              </div>
            </div>

          </div>
            </>
            
          })}
        </div>
        </div>

    </>
  )

}
