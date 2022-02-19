import React,{useState,Fragment,useEffect,useReducer,useRef} from "react";
import { useNavigate } from "react-router-dom";
import { MenuAlt1Icon , UserIcon,ChevronRightIcon,ArrowDownIcon , GlobeAltIcon,
    SearchIcon, ShoppingCartIcon,XIcon,LocationMarkerIcon, ArrowLeftIcon } from '@heroicons/react/solid'
    import { useSelector,useDispatch } from "react-redux";
import { Link  } from "react-router-dom";
import {  Dialog, Transition } from '@headlessui/react';
import ReactCountryFlag from "react-country-flag"
import { get_categories, get_category, get_products } from "../../actions/products";

const initialState = {
  allProducts :[],
}
function reducer (state,action) {
  switch(action.type){
    case 'SET_PRODUCTS':
      return{
        ...state,
        allProducts: action.payload
      }

    default:
      return state;
  }
}

const Header  =()=>{
    const inputRef = useRef()
    const headerRef = useRef()
    const [ state,dispatch2 ] = useReducer(reducer , initialState)
    const items = useSelector(state=> state.cart.items)
    const{category, categories,products} = useSelector(state =>state.product)
    const [render,setRender] = useState(false)
    const {user,userLocation} = useSelector(state=>state.auth)
    const [wordEnter, setWordEnter] = useState('')
    const [suggestions,setSuggestions] = useState([])
    const [title,setTitle] = useState('')
    const [cursor,setCursor]=useState(-1)
    const [open, setOpen] = useState(false);
    const [showX,setShowX] = useState(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    const handleClick = (id) =>{
      setOpen(false)
      setRender(false)
      navigate(`/filter?categorie=${id}`)
      window.location.assign(`/filter?categorie=${id}`)
      var a = new Array();
      a = JSON.parse(localStorage.getItem('category')) || [];
      if(a.length > 2){
        a.shift();
      }
      const findx = a.find(x=> x === id)
      if(!findx){
        a.push( id)
      }
      localStorage.setItem('category', JSON.stringify(a));
    }
    
    const handleRef = (i)=>{
    }
    
    const handleInput = (e) =>{      
      if(state.allProducts.length === 0){
        console.log('allProducts.length')
      dispatch2({type:'SET_PRODUCTS',payload:products})
      }
      if (!inputRef.current.value){
        setShowX(false)
        setSuggestions([])
      }else{
        setShowX(true)
        const filter =  state.allProducts.filter(item=> item.title.toLowerCase().includes(e.toLowerCase())).slice(0,7)
        setSuggestions(filter)
      }
    }
    
    const handleOptions = (e) =>{
      setSuggestions([]);
      inputRef.current.value = "";
      setShowX(false)
      if(e === 'All'){
        dispatch2({type:'SET_PRODUCTS',payload:products})
      }else{
        const filterProduts = products.filter(item=>item.tree ===Number(e))
        dispatch2({type:'SET_PRODUCTS',payload:filterProduts})
        
      }
      inputRef.current.focus();
        //setAllProducts(filterProduts)
    }

    const suggestionRef = useRef()
    suggestionRef.current = [];
    const addRefs = (el) => {
      if (el && !suggestionRef.current.includes(el)) {
        suggestionRef.current.push(el);
      }
    };  
    
    const keyboardNavigation = (e)=>{
      if(e.key === "ArrowDown"){
        setCursor(c => (c <  suggestions.length -1 ? c + 1 : c))
        inputRef.current.value = suggestions[cursor + 1].title
      //  setWordEnter(suggestions[cursor].title)
        //  suggestionRef.current[cursor].textContent = 'hello'
      }
      
      if(e.key ==="ArrowUp"){
      setCursor(c=>(c > 0 ? c -1: 0));
      inputRef.current.value = suggestions[cursor -1 ].title
    //  console.log(inputRef.current.value)
  //    inputRef.current.value =  suggestions[cursor].title


    } 
    if(e.key ==="ArrowLeft"){
        setCursor(c=>(c > 0 ? c -1: 0));
      }
    
    if(e.key ==="Escape"){
      inputRef.current.value = ""
      setShowX(false)
      setSuggestions([])
      setCursor(-1)
      
    }
    if(e.key ==="Enter"){
      inputRef.current.value = suggestions[cursor].title
      setSuggestions([])
      navigate(`/product/${suggestions[cursor].slug}`)
      setCursor(-1)
    
    }
    }
      
      
      
    const handleClick1 =(id,titleC) =>{
      setTitle(titleC)

      dispatch(get_category(id))
      setRender(true)
    }
    const closeSidebar =()=>{
      setOpen(false)
      setRender(false)
    }
    
    useEffect(()=>{
      dispatch(get_categories())
      dispatch(get_products())
      const handleClick = (event) => {
      if (!headerRef.current.contains(event.target)) {
        setSuggestions([]);
        setShowX(false)
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  },[])

    return(

        <div ref={headerRef} className="bg-gray-800 lg:-mt-2">
        <div className="grid grid-cols-2 lg:grid-cols-12  items-center">
            <div className="flex col-start-1 lg:col-span-2 place-self-start items-center -mt-5">
                <MenuAlt1Icon onClick={()=>setOpen(!open)} className="h-6 lg:hidden w-6 ml-2 mx-2 text-gray-200"/>
       <Link to='/'>

    <svg  viewBox="163.5 263.1 285 85.8" className="h-[72px] mt-2 lg:ml-1 w-16 sm:w-20 sm:h-20  md:h-24  md:w-24 lg:h-[105px] lg:w-[105px]"
     xmlns="http://www.w3.org/2000/svg"><g clipRule="evenodd" fillRule="evenodd">
     <path d="m340.3 330.2c-16.5 12.2-40.5 18.7-61.2 18.7-29 0-55-10.7-74.8-28.5-1.5-1.4-.2-3.3 1.7-2.2 21.3 12.4 47.6 19.8 74.8 19.8 18.3 0 38.5-3.8 57.1-11.7 2.8-1.1 5.1 1.9 2.4 3.9z" fill="#f90"/>
     <path d="m347.2 322.3c-2.1-2.7-14-1.3-19.3-.6-1.6.2-1.9-1.2-.4-2.2 9.5-6.7 25-4.7 26.8-2.5s-.5 17.8-9.4 25.2c-1.4 1.1-2.7.5-2.1-1 2-5 6.5-16.1 4.4-18.9z"
     fill="#f90"/><path d="m328.2 272.5v-6.5c0-1 .7-1.6 1.6-1.6h29c.9 0 1.7.7 1.7 1.6v5.5c0 .9-.8 2.1-2.2 4.1l-15 21.4c5.6-.1 11.5.7 16.5 3.5 1.1.6 1.4 1.6 1.5 2.5v6.9c0 1-1 2.1-2.1 1.5-8.9-4.7-20.8-5.2-30.6.1-1 .5-2.1-.5-2.1-1.5v-6.6c0-1 0-2.8 1.1-4.4l17.4-24.9h-15.1c-.9 0-1.7-.7-1.7-1.6zm-105.7 40.3h-8.8c-.8-.1-1.5-.7-1.6-1.5v-45.2c0-.9.8-1.6 1.7-1.6h8.2c.9 0 1.5.7 1.6 1.5v5.9h.2c2.1-5.7 6.2-8.4 11.6-8.4 5.5 0 9 2.7 11.4 8.4 2.1-5.7 7-8.4 12.2-8.4 3.7 0 7.7 1.5 10.2 5 2.8 3.8 2.2 9.3 2.2 14.2v28.6c0 .9-.8 1.6-1.7 1.6h-8.7c-.9-.1-1.6-.8-1.6-1.6v-24c0-1.9.2-6.7-.2-8.5-.7-3-2.6-3.9-5.2-3.9-2.1 0-4.4 1.4-5.3 3.7s-.8 6.1-.8 8.7v24c0 .9-.8 1.6-1.7 1.6h-8.8c-.9-.1-1.6-.8-1.6-1.6v-24c0-5 .8-12.5-5.4-12.5-6.3 0-6.1 7.2-6.1 12.5v24c-.1.8-.8 1.5-1.8 1.5zm163-49.3c13.1 0 20.2 11.2 20.2 25.5 0 13.8-7.8 24.8-20.2 24.8-12.8 0-19.8-11.2-19.8-25.2-.1-14.1 7-25.1 19.8-25.1zm0 9.3c-6.5 0-6.9 8.9-6.9 14.4s-.1 17.3 6.8 17.3c6.8 0 7.2-9.5 7.2-15.3 0-3.8-.2-8.4-1.3-12-1-3.2-3-4.4-5.8-4.4zm37.1 40h-8.8c-.9-.1-1.6-.8-1.6-1.6v-45.3c.1-.8.8-1.5 1.7-1.5h8.2c.8 0 1.4.6 1.6 1.3v6.9h.2c2.5-6.2 5.9-9.1 12-9.1 3.9 0 7.8 1.4 10.3 5.3 2.3 3.6 2.3 9.7 2.3 14.1v28.5c-.1.8-.8 1.4-1.7 1.4h-8.8c-.8-.1-1.5-.7-1.6-1.4v-24.6c0-5 .6-12.2-5.5-12.2-2.1 0-4.1 1.4-5.1 3.6-1.2 2.8-1.4 5.5-1.4 8.6v24.4c-.1.9-.9 1.6-1.8 1.6zm-117.5-21.6c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.9 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8zm-124.4-21.5c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.8 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8z"/></g>
     </svg>
         </Link>
         <div className="hidden cursor-pointer lg:flex items-end -mr-12 truncate lg:ml-5 xl:ml-10">
          <LocationMarkerIcon className="text-gray-300 h-5 w-5 -mr-4"/>
          <div className="">
            <h1 className="text-gray-400 text-xs w-24 xl:w-32 2xl:w-full">Deliver to   {user.username? `${user.username} `:''}</h1>
            <h1 className="text-white font-bold  text-sm ml-5">{userLocation.country}</h1>
          </div>
         </div>

            </div>
            <div className="flex  items-center lg:col-start-10 col-span-3 justify-end lg:justify-between lg:mx-3
              lg:space-x-3  col-start-2  -mt-5">
              <div className="hidden xl:block xl:ml-3">
            <ReactCountryFlag countryCode={userLocation.country_code} svg  className='' style={{
              width: '1.5em',
              height: '1.5em',
            }}/>
            </div>
                <div className="flex items-center mx-2 lg:grid    lg:text-white">
                <Link to={'/login'} className="text-gray-100 text-xs flex items-center lg:hidden">
                 <h1> Identificate</h1>
                <UserIcon className="w-6 h-6 text-gray-200"/>
                </Link>
                <Link to='login' className=" text-xs hidden lg:block">  {user.username? `Hello ${user.username} `:'Hello ,Sign in'}</Link>
                <h1 className="font-bold text-sm hidden lg:block">Account & List</h1>
                </div >
                <div className="hidden lg:grid lg:text-white">
                <h1 className=" text-xs">Return</h1>
                <h1 className="font-bold text-sm">& Orders</h1>
                </div>
                <Link to='cart' className="relative">
                <ShoppingCartIcon className="h-6 w-6 lg:w-7 lg:h-7 lg:mr-4 relative text-gray-200 mr-1"/>
                <span className="text-yellow-400 absolute right-1 lg:right-2 -top-1 text-sm lg:text-base font-extrabold">{items}</span>
                </Link>

            </div>
            <div className="relative w-full px-2 sm:px-5  col-span-full lg:px-10 lg:ml-5 xl:ml-4  xl:px-0 lg:grid lg:-mt-24  lg:col-start-3
             lg:col-span-7 ">
              <select className="absolute w-16 left-2 line-clamp-2 truncate lg:w-14 sm:left-5 xl:w-24 h-9 lg:h-10 text-sm -mt-4 outline-none 
               xl:left-0 lg:left-10 rounded-l-md hover:ring-2
               hover:ring-yellow-500 bg-gray-300 z-10"
               onChange={(e)=> handleOptions(e.target.value)}
               name="" id="">
                 <option className="" value="All" >All</option>
                 {categories.map((item,i)=>(
                   <option key={i} value={item.id}>{item.title}</option>
                 ))}
              </select>
            <input ref={inputRef} onChange={(e)=>handleInput(e.target.value)} 
            onKeyDown={e=>keyboardNavigation(e)}
            className="flex flex-grow w-full pl-20 lg:pl-[60px]  truncate pr-20 text-sm sm:text-sm sm:pr-24  xl:pl-[100px] hover:ring-2 
            hover:ring-yellow-600 outline-none h-9 lg:h-10 rounded-lg  -mt-4" type="text"  />
            <SearchIcon className="lg:h-10 h-9 w-10  lg:w-12 -top-4  bg-yellow-300 right-[7px] sm:right-4
             lg:right-10 xl:right-0  p-2 xl:p-3 absolute rounded-lg"/>
            {showX &&
            <XIcon onClick={()=>{
              inputRef.current.value = '';
              inputRef.current.focus();
              setShowX(false)
              setSuggestions([])
              setCursor(-1)
            }} className="h-9 sm:h-10 w-12 cursor-pointer -top-4  right-10 sm:right-16 lg:right-20 xl:right-10  p-2 absolute rounded-lg"/>
          }
            <div className=" absolute w-5/6 xl:ml-24 top-[25px] lg:ml-10  z-10 bg-white">
              {suggestions.map((item,i)=>(
                <div key={i} ref={addRefs}  className={`${cursor === i && 'bg-gray-200'} line-clamp-1`}>
                  <h1 onClick={()=>{
                    setSuggestions([]);
                    inputRef.current.value = '';
                    navigate(`/product/${item.slug}`);
                }} className="text-sm font-semibold">
                {item.title}
                  </h1>
            </div>
              ))}
            </div>
        </div>
        </div>
      
            {token?
        <div className="py-1 text-sm sm:text-base flex items-center space-x-4 lg:bg-gray-700 lg:-mt-7 overflow-scroll lg:overflow-hidden whitespace-nowrap w-full">
            <div onClick={()=>setOpen(!open)} className="hidden lg:items-center lg:flex ">
            <MenuAlt1Icon className="h-7 cursor-pointer w-7 mx-1 text-gray-200"/>
              <h1 className=" cursor-pointer  text-gray-100 font-bold ">All</h1>
            </div>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Today's Deals</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Gift Cards</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Buy Again</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Find Gift</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Pet Supplies</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Amazon Live</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Coupons</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Video Games</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Subscribe & Save</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Customer Service</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Handmade</h1>



        </div>
        :
        <div className=" py-2 text-sm sm:text-base flex space-x-4 lg:bg-gray-700 lg:-mt-7 overflow-scroll lg:overflow-hidden whitespace-nowrap w-full">
           <div onClick={()=>setOpen(!open)} className="hidden lg:items-center lg:flex ">
            <MenuAlt1Icon  className="h-7 cursor-pointer w-7 mx-1 text-gray-200"/>
              <h1 className=" cursor-pointer  text-gray-100 font-bold ">All</h1>
            </div>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Today's Deals</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Customer Service</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Registry</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Gift Cards</h1>
            <h1 className=" cursor-pointer  text-gray-100 font-semibold ">Sell</h1>
        </div>
        }
            
            <Transition.Root show={open} as={Fragment}>
          <Dialog Dialog
            as='div'
            className='fixed inset-0 overflow-hidden z-10'
            open={true}
            onClose={setOpen}
          >
            <div className='absolute inset-0 overflow-hidden'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                >
                <Dialog.Overlay className='absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
              </Transition.Child>
              <div className='fixed inset-y-0  left-0 w-2/3 sm:w-3/6 md:w-2/5 xl:w-1/4 flex'>
                {render ||  
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-600 sm:duration-700'
                  enterFrom='-translate-x-full'
                  enterTo='-translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='-translate-x-0'
                  leaveTo='-translate-x-full'
                >
                  <div className='relative w-full'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute top-0 -right-12 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                       
                          <XIcon onClick={()=>setOpen(!open)} className=' h-8 w-8 text-white' aria-hidden='true' />
                      </div>
                    </Transition.Child>
                    <div className='h-full flex flex-col py-6 bg-white shadow-xl'>
                    <div className='flex space-x-4 items-center px-4 bg-gray-800 py-3 -mt-6  sm:px-6'>
                      <div className='text-xl  flex  font-bold text-white items-center'>
                         <UserIcon className="h-7 w-7 bg-gray-200 mx-2 rounded-full text-gray-800"/>
                          {user.username? `Hello ${user.username} `:'Hello ,Sign in'}
                     
                      </div>
                    
                    </div>
                    <div className='mt-0 relative flex-1 px-4 sm:px-6 md:overflow-y-scroll'>
                      {/* Replace with your content */}
                      <div className='flex py-3 border-b-2 border-gray-300 shadow-sm   flex-col justify-between '>
                        <h1 className="text-lg font-bold text-black ">Shop By Department</h1>
                             {categories.map(item=>(
                                 <div onClick={()=>handleClick1(item.id,item.title)} key={item.id} className="cursor-pointer flex my-1 justify-between items-center">
                                   <h1>{item.title}</h1>
                             <ChevronRightIcon className="h-4 w-4 text-gray-700 font-bold "/>
                               </div>
                             ))}
                    
                      </div>
                      <div className='flex py-3 border-b-2 space-y-3 border-gray-300 shadow-sm   flex-col justify-between '>
                        <h1 className="text-lg font-bold text-black ">Digital Content & Devices</h1>
                         <div className="flex justify-between items-center">
                             <h1>Amazon Music </h1>
                             <ChevronRightIcon className="h-4 w-4 text-gray-700 font-bold "/>
                         </div>
                         <div className="flex justify-between items-center">
                             <h1>Kindle E-renders & Books  </h1>
                             <ChevronRightIcon className="h-4 w-4 text-gray-700 font-bold "/>
                         </div>
                         <div className="flex justify-between items-center">
                             <h1>Appstore for Android</h1>
                             <ChevronRightIcon className="h-4 w-4 text-gray-700 font-bold "/>
                         </div>
                    
                      </div>

                      <div className='flex py-3 space-y-3 border-b-2 border-gray-300 shadow-sm   flex-col justify-between '>
                        <h1 className="text-lg font-bold text-black ">Programs & Features</h1>
                             <h1>Gift Cards </h1>
                             <h1>#FounditOnAmazon </h1>
                             <h1>Amazon Live</h1>
                             <h1>Internalization Shopping</h1>
                             <h1>Amazon Second Chance </h1>
                        
                      </div>


                      <div className='flex py-3 space-y-3 border-b-2 border-gray-300 shadow-sm   flex-col justify-between '>
                        <h1 className="text-lg font-bold text-black ">Help & Settings</h1>
                             <h1>Your Account </h1>
                             <div className="flex space-x-2 items-center">
                             <GlobeAltIcon className="h-4 w-4 text-gray-700 font-bold "/>
                             <h1>English</h1>
                         </div>
                         <h1>Customer Service</h1>
                         {user?
                         <h1>Sing Out</h1>
                         :
                         <h1>Sing In</h1>
                        }
                    
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                  </div>
              </Transition.Child>
                 }
               
              {render&&
              <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='-translate-x-full'
                  enterTo='-translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='-translate-x-0'
                  leaveTo='-translate-x-full'
                >
                  <div className='relative w-full'>
                  <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      
              <div className='absolute top-0 -right-12 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                  <XIcon onClick={()=>closeSidebar()} className=' h-8 w-8 text-white' aria-hidden='true' />
                   </div>
                      </Transition.Child>
                    <div className='h-full flex flex-col py-6 bg-white shadow-xl'>
                    <div className='flex space-x-4 items-center px-4 bg-gray-800 py-3 -mt-6  sm:px-6'>
                      <div className='text-xl  flex  font-bold text-white items-center'>
                         <UserIcon className="h-7 w-7 bg-gray-200 mx-2 rounded-full text-gray-800"/>
                          {user.username? `Hello ${user.username} `:'Hello ,Sign in'}
                     
                      </div>
                    
                    </div>
                    <div className=" px-7">
                      <div onClick={()=>{
                        setOpen(true)
                        setRender(false)
                      }
                    } className="flex border-b-[1px] hover:bg-gray-200 cursor-pointer border-gray-300 space-x-2 items-center  py-2">
                      <ArrowLeftIcon className="h-5 w-5 text-gray-700"/>
                      <h1 className=" font-bold text-gray-900 ">Main Menu</h1>
                      </div>
                      <h1 className="font-bold text-xl text-gray-900 mt-2">{title}</h1>
                      {category.map(item=>(
                        <Link onClick={()=>{
                          setOpen(false)
                          setRender(false)
                          var a = new Array();
                          a = JSON.parse(localStorage.getItem('category')) || [];
                          if(a.length > 2){
                            a.shift();
                          }
                          const findx = a.find(x=> x === item.id)
                          if(!findx){
                            a.push( item.id)
                          }
                          localStorage.setItem('category', JSON.stringify(a));
                        }} to={`/filter?categorie=${item.id}`} 
                        state={{category:item.title,category_id:item.id,parent:item.parent_title}}
                        className="text-lg mt-1  py-3 cursor-pointer hover:bg-gray-200" key={item.title}>
                          <h1>{item.title}</h1>
                        </Link>
                      ))}
                    </div>
                  </div>
                  </div>
              </Transition.Child>

                 }
          </div>
          </div>
          </Dialog>
          </Transition.Root>
       
                    
         </div>
    )
}
export default Header;