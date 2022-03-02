import React,{useRef,useReducer,useEffect} from 'react';
import { Link } from 'react-router-dom';



const initialState = {item: {}};

function reducer(state, action) {
  const payload = action.payload
  switch (action.type) {
    case 'SET_MAIN_ITEM':
      return {
          item: payload
        };
        
    default:
      throw new Error();
  }
}
function ProductCardModel({DiscountPrice,category_trend,title}) {
    const [state,dispatch] = useReducer(reducer,initialState)
     
    const handleItem = (item,i) =>{
        dispatch({type:'SET_MAIN_ITEM',payload:item})

        imageRef.current[i].classList.add('ring-2');
        for (var j = 0; j < category_trend.length; j++) {
            if (i !== j) {
                imageRef.current[j].classList.remove('ring-2');
            }
        }
    }
    const imageRef = useRef()
    imageRef.current = [];
    const addRefs = (el) => {
        if (el && !imageRef.current.includes(el)) {
            imageRef.current.push(el);
        }
    };  

    useEffect(()=>{
        dispatch({type:'SET_MAIN_ITEM',payload:category_trend[0]})

    },[category_trend])
  return(
  <div className='p-3 bg-white min-w-[250px]'>
  <h1 className='text-[19px]  font-semibold mb-2'>{title}</h1>
 {state.item&&
           <div>
      <Link to={`/product/${state.item.slug}`} className=' flex justify-center mb-3 '>

       <img className='w-32 h-32 md:h-36 md:w-44 col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${state.item.image}`}  alt="" />
           </Link>
      <h1 className='text-[12px] line-clamp-2 '>{state.item.title}</h1>
      <div className='flex'>
      <h1 className='text-[12px] mt-2'>$</h1>
      <h1 className='text-lg font-semibold'>{DiscountPrice(state.item.price)[0]} </h1>
      <h1 className='text-[11px] mt-[2px] '>{DiscountPrice(state.item.price)[1]} </h1>
      <div className='relative'>
      <h1 className='text-[11px]  mx-2 mt-[4px]'>${state.item.price}</h1>
      <span className='bg-gray-800 absolute top-3 left-1 w-10 h-[0.1px] flex'></span>
      </div>
      </div>
      </div>
   }
   <div className='flex justify-center space-x-3 mt-1'>
       {category_trend.slice(0,4).map((item,i)=>(
           <div className={i == 0 ? 'ring-2 p-1 border-[1px] border-black' : 'p-1 border-[1px] border-black' }
            key={i} ref={addRefs} onClick={()=>handleItem(item,i)}>
             <img  className='h-10 w-10 sm:h-14 sm:w-14 lg:h-10 lg:w-10 xl:h-13 xl:w-13 object-contain'  src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`} alt="" />
           </div>
       ))}
       </div>
</div>

  )
}

export default ProductCardModel;
