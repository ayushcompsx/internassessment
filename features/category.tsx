//@ts-nocheck

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Requirement from './requirement';

function Category({ category, onUpdate }) {
  const handleNameChange = (e) => {
    onUpdate({ ...category, name: e.target.value });
  };

  const addRequirement = () => {
    onUpdate({ ...category, requirements: [...category.requirements, ''] });
  };

  const updateRequirement = (index, newRequirement) => {
    const updatedRequirements = category.requirements.map((req, i) =>
      i === index ? newRequirement : req
    );
    onUpdate({ ...category, requirements: updatedRequirements });
  };

  return (
    <div className="category">
      <Input
        value={category.name}
        onChange={handleNameChange}
        placeholder="Category Name"
      />
      <Button onClick={addRequirement}>Add Requirement</Button>
      {category.requirements.map((req, index) => (
        <Requirement
          key={index}
          requirement={req}
          onUpdate={(newReq) => updateRequirement(index, newReq)}
        />
      ))}
    </div>
  );
}

export default Category;
