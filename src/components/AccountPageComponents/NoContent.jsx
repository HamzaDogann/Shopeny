import { Link } from "react-router-dom"
import { opacityAndTransformEffect } from "../../shared/animations/animations";
import { motion } from "framer-motion";

function NoContent({ image, description, buttonText, path, func, icon }) {
    return (
        <motion.div
            className='no-content-box'
            {...opacityAndTransformEffect('y', 15, 0.4)}
        >
            <div className="content-flex">
                <div className='image-box'>
                    <img src={image} alt="" />
                </div>
                <p>{description}</p>

                {func ? (
                    <button
                        onClick={() => func()} className="button">
                        {icon}
                        <span>{buttonText}</span>
                    </button>
                ) : (
                    <Link to={path} className="link-button">
                        {buttonText}
                    </Link>
                )}
            </div>
        </motion.div>
    );
}

export default NoContent;