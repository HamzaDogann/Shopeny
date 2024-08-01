import { IoMdArrowRoundBack } from "react-icons/io";
function GoBackStepButton({ onBack }) {
    return (
        <button className='back-step-button' onClick={onBack}>
            <IoMdArrowRoundBack className='icon' />
            <span>Önceki Adım</span>
        </button>
    )
}

export default GoBackStepButton