import { Link } from "react-router-dom"

function NoContent({ image, description, buttonText, path, func, icon }) {
    return (
        <div className='no-content-box'>
            <div className="content-flex" >
                <div className='image-box'>
                    <img src={image} alt="" />
                </div>
                <p>{description}</p>

                {func ?
                    <button onClick={() => func()} className="button">
                        {icon}
                        <span>{buttonText}</span>
                    </button>
                    :
                    <Link to={path}>
                        {buttonText}
                    </Link>
                }
            </div>
        </div>
    )
}

export default NoContent