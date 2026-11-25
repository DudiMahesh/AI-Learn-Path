import React from 'react';
import LearningPathItem from './LearningPathItem';

const LearningPath = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-6 max-w-4xl">
      {items.map((item, idx) => (
        <LearningPathItem 
          key={item.id || idx} 
          item={item} 
          isLast={idx === items.length - 1} 
        />
      ))}
    </div>
  );
};

export default LearningPath;
