import React, { useState, useEffect, memo } from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


// Örnek ürün verileri
const products = [
    { id: 1, name: 'Ürün Adı 1' },
    { id: 2, name: 'Ürün Adı 2' },
    { id: 3, name: 'Ürün Adı 3' },
    { id: 4, name: 'Ürün Adı 4' },
    { id: 5, name: 'Ürün Adı 5' },
    { id: 6, name: 'Ürün Adı 6' },
    { id: 7, name: 'Ürün Adı 7' },
    { id: 8, name: 'Ürün Adı 8' },
    { id: 9, name: 'Ürün Adı 9' },
    { id: 10, name: 'Ürün Adı 10' },
    { id: 11, name: 'Ürün Adı 11' },
    { id: 12, name: 'Ürün Adı 12' },
    { id: 13, name: 'Ürün Adı 13' },
    { id: 14, name: 'Ürün Adı 14' },
    { id: 15, name: 'Ürün Adı 15' },
    { id: 16, name: 'Ürün Adı 16' },
    { id: 17, name: 'Ürün Adı 17' },
    { id: 18, name: 'Ürün Adı 18' },
    { id: 19, name: 'Ürün Adı 19' },
    { id: 20, name: 'Ürün Adı 20' },
    { id: 21, name: 'Ürün Adı 21' },
    { id: 22, name: 'Ürün Adı 22' },
    { id: 23, name: 'Ürün Adı 23' },
    { id: 24, name: 'Ürün Adı 24' },
    { id: 25, name: 'Ürün Adı 25' },
];

const ProductList = memo(() => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12);

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
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const totalPages = Math.ceil(products.length / productsPerPage);

    console.log("Component Rendered");

    return (
        <div>
            <div className="products-box">
                {currentProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.name}</h2>
                    
                    </div>
                ))}
            </div>
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
        </div>
    );
});

export default ProductList;
