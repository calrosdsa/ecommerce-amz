import {useEffect} from 'react';
import { Link } from 'react-router-dom';

function RelatedToHistory({history,history_related}) {
    

useEffect(()=>{
    },[])
  return <div className=' overflow-x-scroll  my-10 px-2 -mt-4 xl:px-4'>
           <h1 className='text-xl font-semibold mt-2'>Inspired by your browsing history</h1>
           <div className='flex space-x-4 lg:space-x-6 my-2 lg:px-14'>
      {history_related.map((item,i)=>(
          <Link to={`/product/${item.slug}`} className='min-w-[150px]' key={i}>
               <img className='w-32 h-32 md:h-44 md:w-44 col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           <h1 className=' line-clamp-3 text-[13px] lg:line-clamp-4 text-cyan-700 text-sm '>{item.title}</h1>
           <h1>${item.price}</h1>
           <span className='text-[12px]'>${(item.price/6).toFixed(2)} shipping</span>
           {item.quantity < 4 ?
           <h1 className='text-xs text-teal-700'>Only {item.quantity} left in stock - order...</h1>   
           :
           <h1></h1>
        }
          </Link>
      ))}
      </div>

  </div>;
}

export default RelatedToHistory;
