import React from 'react'

function AutoComplete({title,isHightLighted}) {
    return (
        <div className={`${isHightLighted === true && 'bg-gray-200'}`}>
        <h1 className=' line-clamp-1'>{title}</h1>
    </div>
  )
}

export default AutoComplete