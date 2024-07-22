import React from 'react'
import ProfilePhoto from "../../assets/images/PP.png";
import Okan from "../../assets/images/okan.png.jpg";
import HasanEmre from "../../assets/images/hasanemre.jpg";
import { Rating } from '@mui/material';
import { MdOutlineDateRange } from "react-icons/md";

const CommentUser = ({ name, limit }) => {
  const truncatedName = name.length > limit ? `${name.substring(0, limit)}...` : name;

  return <p className='comment-user'>{truncatedName}</p>;
};

function ProductComments() {
  return (
    <div className='product-comments-general-box'>
      <div className="product-titles-box">
        <p className="circle"></p>
        <p className="title">Bu ürüne yorumlar</p>
      </div>

      <div className='product-comments-box'>
        <div className='comment-box'>
          <div className='profile-image'>
            <img src={ProfilePhoto} alt="" />
          </div>
          <div className='comment-user-and-rating-info-box'>
            <CommentUser name="Hamza Ali Doğan" limit={12} />
            <div className='comment-rating-box'>
              <Rating name="read-only" value={5} readOnly size={"small"} />
            </div>
          </div>

          <p className='dividing-line'></p>
          <div className='user-comment'>
            <p>Şahane bir ürün. Ben ve ekibim bu ayrıcalıklı Macbook Pro için sağlam bir bütçe ayırmıştık.</p>
          </div>
          <div className='comment-date-box'>
            <MdOutlineDateRange style={{ fontSize: "20px" }} />
            <p>21.07.2024 - 14:00</p>
          </div>
        </div>

        <div className='comment-box'>
          <div className='profile-image'>
            <img src={Okan} alt="" />
          </div>
          <div className='comment-user-and-rating-info-box'>
            <CommentUser name="Okan Doğan" limit={12} />
            <div className='comment-rating-box'>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly size='small' />
            </div>
          </div>

          <p className='dividing-line'></p>
          <div className='user-comment'>
            <p>Lan olm 30k yaptım bu MacBook sayesinde vallah efso pc</p>
          </div>
          <div className='comment-date-box'>
            <MdOutlineDateRange style={{ fontSize: "20px" }} />
            <p>21.07.2024 - 14:00</p>
          </div>
        </div>

        <div className='comment-box'>
          <div className='profile-image'>
            <img src={HasanEmre} alt="" />
          </div>
          <div className='comment-user-and-rating-info-box'>
            <CommentUser name="Hasan Emre Doğan" limit={12} />
            <div className='comment-rating-box'>
            <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly size='small' />
            </div>
          </div>

          <p className='dividing-line'></p>
          <div className='user-comment'>
            <p>Ben bu bilgisayarı çok sevdim. Minecraft oynayabilirim </p>
          </div>
          <div className='comment-date-box'>
            <MdOutlineDateRange style={{ fontSize: "20px" }} />
            <p>21.07.2024 - 14:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductComments