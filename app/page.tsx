//@ts-nocheck

'use client';
import { Button } from '@/components/ui/button';
import CategoryList from '@/features/category-list';
import * as React from 'react';
export default function Home() {
  const [categories, setCategories] = React.useState([]);

  const addCategory = () => {
    setCategories([...categories, { name: '', requirements: [] }]);
  };

  const handlePrintJSON = () => {
    console.log(JSON.stringify(categories, null, 2));
  };

  return (
    <div className="app-container flex gap-4 p-4">
      <div className="left-pane">
        <Button onClick={addCategory}>Add Category</Button>
      </div>
      <div className="right-pane">
        <CategoryList categories={categories} setCategories={setCategories} />
        <Button onClick={handlePrintJSON}>Print JSON</Button>
      </div>
    </div>
  );
}
