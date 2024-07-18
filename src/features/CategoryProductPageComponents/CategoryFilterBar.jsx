import React from 'react';
import Checkbox from '../../shared/helpers/Checkbox';

function CategoryFilterBar() {
  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Huawei', 'Xiaomi'];

  return (
    <div className="filter-box">
      <div className="brands-box">
        <p>Markalar</p>
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>
              <Checkbox id={`brand-${index}`} label={brand} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryFilterBar;