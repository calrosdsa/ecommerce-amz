import React,{useState} from 'react'
import Quantity from '../payments/Quantity'
import {add_to_cart} from '../../actions/products'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

function Products({slug,price,id,Qnt,image,title}) {
  const [quantity,setQuantity] = useState(1)
  const dispatch = useDispatch()

  const product = {slug,price,id,image,title}
  
    return (
        <div>
            <div className='flex'>
            <h1>{price}</h1>
            <Link to={`/product/${slug}`}>{title}</Link>
            
        <Quantity qnt={Qnt} id={id} quantity={quantity} setQuantity={setQuantity}/>
        <button className='bg-yellow-400 p-1 rounded-xl' onClick={()=>dispatch(add_to_cart(product,quantity  ))}>Add To Cart</button>
        <h1>quantity: {Qnt}</h1>
                </div>
        </div>
    )
}

export default Products
