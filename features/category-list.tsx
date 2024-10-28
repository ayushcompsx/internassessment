//@ts-nocheck

import React from 'react';
import Category from './category';

function CategoryList({ categories, setCategories }) {
  const updateCategory = (index, newCategory) => {
    const updatedCategories = categories.map((cat, i) =>
      i === index ? newCategory : cat
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <Category
          key={index}
          category={category}
          onUpdate={(newCategory) => updateCategory(index, newCategory)}
        />
      ))}
    </div>
  );
}

export default CategoryList;
