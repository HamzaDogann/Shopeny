import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { validCategories } from "../../constants/categories"

function CategoryProducts() {

  const { categoryName } = useParams();

  if (!validCategories.includes(categoryName)) {
    return <Navigate to="/" />;
  }

  return (
    <div>Kategori verisine göre listelenecek ürünler...</div>
  )
}

export default CategoryProducts