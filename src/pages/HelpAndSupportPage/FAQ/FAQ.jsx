import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.scss';
import { questionsAnswers } from '../../../constants/FAQ';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className='answer'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{qa.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
