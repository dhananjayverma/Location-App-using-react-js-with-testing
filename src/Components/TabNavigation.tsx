import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Main/Home';
import Map from '../Main/Map';
import ContextProvider from '../ContextApi/ContextProvider';

const TabNavigator: React.FC = () => {
  return (
    <ContextProvider>
      <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/map" component={Map} />
       </Routes>
    </ContextProvider>
  );
};

export default TabNavigator;
