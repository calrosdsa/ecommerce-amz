import React from 'react'
import ProgressBar from 'react-percent-bar';

function ReviewRating({reviews, reviewAverageRating,ReactStars,filterArray}) {
    const { avgRating ,avgPorcent } = reviewAverageRating(reviews)
  return (
    <div className='sm:w-full 2xl:w-3/4'>
        <div>

       <h1 className='text-xl font-semibold'>Customer Reviews</h1>
       <div className='flex items-center space-x-2'>
       {avgRating&&
       <ReactStars 
       value={avgRating}
       count={5}
       edit={false}
       size={20}
       isHalf={true}
       />
    }
         <h1>{avgRating} out of 5</h1>
         </div>
         <span className='text-xs text-gray-400'>{reviews.length} global ratings</span>
         <div className=' space-y-2 border-b-[1px] border-gray-300 pb-5'>
             {typeof(avgPorcent[5]) === 'number' ?
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
                 <span className='cursor-pointer' onClick={()=>filterArray(5)}>5 star</span>
                 <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={avgPorcent[5]} />
                 <span>{avgPorcent[5]}%</span>
             </div>
             :
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
             <span >5 star</span>
             <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={0} />
             <span className='cursor-pointer'>0%</span>
         </div>
            }
               {typeof(avgPorcent[4]) === 'number' ?
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
                 <span  className='cursor-pointer' onClick={()=>filterArray(4)}>4 star</span>
                 <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={avgPorcent[4]} />
                 <span>{avgPorcent[4]}%</span>
             </div>
             :
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
             <span >4 star</span>
             <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={0} />
             <span> className='cursor-pointer'0%</span>
         </div>
            }
               {typeof(avgPorcent[3]) === 'number' ?
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
                 <span onClick={()=>filterArray(3)} className='cursor-pointer'>3 star</span>
                 <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={avgPorcent[3]} />
                 <span>{avgPorcent[3]}%</span>
             </div>
             :
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
             <span className='cursor-pointer' >3 star</span>
             <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={0} />
             <span>0%</span>
         </div>
            }
               {typeof(avgPorcent[2]) === 'number' ?
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
                 <span onClick={()=>filterArray(2)} className='cursor-pointer'>2 star</span>
                 <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={avgPorcent[2]} />
                 <span>{avgPorcent[2]}%</span>
             </div>
             :
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
             <span className='cursor-pointer'>2 star</span>
             <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={0} />
             <span >0%</span>
         </div>
            }
               {typeof(avgPorcent[1]) === 'number' ?
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
                 <span onClick={()=>filterArray(1)} className='cursor-pointer' >1 star</span>
                 <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={avgPorcent[1]} />
                 <span>{avgPorcent[1]}%</span>
             </div>
             :
             <div className='flex text-xs text-cyan-700 space-x-2 items-center'>
             <span className='cursor-pointer' >1 star</span>
             <ProgressBar colorShift={true} fillColor="yellow" radius={0} width='180px' percent={0} />
             <span>0%</span>
         </div>
            }
         </div>
       </div>
         
         <div className='text-xs flex flex-col py-4 border-b-[1px] border-gray-300'>
             <h1 className='text-lg font-semibold'>Review this product</h1>
             <span className='my-2'>Share your thoughts with the other customers</span>
             <div className='mx-auto my-2'>
             <span className='border-[1px] shadow-lg py-1 px-10'>Write a customer review</span>
             </div>
         </div>
    </div>
  )
}

export default ReviewRating