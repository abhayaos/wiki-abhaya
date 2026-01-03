import React from 'react';

const Skeleton = ({ type = 'text', count = 1 }) => {
  const skeletons = [];
  
  for (let i = 0; i < count; i++) {
    if (type === 'text') {
      skeletons.push(
        <div key={i} className="skeleton" style={{ height: '16px', marginBottom: '10px', width: '100%' }}></div>
      );
    } else if (type === 'heading') {
      skeletons.push(
        <div key={i} className="skeleton" style={{ height: '24px', marginBottom: '15px', width: '60%' }}></div>
      );
    } else if (type === 'paragraph') {
      skeletons.push(
        <div key={i} className="skeleton-paragraph">
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '100%' }}></div>
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '100%' }}></div>
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '80%' }}></div>
        </div>
      );
    } else if (type === 'list') {
      skeletons.push(
        <div key={i} className="skeleton-list">
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '90%' }}></div>
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '85%' }}></div>
          <div className="skeleton" style={{ height: '16px', marginBottom: '8px', width: '95%' }}></div>
        </div>
      );
    }
  }
  
  return <div className="skeleton-wrapper">{skeletons}</div>;
};

export default Skeleton;