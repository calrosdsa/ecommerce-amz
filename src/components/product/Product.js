import React,{useEffect,useState,useReducer,useRef} from 'react';
import { ChevronRightIcon,ChevronDownIcon, LocationMarkerIcon,LockClosedIcon ,XIcon,ViewGridIcon,ChevronLeftIcon} from '@heroicons/react/solid';
import { get_product,add_to_cart, get_reviews, update_reviews} from '../../actions/products'
import { Link, useParams , useLocation, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {useDispatch , useSelector} from 'react-redux'
import ReactImageMagnify from 'react-image-magnify';
import moment from 'moment';
import Quantity from '../payments/Quantity';
import Review from './Review';
import queryString from "query-string";
import { GET_REVIEWS } from '../../actions/types';
import ReviewModel from './ReviewModel';
import ReviewRating from './ReviewRating';



const initialState = {image: ``,word1:null,itemReview:null,show:false,currIndex:0,images:[]};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_IMAGE':
      return {
          ...state,
          image:action.payload 
        };
    case 'SET_WORD':
        return {
            ...state,
            word1:action.payload,
        };
    case 'SET_REVIEW':
        return{
            ...state,
            itemReview: action.payload
        }
    case 'SHOW':
        return{
            ...state,
            show:action.payload
        }
    case 'SET_INDEX':
        return{
            ...state,
            currIndex:action.payload
        }
    case 'SET_IMAGES':
        return {
            ...state,
            images:action.payload.array
        }
  
    default:
      return state;
  }
}
function Product() {
    const slug  = useParams();
    
    const location = useLocation()
    const navigate = useNavigate()
    const userLocation = useSelector(state=>state.auth.userLocation)
    const [showMore,setShowMore] = useState(false)
    const [order,setOrder] = useState('Top')
    const [quantity,setQuantity] = useState(1)
    const [slice,setSlice] = useState(2)
    const dispatch = useDispatch()
    const {product,reviews ,review,reviewFilter} = useSelector(state => state.product)
    const [state, dispatch2] = useReducer(reducer, initialState);
    const getRandomArbitrary=(Min, Max)=> {
        return Math.random() * (Max - Min) + Min;
      }
    const d = new Date();
    const deliver =  new Date(d.setDate(d.getDate() + 5))

const closeReview=()=>{
    dispatch2({type:'SET_REVIEW',payload:null})
    dispatch2({type:'SHOW',payload:false})
}

const reviewAverageRating=(reviewFilter)=>{
    const initialValue = 0
    const avg = reviewFilter.map(item=>item.rating)
    const avgRating = avg.reduce((prev,curr)=>prev+curr,initialValue)/avg.length
    

    var avgPorcent = {}
    for (let word of avg) {
        if (avgPorcent[word]) {
          avgPorcent[word]++
        } else {
          avgPorcent[word] = 1;
        }
      }
    for (let porcent in avgPorcent){
       avgPorcent[porcent]= avgPorcent[porcent]/avg.length*100
    }
    
    return {avgRating,avgPorcent}
}

const setTrue=()=>{
    dispatch2({type:'SHOW',payload:true})
}

const showReview= (id)=>{
    const OnlyReview = reviewFilter.filter(item=>item.id === id)
    dispatch2({type:'SET_REVIEW',payload:OnlyReview[0]})
    dispatch2({type:'SHOW',payload:false})

}
  
const clearFilter=()=>{
    dispatch2({type:'SET_WORD',payload:null});
    dispatch({type:GET_REVIEWS,payload:reviewFilter});
}

const getIndex =(num)=>{
    if (state.currIndex +1 < product.productImage.length + 1){
        dispatch2({type:'SET_INDEX',payload:state.currIndex+num})
    }
}
const getIndexR = (num)=>{
    if (state.currIndex  > 0){
        dispatch2({type:'SET_INDEX',payload:state.currIndex - num})
    }
}

const dots = (index)=>{  
    dispatch2({type:'SET_INDEX',payload:index})
}


const orderReviews=(reviews)=>{
    if(order === 'Recents'){
        return reviews.sort(function(a,b){
            let c = new Date(a.date_added);
            let d = new Date(b.date_added);
            return c -  d 
         })
    }
    if(order === 'Top'){
        return reviews.sort(function(a,b){
           let c = a.like_review;
           let d = b.like_review;
           return d - c
        })
    }
}   

const query = queryString.parse(location.search)

const filterArray=(word)=>{
    const filterReview = reviews.filter(item=>item.review.includes(word));
    dispatch({type:GET_REVIEWS,payload:filterReview});
    return filterReview;
}
const filterArray2=(rating)=>{
    const filterReview = reviews.filter(item=>item.rating === rating);
    dispatch({type:GET_REVIEWS,payload:filterReview});
    return filterReview;
}

const findWord = (word) =>{
    dispatch2({type:'SET_WORD',payload: word})
    filterArray(word);
    setTimeout(()=>{

        [...document.querySelectorAll('.check-those-p-tags')].forEach(function(element){
            // iterate over all elements
            const wish = new RegExp(`${word}`,'i\g')
            var resultString = element.innerHTML.replace(
                wish, // search for all (g = global) "the" in the innerHTML
                '<span class="bg-orange-200 ">$&</span>' // replace/wrap the "the" with some tags and class
                // "$&" means => Inserts the matched substring.
                );
                element.innerHTML = resultString; // overwrite the innerHTML with the new string
            });
        },100)
            //    dispatch(get_reviews(product.id, `?review=${word}`))
            
            
            
        }

const findMostFrequentWords = (string) => {
    const regex = /(?:(the|a|very|of|\+|an|this|can|on|would|to|i|do|for|by|it|however|#|more|with|you|when|now|has|also|if|it,|in|and|my|that|how|have|off|it|wait|is|upon|up|get|not|was|off|be|any|but|an|from|just|) +)/g; 
    const str1 = string.toLowerCase()
    let strFormatter = str1.replace(regex, ' ')
    let stringFormatter = strFormatter.replace(/[0-9]/g, '');
    let  stringf = stringFormatter.replace('/','')
    
    
  let words = stringf.split(/\s+/);
  var wordOccurrences = []
  for (var i = 0; i < words.length; i++) {
        wordOccurrences[words[i]] = (wordOccurrences[words[i]] || 0) + 1;
    }
  //  console.log(wordOccurrences)
  //  const maximum = Object.keys(wordOccurrences).reduce(function (accomulated, current) {
    //    return wordOccurrences[current] >= wordOccurrences[accomulated] ? current : accomulated;
    //});
    const result = []
    Object.keys(wordOccurrences).map((word) => {
        if (wordOccurrences[word] > 2 )
            result.push(word);
    })
    return result
    }


    const handleItem = (item,i) =>{
        dispatch2({type: 'CHANGE_IMAGE',payload:`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`})
        imageRef.current[i].classList.add('ring-4');
        for (var j = 0; j < product.productImage.length; j++) {
            if (i !== j) {
                imageRef.current[j].classList.remove('ring-4');
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
    const getImages = (images,image)=>{
       const allImages = images.map(item=>item.image)
       return [image , ...allImages]
    }
    useEffect(()=>{
       // window.scrollTo(0,0)
        dispatch(get_reviews(product.id,location.search))
        dispatch(get_product(slug.slug))
        dispatch2({type:'CHANGE_IMAGE',payload:`https://res.cloudinary.com/mer/image/upload/v1/${product.image}`})
        dispatch2({type:'SET_IMAGES',payload:{
            array:product.productImage,
            image:product.image
        }})
    },[slug.slug,product.title,location.search,query.review])
  return(
      <>
   <div className={`pb-[1000px]  lg:px-4 ${state.itemReview !== null && ''}`}>
         
    
       <div className='  flex justify-center '>
       <img className='h-8  sm:h-10 ' src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Launches/ILM/Fuji_ILM_Ship_en_US._CB665226464_.png" alt="" />
       </div>
       <div className='px-2 sm:px-20 md:px-28 lg:px-2'>
       <div className='flex ' >
           <Link className='flex hover:underline space-x-3 item-center text-xs' to={`/filter?categorie=${product.category_id}`}>{product.category_parent}
           <ChevronRightIcon className='h-4 w-4 text-gray-600'/>
           </Link>
           <Link className='flex hover:underline space-x-3 text-xs items-center' to={`.filter?categorie=${product.category_id}`}>{product.category}
           <ChevronRightIcon className='h-4 w-4 text-gray-600'/>
           </Link>
       </div>
       <div className='lg:grid lg:grid-cols-7  lg:gap-2'>

           <div  className={`hidden lg:place-self-center lg:relative lg:-mt-28  lg:top-36  lg:grid col-span-2`}>
      
      <div className="-ml-3 z-10 lg:w-[300px] h-[250px] xl:w-[350px] xl:h-[300px]  pt-2">
          <ReactImageMagnify
              {...{
                  smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      isFluidWidth: true,
                      src: state.image,
                    },
                    largeImage: {
                        src: state.image,
                      width: 1700,
                      height: 1000,
                  },
                  enlargedImageContainerDimensions: {
                      width: '350%',
                      height: '200%',
                    },
                }}
                />
      </div>
           {product.productImage &&
           <div className='flex space-x-3 absolute -bottom-8 -mb-5 xl:-bottom-20'>
           {product.productImage.map((item,i)=>(
               <div className={i === 0 ? 'ring-4' :'' } ref={addRefs}  onMouseOver={()=>handleItem(item,i)} key={i}>

               <img className='h-10 w-10 ' 
               src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`} alt="" />
               </div>
               ))}
               </div>
            }
            </div>

       <div className='lg:col-span-3 lg:col-start-3 '>
           {product.brand &&
           <div className='flex space-x-4 items-center justify-between'>
           <h1 className='text-cyan-600 text-xs'>Visit the {product.brand} Store</h1>
           <div className='flex  items-center space-x-3'>
           <ReactStars
           value={getRandomArbitrary(3.8,5)}
           count={5}
           edit={false}
           size={20}
           isHalf={true}
           />
           <h1 className='text-xs text-cyan-600'>{getRandomArbitrary(50,198).toFixed(0)}</h1>
           </div>
           </div>
        }
        <h1 className='my-1'>{product.title}</h1>
        <div className='flex space-x-4'>
            <img className='w-28 h-8' src="https://tandemup.net/wp-content/uploads/2019/08/trevinol-selected-as-amazon-s-choice-in-pet-supplies-6.gif" alt="" />
            <h1 className='text-xs'>for "{product.title}"</h1>
        </div>

         {product.productImage&&
        <div className='0 lg:hidden'>
            <div className='relative max-w-[400px] mx-auto grid items-center place-items-center'>
            {state.currIndex !== 0 &&
            <ChevronLeftIcon className='h-12 w-12 text-gray-400 absolute left-1' onClick={()=>getIndexR(1)}/>
            }
        <img className='p-2 lg:hidden w-72 h-72 object-contain  mx-auto sm:w-80 sm:h-80' 
        src={`https://res.cloudinary.com/mer/image/upload/v1/${getImages(product.productImage,product.image)[state.currIndex]}`} alt="" />
        <div className=' absolute bottom-3'>
        {getImages(product.productImage,product.image).map((item,i)=>(
            <span className={`text-[100px]  z-10 ${i === state.currIndex ? 'text-white': 'text-gray-400'}`} key={i} onClick={()=>dots(i)}>.</span>
            ))}
            </div>
            {state.currIndex !== product.productImage.length  &&
            <ChevronRightIcon className='h-12 text-gray-400 absolute w-12 right-1' onClick={()=>getIndex(1)}/>
            }
            </div>
      
        </div>
    }



        <div className='flex items-center space-x-2 p-1 border-[1px]'>
            <img className='h-8 w-14' src="https://logos-marcas.com/wp-content/uploads/2021/04/Alexa-Logotipo-2019-presente.jpg" alt="" />
            <div className=''>
                <h1 className='text-xs'>Ask to set reminders, check your calendar, control smart home devices, and more with this PC.</h1>
                <div className='flex space-x-4'>
                    <h1 className='text-xs text-gray-400'>ALEXA BUILT-IN</h1>
                    <h1 className='text-xs text-cyan-600'>Learn more</h1>
                </div>
            </div>
        </div>
       </div>

       <div className='lg:col-start-6 lg:col-span-2'>
       <h1 className='text-red-700'>${product.price}</h1>    
       <div className=''>

       <h1 className='text-sm'>${(product.price/6).toFixed(2)} Shipping & Import Fees Deposit to Bolivia</h1>
       <div className='flex items-end'>
       <span className='text-cyan-600 items-end flex  space-x-2'> Details</span>
       <ChevronDownIcon className='h-4 w-4'/>
       </div>
       </div>
       <div className='flex text-sm space-x-3 items-center'>
       <h1 >Deliver</h1>
       <h1 className='text-black font-semibold'>{moment(deliver).format("MMMM d - YY ")}</h1>
       </div>
       <div className='flex space-x-1 items-center'>
           <LocationMarkerIcon className='w-4 h-4 text-gray-400'/>
           <h1 className='text-[13px] font-semibold text-cyan-600 '>Deleiver to {userLocation.country}</h1>
       </div>

       {product.in_stock ||
       <h1 className=' text-teal-600 text-lg'>In Stock.</h1>
    }
        <Quantity qnt={product.quantity} id={product.id} quantity={quantity} setQuantity={setQuantity}/>
       <div className='grid grid-cols-2 my-2 mx-1 space-x-3'>

           <button onClick={()=>{
            dispatch(add_to_cart(product.quantity,product.id,product.price,product.title,product.image,
                product.in_stock,product.features,product.slug,quantity,product.category_id))
           }} className=' bg-yellow-400 px-5 py-3 rounded-lg'>Add to Cart</button>
           <button  className=' bg-orange-400 px-5 py-3 rounded-lg'>Buy Now</button>
       </div>
       <div className='flex items-center space-x-1 my-1'>
           <LockClosedIcon className='h-4 w-4 text-gray-400'/>
           <h1 className='text-cyan-600 text-[13px] font-semibold'>Secure Transaction</h1>
       </div>
       <div className='flex space-x-2 text-[13px]'>
           <h1 className='text-gray-500'>Ships from </h1>
           <h1>Amazon.com</h1>
       </div>
       <div className='flex space-x-2 text-[13px]'>
           <h1 className='text-gray-500 mr-5'>Sold by </h1>
           <h1>Amazon.com</h1>
       </div>
       <div className='flex text-sm space-x-2'>
            <h1 className=''>Returnt:</h1>
            <span className='text-cyan-600 items-end  space-x-2'> Elegible for Return,Refund or Replacement</span>
       </div>
       <div className=' flex text-sm space-x-2'>
            <h1 className=''>Support:</h1>
            <span className='text-cyan-600 items-end flex  space-x-2'> Free Amazon tech support included</span>
        </div>
        <button className='bg-gray-300 px-4 my-1 py-1 w-full   rounded-lg'>Add to List</button>
       </div>

       <div className='mx-5 lg:col-span-3 lg:-mt-48 lg:col-start-3  text-sm grid '>
           <h1 className='font-semibold  text-lg'>Details</h1>
           {product.features&&
               product.features.map((item,i)=>(
                   <div key={i} className='grid grid-cols-2  space-x-3'>
                <h1 className=' text-black font-semibold'>{item.specification_name}</h1>
               <h1>{item.value}.</h1>
               </div>
               ))}
            {showMore&&
            <div>

           {product.brand&&
            <div className='grid grid-cols-2  space-x-3'>
            <h1 className=' text-black font-semibold'>Brand</h1>
            <h1>{product.brand}.</h1>
           </div>
               }
           {product.size&&
           <div className='grid grid-cols-2  space-x-3'>
               <h1 className=' text-black font-semibold'>Size</h1>
               <h1>{product.size.map(item=>item)}.</h1>
           </div>
               }
               {product.color&&
           <div className='grid grid-cols-2  space-x-3'>
               <h1 className=' text-black font-semibold'>Color</h1>
               <h1>{product.color.map(item=>item)}.</h1>
           </div>
               }
            {product.material&&
           <div className='grid grid-cols-2  space-x-3'>
               <h1 className=' text-black font-semibold'>Material</h1>
               <h1>{product.material}.</h1>
           </div>
               }
               </div>
              }
              <h1 className='text-cyan-600 cursor-pointer ' onClick={()=>setShowMore(!showMore)}>{showMore? 'See less':'See more'}</h1>

       <h1 className='font-semibold mx-3  text-lg'>About This Item</h1>
       {product.details&&
       <div>
           {product.details.slice(slice).map((item,i)=>(
               <li key={i} className='text-[13px] sm:text-sm'>{item}</li>
               ))}
           {slice === 2 &&
        <h1 className='text-cyan-600 cursor-pointer ' onClick={()=>setSlice(product.details.lenght)}> See more</h1>
    }
        {slice === product.details.lenght  &&
        <h1 className='text-cyan-600 ' onClick={()=>setSlice(2)}> See less</h1>
    }          
       </div>
    }
     {product.note&&
     <h1 className='text-xs cursor-pointer' ><strong>Note:</strong> {product.note}</h1>
    }
    </div>
       
    </div>
       
     </div>

  {product.description &&
      <div className='lg:mx-10 mx-2'>
      <h1 className='text-xl my-2 lg:my-4 font-semibold text-orange-400'>Product Description</h1>
      <p className='text-[13px] px-4 lg:px-10'>
          {product.description}
      </p>
  </div>
}
   <div className='grid grid-cols-1 sm:grid-cols-5 xl:grid-cols-7 mx-2 border-t-[1px] gap-x-3 pt-3 mt-4'>
       <div className='xl:col-start-1 sm:col-span-2 xl:col-span-2 flex justify-start sm:justify-center'>
           <ReviewRating
           reviews={reviewFilter}
           reviewAverageRating={reviewAverageRating}
           ReactStars={ReactStars}
           filterArray={filterArray2}
           />
       </div>
    <div className=' col-start-1 sm:col-start-3 sm:col-span-3 xl:col-start-3 xl:mx-8 col-span-3 '>
        {state.itemReview !== null &&
            <ReviewModel 
            XIcon={XIcon} 
            item={state.itemReview} 
            ReactStars={ReactStars} 
            ViewGridIcon={ViewGridIcon} 
            moment={moment}
            closeReview={closeReview}
            reviewImages={reviewFilter}
            show={state.show}
            setTrue={setTrue}
            showReview={showReview}
            />
        }
        <h1 className=' font-semibold'>Review with Images</h1>

        <div className='flex space-x-4'>
            {reviewFilter.slice(0,4).map((item,i)=>(
                <div  className='my-2' key={i}>
                    {item.image !== "" &&
                     <img onClick={()=>showReview(item.id)} className='h-24 w-24' 
                     src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`} alt="" />
                    }
                </div>
            ))}
        </div>
            <h1 className='text-cyan-600 text-xs'>See all customer images</h1>
            <div>
                <h1>Read reviews that mention</h1>
                <div className=' flex flex-wrap'>
                {findMostFrequentWords(review).map((item,i)=>(
                    <span onClick={()=>findWord(item)} className=' cursor-pointer bg-slate-300 my-1 text-gray-700  border-b-[1px] border-gray-700 shadow-lg text-xs mx-2 py-1 px-3 ' key={i}>{item}</span>
                    ))}

                </div>
                
            </div>
            <div>
          
          <select onChange={(e)=>setOrder(e.target.value)} className=' ring-cyan-600 outline-none shadow-2xl ring-1 my-4 bg-slate-200 px-3 text-xs rounded-xl' name="" id="">
              <option value="Top">Top Reviews</option>
              <option value="Recents">Most Recent</option>

          </select>
            
            </div>
            <h1 className='font-semibold mb-3'>Reviews from the Users</h1>
            {state.word1 !== null &&
            <h1 className='text-xs font-semibold'>Showing 1-{reviews.length} of {reviewFilter.length} reviews with "{state.word1}".
             <span className='text-cyan-600 cursor-pointer' onClick={()=>clearFilter()}>Clear Filter</span></h1>
            }
            {reviews&&
  orderReviews(reviews).map((item,i)=>(
      <Review 
      key={i}
      avatar = {item.avatar}
      title={item.title}
      rating={item.rating}
      review={item.review}
      image={item.image}
      country = {item.country}
      date_added={item.date_added}
      like={item.like_review}
      name={item.name}
      moment={moment}
      ReactStars={ReactStars}
      />
      ))}
      </div>
      <div className=' col-start-1'>
          cvamask
      </div>
      
 
      </div>
  </div>
    </>
    )
}

export default Product;
