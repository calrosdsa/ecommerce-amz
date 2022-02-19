import React from 'react';


function ProductCard3() {
  return (
   <div className="flex  overflow-scroll sm:overflow-hidden mt-4  space-x-1 sm:space-x-0 lg:gap-x-5  gap-3 xl:gap-3 pb-2 
    sm:grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 ">
  <div className="relative px-2 py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px]  justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>For your Fitness Needs</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-80  xl:w-72 -mt-3 h-44 w-44  " 
    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_Fitness_1X._SY304_CB639748186_.jpg" alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3 absolute bottom-1 left-2'>Shop Now</h1>

  </div>

  
  <div className=" px-2 py-1 relative  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Confi Style for her</h1>
    <div className='grid  place-items-center grid-cols-2 gap-1 sm:gap-2 mt-4 xl:mt-4 xl:gap-6'>
     <div className=''>
         <img className='h-14 w-14 sm:w-24 sm:h-24 xl:w-28 xl:h-28' src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_WomenFashion_Sweatshirt_Quad_Cat_1x._SY116_CB418609101_.jpg" alt="" />
         <h1 className='text-[11px]'>Sweatshirts</h1>
     </div>
     <div className=''>
         <img className='h-14 w-14 sm:w-24 sm:h-24 xl:w-28 xl:h-28' src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_WomenFashion_Joggers_Quad_Cat_1x._SY116_CB418608748_.jpg" alt="" />
         <h1 className='text-[11px]'>Joggers</h1>
     </div>
     <div className=''>
         <img className='h-14 w-14 sm:w-24 sm:h-24 xl:w-28 xl:h-28' src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_WomenFashion_Cardigans_Quad_Cat_1x._SY116_CB418608722_.jpg" alt="" />
         <h1 className='text-[11px]'>Cardigans</h1>
     </div>
     <div className=''>
         <img className='h-14 w-14 sm:w-24 sm:h-24 xl:w-28 xl:h-28' src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_WomenFashion_Tees_Quad_Cat_1x._SY116_CB418608878_.jpg' className='h-16 w-20 sm:w-24 sm:h-20 lg:w-28 lg:h-24 xl:h-20' alt="" />
         <h1 className='text-[11px]'>Easy tees</h1>
     </div>
    </div>
    <h1 className='text-cyan-600 text-sm -mt-3 absolute bottom-1 left-2'>Shop Now</h1>

  </div>


  <div className=" px-2 py-1 relative min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl'>Create with strip lights</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-80  xl:w-72 -mt-3 h-44 w-44  "
     src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_StripLighting_379x304_1X_en_US._SY304_CB418597476_.jpg' alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3 absolute bottom-1 left-2'>Shop Now</h1>

  </div>
  <div className=" px-2 relative py-1  min-w-[200px] sm:min-w-[210px] md:min-w-[100px] lg:min-w-[230px] xl:  h-[210px] justify-center mx-1 sm:h-full  bg-white">
    <h1 className=' font-semibold sm:text-xl line-clamp-1'>Shop activity trackers and smartwatches</h1>
    <img className=" py-4 2xl:px-4 2xl:py-7 sm:w-[246px] sm:h-64 xl:h-80  xl:w-72 -mt-3 h-44 w-44  " 
    src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Dash_SmartWatch_1X._SY304_CB639922137_.jpg" alt="" />
    <h1 className='text-cyan-600 text-sm -mt-3 absolute bottom-1 left-2'>Shop Now</h1>
  </div>
 
 
  </div>

  )
}

export default ProductCard3;
