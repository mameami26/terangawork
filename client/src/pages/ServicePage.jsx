import React from 'react';
import ServiceCard from '../components/ServiceCard';

function ServicePage() {
  const services = [
    { title: 'Plumbing', description: 'Fix pipes', price: 100 },
    { title: 'Electrical', description: 'Fix electrical issues', price: 150 },
  ];

  return (
    <div>
      <h1>Available Services</h1>
      {services.map(service => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
}

export default ServicePage;
