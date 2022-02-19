import React from 'react'

function ReviewModel({item,ReactStars,moment,XIcon,ViewGridIcon,closeReview,show,reviewImages,setTrue,showReview}) {
    console.log(show)
  return (
    <div className='fixed  inset-x-0 top-1/4 rounded-xl z-20 shadow-2xl mx-auto  w-11/12 h-[480px]  md:w-9/12 lg:w-2/3 2xl:w-1/2 bg-white '>
        <div className=' bg-gray-200 flex justify-end py-3 rounded-t-xl'>
            <XIcon onClick={()=>closeReview()} className='h-5 cursor-pointer w-5 mx-3'/>
        </div>
        {show ?
        <div className='flex flex-wrap h-96'>
             {reviewImages.map((item,i)=>(
                 <div onClick={()=>showReview(item.id)} key={i}>
                 {item.image !== "" &&
                     <img className='h-32 w-32' 
                src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`} alt="" />
            }
             </div>
             ))}
        </div>
        :
        <div>

        <div  onClick={()=>setTrue()} className=' flex space-x-1 my-2 cursor-pointer ml-4 '>
            <ViewGridIcon className="h-5 w-5 "/>
            <h1 className=' font-semibold text-xs'>View Image Gallery</h1>
        </div>
        <div className='sm:grid sm:grid-cols-5 m-2'>
            <div className='sm:col-span-3 flex justify-center items-center xl:items-start object-contain'>
        <img className='h-56 w-56 sm:w-64 sm:h-64 2xl:h-96 2xl:w-96 ' 
               src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`} alt="" />
               </div>
               <div className=' sm:col-start-4 col-span-2  mx-3'>
                   <div className=' space-x-3 items-center flex'>
               {item.avatar === ""?
        <img className='h-8 w-8 rounded-full' src="https://res.cloudinary.com/mer/image/upload/v1644434555/object_File_i5evul_l3stsl.jpg" alt="" />
        :
        <img className='h-8 w-8  rounded-full' 
        src={`https://res.cloudinary.com/mer/image/upload/v1/${item.avatar}`} alt="" />
        
    }
    <span className='text-sm'>{item.name}</span>
    </div>
    <div className='flex items-center space-x-4'>
        <ReactStars
        value={item.rating}
        size={15}
        count={5}
        edit={false}
        isHalf={false}
        />
        <h1 className='text-sm font-semibold'>{item.title}</h1>
    </div>
    <div className=' overflow-y-scroll h-28 sm:h-80 '>
        <h1 className="text-[12px]">Reviewed in {item.country} on {moment(new Date(item.date_added)).format('LLL')}</h1>
        <p class="my-2 text-xs check-those-p-tags">{item.review}</p>
        <h1 className="text-xs text-gray-500 mb-2">{item.like_review} people found this helpful</h1>
        <div className=" my-2">
          <span className="border-[1px] cursor-pointer border-gray-400 rounded-xl px-5 shadow-xl py-[2px] text-xs">Helpful</span>
          <span className="text-gray-500 cursor-pointer text-xs px-5">Report Abuse</span>
        </div>
    </div>

               </div>
        </div>
</div>
}
    </div>
  )
}

export default ReviewModel