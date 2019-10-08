import React from 'react';

function LogsModal({handlePopUp, post}) {
  return(
    <div className='log__modal' onClick={handlePopUp}> 
      <svg>
        
      </svg>
      <img src={post.imgUrl}></img>
      <div className='log__intro'>
        <p claaName='log__title'>{post.title}</p>
        <p claaName='log__content'>{post.content}</p>
      </div>
    </div>
  )
}

export default LogsModal;
