import React,{useEffect,useReducer,useRef} from 'react'
import ProductCardModel from './ProductCardModel';



function ProductCard2({category_trend,category_trend2,category_trend4}) {
    const DiscountPrice = (price)=>{
        const discout = (price * 0.8).toFixed(2).split('.')
        return discout
    }
    
   
    
    return <div className='flex my-4 gap-3 sm:grid px-1  sm:px-3 md:px-20 lg:px-0 sm:grid-cols-2 lg:grid-cols-4 overflow-scroll 
    sm:overflow-hidden '>
  <ProductCardModel title={"More items to consider"} category_trend={category_trend} DiscountPrice={DiscountPrice}/>
  <ProductCardModel title={"Related to items you've viewed"} category_trend={category_trend2} DiscountPrice={DiscountPrice}/>
  <ProductCardModel title={"Additional items to explore"} category_trend={category_trend4 } DiscountPrice={DiscountPrice}/>
  <div className='bg-white p-2'>
    <h1 className='text-[19px] mb-2 truncate font-semibold'>Top Sellers in Baby Products for you</h1>
  <div className='grid grid-cols-2 gap-x-6'>
    <img  src="https://m.media-amazon.com/images/I/81Quaej+AmL._AC_SY170_.jpg" alt="" />
    <img  src="https://m.media-amazon.com/images/I/91BdX7N8y+L._AC_SY170_.jpg" alt="" />
    <img  src="https://m.media-amazon.com/images/I/81A40fe4mtL._AC_SY170_.jpg" alt="" />
    <img  src="https://m.media-amazon.com/images/I/71wW3feC4lL._AC_SY170_.jpg" alt="" />
  </div> 
  </div>


  

    
    
  </div>;
}

export default ProductCard2;
