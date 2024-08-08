// Animations.js



export const opacityAndTransformEffect = (direction = 'y', distance = 20, duration = 0.8) => {
    const transformProps = {
      x: 0,
      y: 0,
    };
    transformProps[direction] = distance;
  
    return {
      initial: { opacity: 0, ...transformProps },
      animate: { opacity: 1, [direction]: 0 },
      transition: { duration }
    };
  };
  

export const createContainerVariants = (delayChildren = 0.3, staggerChildren = 0.2) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren,
        staggerChildren
      }
    }
  });
  
  export const createItemVariants = (y = 20, opacity = 0) => ({
    hidden: { y, opacity },
    visible: {
      y: 0,
      opacity: 1
    }
  });
