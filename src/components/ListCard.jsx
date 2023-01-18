import React from 'react';

import Table from 'react-bootstrap/Table';
import ItemCard from './ItemCard';

function ListCard({ cards, handleCardChecked, handleCardRemove }) {

  return (
    <div className="container w-100 mb-4" style={cards.length > 0 ? {} : { display: 'none' }} >
          <Table striped bordered hover responsive variant="dark" className='ListCard'>
            <thead>
              <tr>
                <th>Credit Card Number</th>
                <th>Card Holder Name</th>
                <th>Valid Thru</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cards.length > 0
                ? cards.map(card => <ItemCard key={card.id} card={card} handleCardChecked={handleCardChecked} handleCardRemove={handleCardRemove} />)
                : <tr>
                    <td colSpan={5}>
                      <div className="container d-flex flex-column w-50 text-center justify-content-center">
                        <h4 className='py-3 rounded-3 text-white'>All cards are complete!</h4>
                      </div>
                    </td>
                  </tr>
              }
            </tbody>
          </Table>
    </div>
  );
}

export default ListCard;