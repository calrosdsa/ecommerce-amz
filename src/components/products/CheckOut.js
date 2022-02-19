import React,{useEffect,useState} from 'react';
import { PayPalScriptProvider, PayPalButtons,BraintreePayPalButtons, } from "@paypal/react-paypal-js";
import {add_to_cart} from '../../actions/products'
import {useSelector,useDispatch} from 'react-redux'
import {remove_from_cart,update_quantity,remove_all_items} from '../../actions/products'
import { save_for_later, set_histories, set_orders } from '../../actions/order';
import { TrashIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import History from './History';
import RelatedToHistory from './RelatedToHistory';
import { set_history_related } from '../../actions/account';
function CheckOut() {
    const {cart,total,items} = useSelector(state=>state.cart)
    const {history,history_related} = useSelector(state => state.account)
  
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const filterItem = (cart,history)=>{
    const ids = cart.map(item=>item.id)
    let array = new Array()
    for (let i = 0; i < history.length;i++){
      if (i in ids === false){
        array = [...array,history[i]]
      }
    }
    return array.slice(0,5)
  }
  useEffect(() => {
//    var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");
  if (token){
    if(history.length === 0){
      dispatch(set_histories())
      console.log('yes')
    }else{
      console.log('not')
    }
    if(history_related.length === 0){
      dispatch(set_history_related())
      console.log('yes')
    }else{
      console.log('not')
    }
  }
  }, [])

  return(
    <div>

   <div className=' lg:bg-gray-300 lg:grid lg:grid-cols-9 2xl:px-20 '>
     <div className=' lg:place-items-center p-4 lg:mr-3 lg:mb-[500px] lg:rounded-lg lg:my-3  col-start-8 col-span-2  lg:bg-white'>
     <div className='flex sm:text-lg lg:text-xl'>
     <h1>Subtotal({items} items)</h1>
         <h1 className=' font-semibold'> ${total.toFixed(2)}</h1>
         </div>
         
         <PayPalScriptProvider options={{ "client-id": "AS6sVCA_eGz2AlxPZq45TPIyWe8utd0xROs0xpHFD0ycQzjm-mKh_DEc5Njl0_h4FOKrBfkA0nRO9xj7" }}>
            <PayPalButtons
             createOrder={(data, actions) => {
               return actions.order.create({
                 purchase_units: [
                   {
                     //description: `${cart.map(item=>(item.slug.concat(` quantity:${item.quantity}`))).join(' / ')} ${items} products purchage`,
                     amount: {
                       value: `${total.toFixed(2)}`,
                       currency_code: "USD",
                       
                      },
                      
                    }
                  ]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const name = details.payer.name.given_name;
                  alert(`Transaction completed by ${name}`);
                  dispatch(set_orders({orderItems:cart,items:items,total:total}))
                });
              }}
              />
        </PayPalScriptProvider>
              </div>
     <div className='sm:px-10 lg:p-3 lg:row-start-1 lg:m-3 lg:col-start-1 lg:col-span-7 bg-white  '>
       <div className='border-b-[0.5px] lg:grid lg:grid-cols-3 border-gray-400'>
         <div>

     <h1 className='text-xl '>Shopping Cart</h1>
     <h1 onClick={()=>dispatch(remove_all_items())} className='text-cyan-600 cursor-pointer text-sm sm:text-base lg:text-lg xl:font-semibold'>Deselect all Items</h1>
         </div>
         <h1 className='hidden xl:flex xl:col-start-4 text-lg place-self-end pr-2'>Price</h1>
       </div>

       <div className=''>
      {cart.map(item=>(
        <div key={item.id} className='grid grid-cols-3 xl:grid-cols-4 space-x-4 mt-2 border-b-[1px] py-2 border-gray-500 '>
           <img className='col-start-1 xl:place-self-end sm:h-56 sm:w-56 object-contain' src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           <div className='col-start-2 col-span-2'>
             <Link to={`/product/${item.slug}`}  className='text-base sm:text-xl line-clamp-1 md:line-clamp-2 font-semibold'>{item.title}</Link>
             <h1 className='xl:hidden'>${item.price}</h1>
             {item.product_qty > 10 ?
             <h1 className='text-xs sm:text-base font-semibold text-green-600'>In stock</h1>
             :
             <h1 className='text-orange-600 text-xs sm:text-base font-semibold'>Only {item.product_qty} left in stock - order soon.</h1>
             }
              {item.features&&
               item.features.slice(0,3).map((val,i)=>(
                   <div key={i} className='grid grid-cols-2 text-[13px] sm:text-base  space-x-3'>
                <h1 className=' line-clamp-1 text-black font-semibold'>{val.specification_name}</h1>
               <h1 className=' line-clamp-1'>{val.value}.</h1>
               </div>
               ))}
               <div className='3xl:flex xl:mt-2 xl:items-center cursor-pointer '>

               <div className='text-cyan-600 divide-x-2  divide-gray-400 sm:text-lg mt-1 flex space-x-3'>
          <h1 className=''
           onClick={()=>dispatch(remove_from_cart(item))}>Delete</h1>
            <h1 className='pl-3'
           onClick={()=>dispatch(save_for_later(item))}>Save for Later</h1>
           <h1 className='pl-3'>Compare with similar items</h1>
           </div>
           <div className='pr-2 text-2xl mt-2 w-3/4 sm:w-1/3 sm:mx-2 mx-auto grid grid-cols-3 place-items-center  rounded-lg '>
                <div className='bg-gray-200 border-2   w-full flex justify-center'>
                  {item.quantity === 1 ?
                <TrashIcon  onClick={()=>dispatch(remove_from_cart(item))} className='h-7 w-7 text-gray-600'/>
                :
                <button onClick={()=>dispatch(update_quantity(item.id,-1))} className='w-full font-bold'>-</button>
              }
                </div>
                <h1 className='border-2 w-full flex justify-center' >{item.quantity}</h1>
                <button  onClick={()=>{
                  if(item.quantity < item.product_qty ){
                    dispatch(update_quantity(item.id,+1))
                  }
                }
                  } className=' border-2 w-full font-bold bg-gray-200 flex justify-center '>+</button>
              </div>
           </div>
           </div>
           <h1 className=' xl:col-start-4 hidden xl:flex text-2xl font-semibold xl:justify-end'>${item.price}</h1>
           </div>
        ))}
        </div>


</div>
      
      {token&&
        <div className='lg:col-start-8 px-5 mb-3  lg:col-span-2 lg:-mt-[490px]  lg:mr-3 lg:rounded-lg bg-white'>
        <h1>You recently viewed items</h1> 
        {filterItem(cart,history).map(item=>(
          <div className='grid xl:grid-cols-2 xl:gap-x-3 place-items-center'>
            <Link to={`/product/${item.slug}`}>
           <img className='w-24 h-24 col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           </Link>
            <div className='-ml-5 lg:hidden xl:grid'>
              <Link to={`/product/${item.slug}`} className='text-cyan-700 line-clamp-1'>{item.title}</Link>
              <h1 className='text-orange-700 '>${item.price}</h1>

            </div>
          </div>
        ))} 
        </div>
      }
  </div>
   <div className='mt-10'>
  <RelatedToHistory history_related={history_related}/>
  <History  history={history}/>
   </div>
    </div>
  );}

export default CheckOut;
