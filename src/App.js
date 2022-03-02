import React,{useEffect,useRef} from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import { get_location } from "./actions/auth";
import { get_category_last, get_category_last2, get_category_last3, get_category_last4, get_category_last5, get_category_last6, get_category_last7 } from "./actions/products";
import Banner from "./components/products/Banner";
import ProductCard from "./components/products/ProductCard";
import CategoryLastView from "./components/products/CategoryLastView";
import ProductCard2 from "./components/products/ProductCard2";
import ProductCard3 from "./components/products/ProductCard3";
import { set_histories } from "./actions/order";
import History from "./components/products/History";
import { set_history_related } from "./actions/account";
import RelatedToHistory from "./components/products/RelatedToHistory";
function App() {
  const {category_trend , category_trend2,category_trend3,category_trend4,category_trend5,category_trend6,category_trend7} = useSelector(state=>state.product)
  const category = useSelector(state=>state.cart.category)
  const dispatch = useDispatch()
  const endRef = useRef()
  const token = localStorage.getItem('token');
  const treeId = JSON.parse(localStorage.getItem('category'))
  const {history,history_related} = useSelector(state => state.account)
   

  const handleScroll = (e) => {
    //console.log(e.target.documentElement.scrollTop);
    //console.log(window.innerHeight);
    //console.log(e.target.documentElement.scrollHeight);
    // console.log(
      //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
      // );
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
           
    if (token) {
      
    }  
        }
      };
      

  useEffect(() => {
    if(category){
      dispatch(get_category_last3(category))
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude =  position.coords.latitude
      const longitude =  position.coords.longitude
      dispatch(get_location(latitude,longitude))
      
    });
    //const trend = treeId[0]
    if(treeId){
      
      
      const categories2 = [8,11,17,15];
      
      const newArray = categories2.filter(function(f) { return f !== treeId[0] })
      const newArray2 = categories2.filter(function(f) { return f !== treeId[1]})
      const newArray3 = newArray2.filter(function(f) { return f !== treeId[2]})

      const random = Math.floor(Math.random() * newArray.length);
      
      const random2 = Math.floor(Math.random() * newArray2.length);
      dispatch(get_category_last(treeId.slice(-1)[0]))
      dispatch(get_category_last2(treeId.slice(-2)[0]))
      
      dispatch(get_category_last4(newArray3[random2]))
      
    } 
    dispatch(get_category_last5(2))
    dispatch(get_category_last6(3))
    dispatch(get_category_last7(1))
    
    
    if (token){
      setAuthToken(token);
      if(history.length === 0){
        dispatch(set_histories())
      }      
      if(history_related.length === 0){
        dispatch(set_history_related())
      }
    }
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    //window.addEventListener("scroll", handleScroll);
    //return () => window.removeEventListener('scroll',handleScroll)
  }, []);
  return (

<div className="bg-gray-200">
    <div className=" ">
      <div className="z-0  2xl:w-3/4 mx-auto">
      <Banner/>          
      </div>
        <div className=" 2xl:-mt-64 lg:-mt-32 2xl:w-3/4 2xl:mx-auto z-20 sm:px-10 xl:px-10 2xl:px-2 md:px-2 -mt-14 sm:-mt-20 pr-1 ">
      <ProductCard  category_trend3={category_trend3}/>
      <CategoryLastView category_trend={category_trend5} title={'Popular products in PC internationally'}/>
      {treeId&&
      <CategoryLastView category_trend={category_trend} title={'More items to consider'}/>
      
    }
      <ProductCard3/> 
      <CategoryLastView category_trend={category_trend6} title={'Popular products in Wireless internationally'}/>
      {category  &&
      <CategoryLastView category_trend={category_trend3} title={'Inspired by your shopping trends'}/>
    }
        {treeId&&
      <div ref={endRef}>
      <ProductCard2 category_trend={category_trend} category_trend2={category_trend2} category_trend4={category_trend4}/>
      <CategoryLastView category_trend={category_trend2} title={'More top picks for you'}/>
      <CategoryLastView category_trend={category_trend7} title={'Popular products in Beauty & Personal Care'}/>

      </div>
      }
      </div>
        {history !== [] ?
        <div className="bg-white mt-4 px-2 lg:px-6">
            <RelatedToHistory history={history} history_related={history_related} />
            <History history={history}/>
        </div>
        :
        <div className="pt-2 mt-5   bg-white pb-10">
          <h1 className="border-t-[1px] border-gray-400 pt-1 mt-8 px-2 sm:px-5 lg:px-10 text-xl text-gray-700">Your recently viewed items and featured recommendations</h1>
          <div className=" px-2 sm:px-5 lg:px-10 italic border-b-[1px] flex justify-between py-6 text-xs  border-gray-400">
          <h1>After viewing product detail pages, look here to find an easy way to navigate back to pages you are interested in</h1>
          <h1 className="text-cyan-600">› View or edit your browsing history</h1>
          </div>
        </div>
          }
        </div>
</div>
  );
}

export default App;
  