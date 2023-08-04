import React from 'react';
import './Hero.css';
import {Link} from 'react-router-dom'
import { Button } from '@mui/material';
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Task Management</h1>
        <p>Manage your tasks efficiently with our task management application.</p>
        <Link to='/task'><Button className='task-btn'>Start With Us</Button></Link>
      </div>
    </section>
  );
};

export default HeroSection;
