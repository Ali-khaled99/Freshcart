import { Helmet } from 'react-helmet'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

export default function Products() {

  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    setIsLoading(true)
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products").finally(() => {
      setIsLoading(false)
    })
    setProducts(data.data);
  }
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <div className='grid lg:grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-2'>

      {products.map((product, index) => {
        return <Product product={product} key={index} />
      })}

    </div>
  )
}
