import {useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { appendQuery, removeQuery } from '../../utils/utils copy';
import queryString from "query-string";


function Sidebar({category,category_id,parent,category_parent,brand,location}) {
    const navigate = useNavigate()
    const [min,setMin] = useState()
    const [max,setMax] = useState()
    const query = queryString.parse(location.search)
    console.log(typeof(query.sub_category))


    const handleBrand = (item,index) =>{
      navigate(appendQuery(location,{brand:item}), { state: { category:category,category_id:category_id,category_parent:category_parent,parent:parent } })
    }
    
  return <div className=''>
      <div>

        <div className='grid grid-cols-2 gap-x-4 items-start sm:flex sm:flex-col sm:my-2'>
          <div>
            
      <h1 className='text-[15px] font-semibold'>Department</h1>
      <h1 className=' hover:underline cursor-pointer hover:text-orange-400 text-[15px] ml-2'>
        <span className='text-lg font-bold'>{'<'}</span>{parent}</h1>
      <h1 className='text-[15px] ml-3 font-semibold'>{category}</h1>
       <div>
           {category_parent.map((item,i)=>(
             <Link key={i}  state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}
             to={appendQuery(location,{sub_category:item.id})}
             className={`flex flex-col ${query.sub_category === String(item.id) && 'underline text-orange-400'}`}>{item.title}</Link>
             ))}
       </div>
             </div>


    <div >
      <h1 className='text-[15px]  font-semibold'>Featured Brands</h1>
      <Link   to={removeQuery(location, 'brand')} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>
    <label className="inline-flex items-center ">
      <input type="checkbox" name="accountType" className='' checked={ query.brand === undefined }/>
      <span className="ml-2">All</span>
    </label>
    </Link>
      {brand.map((item,i)=>(
        
        <div key={i} className='mt-1  flex flex-col' onClick={()=>handleBrand(item.id,i)}>
    <label className="inline-flex items-center ">
      <input type="checkbox" name="accountType" className='' checked={item.id === Number(query.brand)} value={item.id}/>
      <span className="ml-2">{item.brand}</span>
    </label>
  </div>
     ))}
     </div>
     </div>
     <div className='grid grid-cols-2 my-1 sm:flex-col sm:flex items-start gap-x-4'>

   <div>
      <h1 className='text-[15px] sm:mt-2 font-semibold'>Price</h1>
      <div className='flex flex-col'>
          <Link className={`hover:underline hover:text-orange-400 ${query.price_max === '25' && 'underline text-orange-400'}`} 
          to={appendQuery(location, {price_min:0,price_max: 25})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>Under $25</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.price_max === '50' &&  query.price_min === '25' && 'underline text-orange-400'}`} to={appendQuery(location, {price_min: 25,price_max: 50})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>$25 to $50</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.price_max === '100' && query.price_min === '50' &&  'underline text-orange-400'}`} to={appendQuery(location, {price_min: 50,price_max: 100})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>$50 to $100</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.price_max === '200' && query.price_min === '100' &&  'underline text-orange-400'}`} to={appendQuery(location, {price_min: 100,price_max: 200})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>$100 to $200</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.price_max === '' && query.price_min === '200' &&  'underline text-orange-400'}`} to={appendQuery(location, {price_min: 200,price_max: ''})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>$200 $ Above</Link>
          <div className='flex w-20 space-x-2 mt-2'>
              <input placeholder='$Min' onChange={(e)=>setMin(e.target.value)}
               className='w-14 xl:w-16 outline-none border-[1px] hover:ring-2 clic border-gray-600 py-1 px-2' type="text" name="" id="" />
              <input placeholder='$Max' onChange={(e)=>setMax(e.target.value)}
               className='w-14 xl:w-16 outline-none border-[1px] hover:ring-2 border-gray-600 py-1 px-2' type="text" name="" id="" />
              <button onClick={()=>{
                  navigate(appendQuery(location,{price_min:min,price_max:max}), { state: { category:category,category_id:category_id,category_parent:category_parent,parent:parent } })
              }} className=' border-[1px] shadow-lg border-gray-500 p-1 mx-2 rounded-xl px-2 cursor-pointer'>Go</button>

          </div>
      </div>
           </div>

      <div className='flex flex-col -space-y-1'> 
           <h1 className='text-[15px] sm:mt-4 mb-1 font-semibold'>Condition</h1>
          <Link className={`hover:underline hover:text-orange-400 ${query.condition === 'New' && 'underline text-orange-400'}`} to={appendQuery(location, {condition: 'New'})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>New</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.condition === 'Renewed' && 'underline text-orange-400'}`}  to={appendQuery(location, {condition: 'Renewed'})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>Renewed</Link>
          <Link className={`hover:underline hover:text-orange-400 ${query.condition === 'Used' && 'underline text-orange-400'}`}  to={appendQuery(location, {condition: 'Used'})} 
    state={{category:category,category_id:category_id,category_parent:category_parent,parent:parent}}>Used</Link>

      </div>
    </div>
    
    <div className='grid grid-cols-2 my-1 sm:flex-col sm:flex items-start gap-x-4'>
      <div className='flex flex-col'> 
           <h1 className='text-[15px] mt-4  font-semibold'>Deals & Discount</h1>
          <span>All Discount</span>
          <span>Todays Deals</span>
      </div>

      <div className='flex flex-col'> 
           <h1 className='text-[15px] mt-4 font-semibold'>New & Upcoming</h1>
          <span>New Arrivals</span>
          <span>Coming Soon</span>
      </div>
    </div>

    <div className='grid grid-cols-2 my-1 sm:flex-col sm:flex items-start gap-x-4'>
      <div className='flex flex-col mt-4'> 
           <h1 className='text-[15px]  font-semibold'>Certifications</h1>
           <div className="mt-1">
    <label className="inline-flex items-center ">
      <input type="checkbox" name="accountType"/>
      <span className="ml-2">Energy Star</span>
    </label>
  </div>
      </div>


      <div className='flex flex-col mt-4'> 
           <h1 className='text-[15px]  font-semibold'>Amazon Global Store</h1>
           <div className="mt-1">
    <label className="inline-flex items-center ">
      <input type="checkbox" name="accountType"/>
      <span className="ml-2">Amazon Global Store</span>
    </label>
  </div>
      </div>
    </div>

      

    <div className='grid grid-cols-2 my-1 sm:flex-col sm:flex items-start gap-x-4'>
      <div className='flex flex-col mt-4'> 
           <h1 className='text-[15px]  font-semibold'>Availability</h1>
           <div className="mt-1">
    <label className="inline-flex items-center ">
      <input type="checkbox" name="accountType"/>
      <span className="ml-2">Include Out of Stock</span>
    </label>
  </div>
      </div>
      </div>


      
       
      </div>




  </div>;
}

export default Sidebar;
