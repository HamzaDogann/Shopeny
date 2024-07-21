import React from 'react'

function AddComment() {
  return (
    <div className='add-comment-general-box'>
      <div className="product-titles-box">
        <p className="circle"></p>
        <p className="title">Bu ürüne bir yorum ekleyin</p>
      </div>
      <div className='warning-box'>
          <p>Bu ürüne bir yorum yapabilmek için önce bu ürünü satın almalısınız.</p>
      </div>
    </div>
  )
}

export default AddComment