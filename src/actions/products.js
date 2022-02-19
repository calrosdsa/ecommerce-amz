import axios from "axios"
import { ADD_TO_CART, FILTER_PROPERTIES, GET_CATEGORIES, GET_CATEGORY, GET_CATEGORY_TREND, GET_CATEGORY_TREND2, GET_CATEGORY_TREND3, GET_CATEGORY_TREND4, GET_CATEGORY_TREND5, GET_CATEGORY_TREND6, GET_CATEGORY_TREND7, GET_PRODUCT, GET_PRODUCTS,
     GET_PRODUCT_FILTER, GET_REVIEWS, ITEM_LENGTH, POST_ERROR, QUANTITY, REMOVE_ALL_ITEMS, REMOVE_FROM_CART, REVIEW, SELECT_TOTAL, UPDATE_QUANTITY} from "./types"


export const get_reviews = (id,query) => async(dispatch) =>{
    const res = await axios.get(`http://localhost:8000/store/review/${id}/${query}`)
    dispatch({
        type:GET_REVIEWS,
        payload: res.data
    })
    
    if(query === ""){
    dispatch({
        type:REVIEW,
        payload:res.data
    })
    }
}

export const filter_properties = (parent_id) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category/${parent_id}/`)
    dispatch({
        type:FILTER_PROPERTIES,
        payload: res.data
    })
}

export const get_category_last4 = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category2/${treeId}/`)
    dispatch({
            type:GET_CATEGORY_TREND4,
            payload: res.data
        })
    }
export const get_category_last5 = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category3/${treeId}/`)
    dispatch({
            type:GET_CATEGORY_TREND5,
            payload: res.data
        })
    }
    export const get_category_last6 = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category3/${treeId}/`)
    dispatch({
            type:GET_CATEGORY_TREND6,
            payload: res.data
        })
    }
    export const get_category_last7 = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category3/${treeId}/`)
    dispatch({
            type:GET_CATEGORY_TREND7,
            payload: res.data
        })
    }
    
export const get_category_last3 = (treeId) =>async(dispatch)=>{
        const res = await axios.get(`http://localhost:8000/store/category2/${treeId}/`)
        dispatch({
            type:GET_CATEGORY_TREND3,
            payload: res.data
        })
    }

export const get_category_last2 = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category2/${treeId}/`)
    dispatch({
        type:GET_CATEGORY_TREND2,
        payload: res.data
    })
}

export const get_category_last = (treeId) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/category2/${treeId}/`)
    dispatch({
        type:GET_CATEGORY_TREND,
        payload: res.data
    })
}

export const get_product = (slug) =>async(dispatch) =>{
    const res = await axios.get(`http://localhost:8000/store/${slug}/`)
    dispatch({
        type:GET_PRODUCT,
        payload: res.data
    })
}

export const get_filter = (query)=>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/filter/${query}`)
    dispatch({
        type:GET_PRODUCT_FILTER,
        payload : res.data
    })
}
export const get_categories =() =>async(dispatch)=>{
    const res = await axios.get('http://localhost:8000/store/categories/')
    console.log('get_categoriea')
    dispatch({
        type:GET_CATEGORIES,
        payload:res.data
    })
}

export const get_category =(id) =>async(dispatch)=>{
    const res = await axios.get(`http://localhost:8000/store/categories/${id}/`)
    dispatch({
        type:GET_CATEGORY,
        payload:res.data
    })
}

export const get_products = ()=>async (dispatch)=>{

        const res = await axios.get('http://localhost:8000/store/')
        dispatch({
            type : GET_PRODUCTS,
            payload: res.data,
        });
}

export const add_to_cart = (product_qty,id,price,title,image,in_stock,features,slug,quantity,category) =>async(dispatch,getState)=>{
    dispatch({
        type:ADD_TO_CART,
        payload :{
            slug,
            title,
            price,
            id, 
            in_stock,
            features,
            image,
            quantity,
            product_qty,
            category,
        }
    })
    console.log(getState().cart)
    dispatch({
        type:SELECT_TOTAL,
        payload : price * quantity
    })
    dispatch({
        type:ITEM_LENGTH,
        payload: quantity
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart))

    
}
export const remove_from_cart =( product ) =>async(dispatch,getState)=>{
    dispatch({
    type: REMOVE_FROM_CART,
    payload :{
        price: product.price * product.quantity,
        id: product.id, 
        quantity: product.quantity 
    }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart))

}

export const update_quantity = (id,qnt) =>async(dispatch,getState)=>{
    dispatch({
        type:UPDATE_QUANTITY,
        payload: {
            id,qnt
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart))

}

export const remove_all_items = ()=> async(dispatch)=>{
    dispatch({
        type:REMOVE_ALL_ITEMS
    })
    localStorage.removeItem('cartItems')
}   