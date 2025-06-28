import React from 'react';
import Navbar from '../components/Navbar';
import BookLibrary from '../components/BookLibrary';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <BookLibrary />
      </div>
    </div>
  );
};

export default Dashboard;
