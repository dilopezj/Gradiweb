import React from 'react';
const date = new Date();
const getYear = date.getFullYear();

function Footer() {
  return (
    <div className="container-fluid text-center text-white py-2 d-flex flex-column justify-content-center footer">
      <small>&copy;Gradiweb {getYear}</small>
    </div>
  );
}

export default Footer;