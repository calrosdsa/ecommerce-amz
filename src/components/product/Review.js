
function Review({title,image,review,rating,country,added_by,avatar,date_added,name,like,ReactStars,moment}) {
  let avg = rating
  return (
    <div className="my-3">
        <div className='flex space-x-5 items-center'>
        {avatar === ""?
        <img className='h-8 w-8 rounded-full' src="https://res.cloudinary.com/mer/image/upload/v1644434555/object_File_i5evul_l3stsl.jpg" alt="" />
        :
        <img className='h-8 w-8  rounded-full' 
        src={`https://res.cloudinary.com/mer/image/upload/v1/${avatar}`} alt="" />
        
    }
    <h1 className="text-xs">{name}</h1>
    </div>
    <div className="flex items-center">
      {avg &&
        <ReactStars
        value={avg}
        count={5}
        edit={false}
        size={15}
        isHalf={true}
        />
      }
      <span className=" text-xs mx-1">({avg})</span>
        <h1 className="text-[13px] font-semibold">{title}</h1>
    </div>
    <div>
        <h1 className="text-[12px]">Reviewed in {country} on {moment(new Date(date_added)).format('LLL')}</h1>
        <p class="my-2 text-xs check-those-p-tags">{review}</p>
        {image !== "" &&
         <img className='h-32 w-32' 
         src={`https://res.cloudinary.com/mer/image/upload/v1/${image}`} alt="" />
        }
        <h1 className="text-xs text-gray-500 mb-2">{like} people found this helpful</h1>
        <div className=" ">
          <span className="border-[1px] cursor-pointer border-gray-400 rounded-xl px-5 shadow-xl py-[2px] text-xs">Helpful</span>
          <span className="text-gray-500 cursor-pointer text-xs px-5">Report Abuse</span>
        </div>
    </div>
    </div>
  )
}

export default Review