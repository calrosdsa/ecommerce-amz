import { Link } from "react-router-dom";

function History({history}) {

  return <div className='bg-white mb-10 px-2 lg:px-10 md:overflow-hidden overflow-scroll'>
    <div className='flex space-x-2 justify-between items-center'>
    <h1 className='text-lg sm:text-xl font-semibold '>Your Browsing History</h1>
    <h1 className='text-sm w-32 sm:w-40 text-cyan-600'>View or edit your browsing history</h1>
    </div>
    <div className='flex my-2'>
      {history.map((item,i)=>(
        <Link to={`/product/${item.slug}`} key={i} className=' min-w-[140px]'>
           <img className='w-32 h-32 md:h-44 md:w-44 col-start-1 object-contain' 
           src={`https://res.cloudinary.com/mer/image/upload/v1/${item.image}`}  alt="" />
        </Link>
      ))}
    </div>

  </div>;
}

export default History;
