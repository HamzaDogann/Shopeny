import React, { useState, useCallback, memo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { questionsAnswers } from '../../../constants/FAQ';
import { motion } from 'framer-motion';

import './FAQ.scss';
import { opacityAndTransformEffect } from '../../../shared/animations/animations';

const FAQ = memo(() => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setActiveIndex(index === activeIndex ? null : index);
  }, [activeIndex]);

  return (

    <motion.div {...opacityAndTransformEffect('y', 23, 0.5)} className='faq-box'>
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
    </motion.div>
  );
});

export default FAQ;
