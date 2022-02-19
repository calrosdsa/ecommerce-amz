import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { filter_properties, get_filter } from '../../actions/products';
import Sidebar from './Sidebar';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { useLocation } from 'react-router-dom'
import SidebarCart from '../product/SidebarCart';
import { useMediaQuery } from 'react-responsive'

const FilterProduct=()=> {
    const location = useLocation()
    const { category,category_id, parent } = location.state
    const [show,setShow] = useState(true)
    const isMobile = useMediaQuery({
        query: '(min-width: 640px)'
      })
      const dispatch = useDispatch()
      const {category_parent, products , brand} = useSelector(state=>state.filter)

    const DiscountPrice = (price)=>{
        const discout = (price).toFixed(2).split('.')
        return discout
    }
   

    useEffect(()=>{
        console.log(isMobile)
    dispatch(get_filter(location.search))
    dispatch(filter_properties(category_id))
    },[get_filter,location.search])

   return(
       <div className='md:flex mb-[800px] px-3'>
        <div  className='mt-5 xl:mt-10 sm:grid content-center  sm:grid-cols-3 md:grid-cols-4'>
         <div onClick={()=>setShow(!show)} className='sm:hidden mb-3 flex space-x-2 items-center bg-slate-300  rounded-md w-36 justify-center '>
             <span >{show ? 'Hidden Filters' : 'Filter Products'}</span>
             <AdjustmentsIcon className='h-4 w-4'/>
         </div>
         {isMobile&&
            <div className='col-start-1 grid  lg:w-3/5 mx-auto '>
            <Sidebar 
            location={location}
            brand={brand} 
            category_parent={category_parent} 
            category={category} 
            category_id={category_id} 
            parent={parent}
            />
            
            </div>
        }
        <div className='sm:hidden'>
        {show &&
          <Sidebar 
          location={location}
          brand={brand} 
          category_parent={category_parent} 
          category={category} 
          category_id={category_id} 
          parent={parent}
          />
        }
        </div>
            
       <div className='sm:col-start-2 grid grid-cols-2  xl:grid-cols-4 place-items-start  md:grid-cols-3 md:gap-10 px-3 gap-3 lg:px-10 sm:col-span-2 md:col-span-3'>
           
       {products.map(((item,i)=>(
           <div className='xl:p-2 ' key={i}>
               <img className='object-contain p-3  lg:p-1 xl:my-4 h-44 lg:h-48 xl:h-56 2xl:p-4 ' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           <h1 className='text-sm lg:text-base font-semibold line-clamp-4 xl:-mt-7'>{item.title}</h1>
           <div className='flex items-start'>
           <h1 className=' text-sm'><span className='text-xs '>$</span>{DiscountPrice(item.price)[0]}</h1>
           <span className='text-[10px] '>{DiscountPrice(item.price)[1]}</span>
           {item.discount&&
           <div className='relative flex'>
           <h1 className='text-xs mt-1'>{((DiscountPrice(item.price)[0] / (item.discount)) + item.price).toFixed(2)}</h1>
           <span className='bg-gray-800 absolute top-3 left-1 w-10 h-[0.1px] flex'></span>
           </div>
        }
           </div>

           </div>
           )))}
           </div>

   </div>
           <div className=' hidden md:flex'>
               <SidebarCart/>
           </div>
           </div>
   )
}

export default FilterProduct;
