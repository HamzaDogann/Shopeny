import React from 'react';
import { motion } from 'framer-motion';
import ShopenyBag from "../../assets/logo/ShopenyBag.png";
import "./PreLoader.scss";

const preloaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

function PreLoader() {
    return (
        <motion.div
            className="loader-box"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={preloaderVariants}
            transition={{ duration: 0.9, ease: "easeInOut" }}
        >
            <div className="loader"></div>
            <img src={ShopenyBag} alt="" />
        </motion.div>
    );
}

export default PreLoader;