import React, { useId } from 'react';

function ItemCard({ card, handleCardChecked, handleCardRemove }) {
  const id = useId();

  return (<tr className='ItemCard text-center'>
            <td>**** **** **** {card.num04}</td>
            <td>{card.text}</td>
            <td>{card.month}/{card.year}</td>
            <td><button className='btn-close btn-close-white align-self-center' onClick={() => handleCardRemove(card.id)}></button></td>
          </tr>
  );
}

export default ItemCard;