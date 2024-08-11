import React, { useState } from 'react';
import { Rating, Skeleton } from '@mui/material';
import { MdOutlineDateRange } from "react-icons/md";
import truncateName from '../../shared/utils/truncateName';
import zIndex from '@mui/material/styles/zIndex';


function ProductComments({ comments }) {

  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

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
              {isImageLoading && (
                <Skeleton variant="circular" sx={{ zIndex: "2" }} width={120} height={120} />
              )}
              <img
                onLoad={handleImageLoad}
                src={comment.userProfilePhoto} alt=""
                style={{ display: isImageLoading ? 'none' : 'block' }}
              />
            </div>
            <div className='comment-user-and-rating-info-box'>
              <p className='comment-user'>{truncateName(comment.user, 12)}</p>
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
