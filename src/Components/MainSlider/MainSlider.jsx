import React from 'react'
import Slider from 'react-slick';
import mainSlider from '../../assets/slider-image-3.jpeg'
import slide1 from '../../assets/slider-image-1.jpeg'
import slide2 from '../../assets/slider-image-2.jpeg'
import slide3 from '../../assets/grocery-banner.png'
import slide4 from '../../assets/grocery-banner-2.jpeg'
import slide5 from '../../assets/slider-2.jpeg'

export default function MainSlider() {

   const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
      };
  return (
    <div className='flex'>
        <div className='w-3/4'>
        <Slider {...settings}>
        <img className='w-full h-[400px]' src={mainSlider} />
        <img className='w-full h-[400px]' src={slide3} />
        <img className='w-full h-[400px]' src={slide4} />
        <img className='w-full h-[400px]' src={slide5} />
        </Slider>
        </div>
        <div className='w-1/4 flex flex-col'>
        <img className='w-full h-[200px]' src={slide1}  />
        <img className='w-full h-[200px]' src={slide2}  />
        </div>
    </div>
  )
}
