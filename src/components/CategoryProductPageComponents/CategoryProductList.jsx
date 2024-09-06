import React, { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductCard from "../../shared/components/ProductCard/ProductCard.jsx";
import { AiFillProduct } from "react-icons/ai";
import { categoryTranslation } from '../../constants/categories.js';
import { motion } from 'framer-motion';
import { opacityAndTransformEffect } from '../../shared/animations/animations.js';

const ProductList = memo(({ products, loading, error, filters, ClearFilters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);


    const translatedProducts = products.map(product => ({
        ...product,
        categoryName: Object.keys(categoryTranslation).find(key => categoryTranslation[key] === product.categoryName) || product.categoryName
    }));

    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setProductsPerPage(5);
            } else {
                setProductsPerPage(12);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        setCurrentPage(1);
    }, [location, filters]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = translatedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);

        window.scrollTo({
            top: 180,
            behavior: 'smooth',
        });
    };

    const totalPages = Math.ceil(translatedProducts.length / productsPerPage);


    if (error) {
        return <div>Beklenmedik bir hata meydana geldi, {error.message}</div>;
    }

    return (
        <div>
            <motion.p {...opacityAndTransformEffect('y', 45, 0.4)} className='total-product-number'>
                <AiFillProduct className='icon' />
                <span>Toplam  <strong>{products.length}</strong> Ürün Listeleniyor</span>
            </motion.p>

            <div className="products-box">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                            <ProductCard key={product.Id} product={product} loading={loading} />
                    ))
                ) : (
                    <div className='no-products-box'>
                        <p>Filtreleme işleminize göre bir ürün bulunamadı.</p>
                        <button className='clear-filter' onClick={ClearFilters}>Filtreyi Temizle</button>
                    </div>
                )}
            </div>
            {currentProducts.length > 0 && totalPages > 1 && (
                <div className='pagination'>
                    <Stack spacing={2} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            size="large"
                            onChange={handlePageChange}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{ previous: NavigateBeforeIcon, next: NavigateNextIcon }}
                                    {...item}
                                />
                            )}
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
});

export default ProductList;