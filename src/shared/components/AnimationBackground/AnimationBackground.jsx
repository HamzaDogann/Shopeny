
import "./AnimationBackground.scss";

const AnimationBackground = () => {
    return (
        <div className='main-background'>
            <div className='main-background inset-0 justify-center'>
                <div className='bg-shape1 bg-teal opacity-50 bg-blur'></div>
                <div className='bg-shape2 bg-primary opacity-50 bg-blur'></div>
                <div className='bg-shape1 bg-purple opacity-50 bg-blur'></div>
                <div></div>
            </div>
        </div>
    )
}

export default AnimationBackground