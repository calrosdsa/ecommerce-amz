import React from 'react'
import { useSelector } from 'react-redux'
function SidebarCart() {
    const { cart,total } = useSelector(state=>state.cart)
  return (
    <div className='w-24 mx-auto shadow-xl px-2 h-screen'>
        <div>
        <h1 className='text-xs'>Subtotal</h1>
        <strong className=' text-red-700 text-sm '>{total.toFixed(2)}</strong>
        {cart.map((item,i)=>(
            <div className='relative'>
                 <img className=' col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           <h1 className=' rounded-full shadow-xl -mt-4 border-2 mx-1 ml-[75px] z-10 bg-white font-semibold'>{item.quantity}</h1>
            </div>
        ))}
        </div>
    </div>
  )
}

export default SidebarCart