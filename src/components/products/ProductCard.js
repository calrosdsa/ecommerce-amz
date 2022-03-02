import React from 'react';
import { Link } from 'react-router-dom';


function ProductCard({category_trend3}) {
  return (
   <div className="flex relative overflow-scroll sm:overflow-hidden  space-x-1 sm:space-x-0 lg:gap-x-5  gap-3 xl:gap-3 
    sm:grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 ">
  <div className=" px-2 py-1  min-w-[200px]  sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] 
  justify-center mx-1 sm:h-full  bg-white">

      <h1 className=' font-semibold sm:text-xl'>Keep shopping for</h1>
      <div className=' bg-white grid grid-cols-2 py-1 sm:py-3 gap-1  sm:gap-4 mb-1  '>
    {category_trend3.slice(0,4).map((item,i)=>(
      <Link key={i} className=' place-self-center ' to={`/product/${item.slug}`}>
      <img className=" w-14 h-14 sm:h-24 sm:w-24 object-contain  " 
       src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
       <h1 className='  line-clamp-1 text-xs'>{item.title}</h1>
       </Link>
      ))}
      </div>
  </div>
  <div className=" px-2 py-1   min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Shop by Category</h1>
    <div className='grid grid-cols-2 gap-1 sm:mt-4 sm:gap-4 mt-2 xl:mt-10 xl:gap-6'>
     <div className=''>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_4kh771LUogBo26WNgMwRAESGCpu7zTrFQ&usqp=CAU" alt="" />
         <h1 className='text-[11px]'>Computer & Accesories</h1>
     </div>
     <div className=''>
         <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/10/ps5-2093269.jpg?itok=d85EFl9N" alt="" />
         <h1 className='text-[11px]'>Video Games</h1>
     </div>
     <div className=''>
         <img src="https://i0.wp.com/folou.co/wp-content/uploads/2021/02/Xiaomi-Mi-11.jpg?fit=1200%2C675&ssl=1" alt="" />
         <h1 className='text-[11px]'>SmartPhones</h1>
     </div>
     <div className=''>
         <img src="https://m.media-amazon.com/images/I/815L+mcHgfL._AC_AA180_.jpg" className='h-16 w-20 sm:w-24 sm:h-20 lg:w-28 lg:h-24 xl:h-20' alt="" />
         <h1 className='text-[11px]'>Luggage</h1>
     </div>
    </div>
    <h1 className='text-cyan-600 text-sm absolute bottom-1'>Shop now</h1>
  </div>
  <div className=" px-2 py-1   min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>AmazonBasics</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  "
     src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2019/July/amazonbasics_520x520._SY304_CB442725065_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>See more</h1>
  </div>
  <div className=" px-2 py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Electronics</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  " src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Electronics_1x._SY304_CB432774322_.jpg" alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>See more</h1>
  </div>
  <div className=" px-2 py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Beuty picks</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  "
     src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>Shop now</h1>
  </div>
  <div className=" px-2 py-1   min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Computer & Accessories</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  " 
    src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>Shop now</h1>
  </div>
  <div className=" px-2 py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Easy returns</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  " 
    src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Returns_1x._SY304_CB432774714_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>Learn more</h1>
  </div>
  <div className=" px-2 py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Find your ideal TV</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-72  xl:w-72 -mt-3 h-44 w-44  " 
    src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_TV_2X._SY304_CB432517900_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3'>See more</h1>
  </div>
 
  </div>

  )
}

export default ProductCard;
