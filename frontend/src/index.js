import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Navbar from './components/Navbar';
import MealSection from './components/MealSection';
import Header from './components/Header'
import SearchBar from './components/SearchBar'

ReactDOM.render(
  <React.StrictMode>
    {/* TODO: Search Component */}
    <SearchBar />

    {/* TODO: Header Component */}
    <Header locationName='USC Village Dining Hall' />
    {/* TODO: MealSection Component */}
        {/* TODO: MealItem Component */}
    <MealSection stationName='Plant Based' />
    <MealSection stationName='Flexiterian' />
    {/* TODO: Navbar Component */}
    <Navbar />
  </React.StrictMode>,
  document.getElementById('root')
);

