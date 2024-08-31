import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
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
    return (<>
    <div className='pt-20 w-11/12 mx-auto'>
        <MainSlider />
        </div>
    <div className='pt-20 pb-10 w-11/12 mx-auto'>
        <CategorySlider />
        </div>
        <div className='grid grid-cols-4 gap-3'>

            {products.map((product, index) => {
                return <Product product={product} key={index} />
            })}

        </div>
    </>
        
    )
}
