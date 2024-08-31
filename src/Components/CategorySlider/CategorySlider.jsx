import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true
    };

    const [categories, setCategories] = useState([])
    async function getCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategories(data.data);
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className='my-4 py-4 '>
            <h2 className='text-2xl font-semibold mb-2'>Shop popular Categories</h2>
            <Slider {...settings}>
                {categories.map((category) => {
                    return <div className='h-[250px]' key={category._id}>
                        <img src={category.image} className='h-full w-full' alt="" />
                        <h2>{category.name}</h2>
                    </div>
                })}
            </Slider>
        </div>
    )
}
