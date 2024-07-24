import React, { useState, useCallback, memo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { questionsAnswers } from '../../../constants/FAQ';

import './FAQ.scss';

const FAQ = memo(() => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setActiveIndex(index === activeIndex ? null : index);
  }, [activeIndex]);

  return (
    <div className='faq-box'>
      <h2>Sıkça Sorulan Sorular</h2>
      <div className='questions'>
        {questionsAnswers.map((qa, index) => (
          <div key={index} className='question-item'>
            <div
              className='question-header'
              onClick={() => handleToggle(index)}
            >
              <h3>{qa.question}</h3>
              <span className={`icon ${activeIndex === index ? 'open' : ''}`}>
                <IoIosArrowDown />
              </span>
            </div>
            <div className={`answer ${activeIndex === index ? 'open' : ''}`}>
              <p>{qa.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FAQ;
