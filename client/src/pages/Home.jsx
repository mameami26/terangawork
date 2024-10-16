import React from 'react';
import ServiceCard from '../components/ServiceCard';

function HomePage() {
  return (
    <div>
      <h1>Welcome to TérangaWork</h1>
      <ServiceCard title="Plumbing" description="Fix your pipes" price={100} />
    </div>
  );
}

export default HomePage;
