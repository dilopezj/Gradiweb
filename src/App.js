
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import './App.css';
import Header from './components/Header';
import ListCard from './components/ListCard';

function App() {
  const [cards, setCards] = useState([]);
  const [preventEmptySave, setPreventEmptySave] = useState(true);
  const [autoAnimate] = useAutoAnimate();

  const saveCards = () => {
    if (cards.length < 1 && preventEmptySave) { return; }
    setPreventEmptySave(true);
    localStorage.setItem('cards', JSON.stringify(cards));
  };

  const handleAddCard = card => {
    setCards(prevCards => [card, ...prevCards]);
  };


  const handleCardRemove = id => {
    setPreventEmptySave(false);
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('cards')) || []);
  }, []);

  useEffect(() => {
    saveCards();
  }, [cards]);

  return (
    <div className="App">
      <div className='App-body'>
        <Header handleAddCard={handleAddCard} />
        <ListCard cards={cards}  handleCardRemove={handleCardRemove} />
      </div>
    </div>
  );
}

export default App;
