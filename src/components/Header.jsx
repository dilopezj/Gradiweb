import React from 'react';

import CardCreate from './CardCreate.jsx';

function Header({ handleAddCard }) {
  return (
    <nav className='Header py-2 text-white mb-4'>
      <div className='container text-center'>  
          <CardCreate handleAddCard={handleAddCard} /> 
      </div>
    </nav>
  );
}

export default Header;