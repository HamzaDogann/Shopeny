import React from 'react';
import { Rating } from '@mui/material';
import { MdOutlineDateRange } from "react-icons/md";

const CommentUser = ({ name, limit }) => {
  const truncatedName = name.length > limit ? `${name.substring(0, limit)}...` : name;
  return <p className='comment-user'>{truncatedName}</p>;
};

function ProductComments({ comments }) {
  return (
    <div className='product-comments-general-box'>
      <div className="product-titles-box">
        <p className="circle"></p>
        <p className="title">Bu ürüne yorumlar</p>
      </div>

      <div className='product-comments-box'>
        {comments.map((comment, index) => (
          <div key={index} className='comment-box'>
            <div className='profile-image'>
              <img src={comment.userProfilePhoto} alt="" />
            </div>
            <div className='comment-user-and-rating-info-box'>
              <CommentUser name={comment.user} limit={12} />
              <div className='comment-rating-box'>
                <Rating name="read-only" value={comment.starRating} readOnly size={"small"} />
              </div>
            </div>

            <p className='dividing-line'></p>
            <div className='user-comment'>
              <p>{comment.comment}</p>
            </div>
            <div className='comment-date-box'>
              <MdOutlineDateRange style={{ fontSize: "20px" }} />
              <p>{comment.createdDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductComments;
