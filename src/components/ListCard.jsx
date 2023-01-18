import React from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';

import Table from 'react-bootstrap/Table';
import ItemCard from './ItemCard';

function ListCard({ cards, handleCardChecked, handleCardRemove }) {
  const [autoAnimateList] = useAutoAnimate();

  return (
    <div className="container w-100 mb-4">
      <div className="card">
        <div className="card-header text-center">
          <h2 style={cards.length > 0 ? {} : { fontStyle: 'italic' }} >{cards.length > 0 ? `Cards List` : 'Your card list is empty'}</h2>
        </div>
        <div className="card-body">
          <Table striped bordered hover responsive variant="dark" className='ListCard'  ref={autoAnimateList}>
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
                        <h4 className='py-3 rounded-3 text-white' style={{ backgroundColor: 'var(--accent-color)' }}>All cards are complete!</h4>
                      </div>
                    </td>
                  </tr>
              }
            </tbody>
          </Table>         
        </div>
      </div>
    </div>
  );
}

export default ListCard;