import { Link } from 'react-router-dom';
function CategoryLastView({category_trend,title}) {
  
  return <div className='mt-3 bg-white p-2 overflow-x-scroll'>
      <h1  className='text-xl font-semibold' >{title}</h1>
      <div className='flex space-x-5 my-1 '>
      {category_trend.map((item,i)=>(
          <div className='min-w-[100px] lg:min-w-[180px]  flex ' key={i}>
           <Link className='flex space-x-4' to={`/product/${item.slug}`}>
           <img className='w-32 h-32 md:h-44 md:w-44 col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
           </Link>
          </div>
      ))}
   
      </div>
  </div>;
}

export default CategoryLastView;
