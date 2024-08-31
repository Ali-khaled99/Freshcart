import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Brands() {
  const [isLoading, setIsLoading] = useState(true)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    getBrands()
  }, [])

  async function getBrands() {
    setIsLoading(true)
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands").finally(() => {
      setIsLoading(false)
    })
    setBrands(data.data);
  }
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <>
      <h1 className='text-center text-green-500 text-4xl font-semibold my-12'>All Brands</h1>
      <div className='grid grid-cols-4 gap-5' >
        {brands.map((brand, index) => {
          return <div className='hover:shadow-lg hover:transition-all hover:shadow-green-200' key={index}>
            <div className='border border-gray-300'>
              <div>
                <img className='w-full' src={brand.image} alt="" />
              </div>
              <div>
                <span className='block my-6 text-center text-gray-600 font-semibold'>{brand.name}</span>
              </div>
            </div>

          </div>
        })}

      </div>

    </>
  )
}
