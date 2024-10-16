import React from 'react';

function ServiceCard({ title, description, price }) {
  return (
    <div className="service-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <span>${price}</span>
    </div>
  );
}

export default ServiceCard;
