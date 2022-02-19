import React from 'react';

function Quantity({quantity,setQuantity, qnt  }) {

    const increaseCount = () => {
        if(quantity < qnt){
            setQuantity(quantity + 1)
        }
    }

    const decreaseCount = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
 


  return <div className='flex space-x-2 justify-start items-center text-2xl mx-1'>
      <h1>Quantity:</h1>
      <button className='bg-yellow-300 w-8 h-8  rounded-lg' onClick={()=>decreaseCount()}>-</button>
      <h1>{quantity}</h1>
      <button className='bg-yellow-300 w-8 h-8  rounded-lg' onClick={()=>increaseCount()}>+</button>
      

  </div>;
}

export default Quantity;
