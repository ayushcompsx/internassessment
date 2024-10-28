//@ts-nocheck
import React from 'react';
import { Input } from '@/components/ui/input';

function Requirement({ requirement, onUpdate }) {
  return (
    <Input
      value={requirement}
      onChange={(e) => onUpdate(e.target.value)}
      placeholder="Requirement Name"
    />
  );
}

export default Requirement;
