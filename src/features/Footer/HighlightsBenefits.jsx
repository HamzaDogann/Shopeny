import { benefits } from "../../constants/Benefits";

function HighlightsBenefits() {
  return (
    <div className='highlights-benefits-box'>
      {benefits.map((benefit, index) => (
        <div className='benefit-item' key={index}>
          <img className='benefit-image' src={benefit.img} alt={benefit.title} />
          <div className='benefit-texts'>
            <span>{benefit.title}</span>
            <p>{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HighlightsBenefits;