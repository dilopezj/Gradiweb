import CryptoJS from "crypto-js";
import React, { useId, useMemo, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import ImgChip from '../assets/chip.png';

import { v4 as genUUID4 } from 'uuid';
import './CardCreate.css';

function CardCreate({ handleAddCard }) {
  const id = useId();

  const [currentText, setCurrentText] = useState('');
  const [currentNumber01, setCurrentNumber01] = useState('');
  const [currentNumber02, setCurrentNumber02] = useState('');
  const [currentNumber03, setCurrentNumber03] = useState('');
  const [currentNumber04, setCurrentNumber04] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentCvv, setCurrentCvv] = useState('');
  const [hover, setHover] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ variant: '', text: '' });

  const secretPass = "XkhZG4fW2t2W";
  const [encrptedData, setEncrptedData] = useState('');

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(currentCvv),
        secretPass
      ).toString();

    setEncrptedData(data);
  };

  const newCard = useMemo(() => {
    return {
      id: genUUID4(),
      text: currentText,
      num01: currentNumber01,
      num02: currentNumber02,
      num03: currentNumber03,
      num04: currentNumber04,
      month: currentMonth,
      year: currentYear,
      cvv: encrptedData,
      completed: false
    };
  });

  const handleClick = () => {
    if (!currentCvv) return;
     encryptData();
  };

  const handleSubmit = e => {
    encryptData()
    e.preventDefault(); 
    if (newCard) {
      handleAddCard(newCard);
      setShowMessage(true);
      setMessage({ variant: 'success', text: 'Data saved successfully' });
      setCurrentText('');
      setCurrentNumber01('');
      setCurrentNumber02('');
      setCurrentNumber03('');
      setCurrentNumber04('');
      setCurrentMonth('');
      setCurrentYear('');
      setCurrentCvv('');
      setEncrptedData('');
    } else {
      setShowMessage(true);
      setMessage({ variant: 'alert', text: 'You must fill in all the fields' });
    }
  };

  let alertDiv = '';
  if (showMessage) {
    alertDiv = <Alert variant={message.variant} onClose={() => setShowMessage(false)} dismissible ><p> {message.text} </p> </Alert>;
  }

  return (
    <div className="container container-sm " id='create-card'>
      {alertDiv}
      <div className='card-container'>
        <div id='front' className={hover ? 'front roteFront' : 'front'}  >
          <div className='image-logo'>
            <img className='mb-2' src={ImgChip} alt="Chip png" />
            <span className='text-bold'>BANK NAME</span>
          </div>
          <div className='text-card-number'> {currentNumber01} {currentNumber02} {currentNumber03} {currentNumber04} </div>
          <div className='flexbox'>
            <div className='box'>
              <span className='small'>Card Holder Name </span>
              <div className='text-card-name'>{currentText}</div>
            </div>
            <div className='box'>
              <span className='small'>Valid Thru </span>
              <div className='valid'>
                <span className='valid-month'>{currentMonth}</span> /
                <span className='valid-year'>{currentYear}</span>
              </div>
            </div>
          </div>
        </div>
        <div id='back' className={hover ? 'back roteBack' : 'back'}  >
          <div className='stripe'></div>
          <div className='box'>
            <span className='small'>cvv</span>
            <div className='valid-cvv'>{currentCvv}</div>
            <span className='text-bold'>BANK NAME</span>
          </div>
        </div>
      </div>
      <form className='form-control  mt-121  border-danger' onSubmit={e => handleSubmit(e)}>
        <div className='form-floating text-start border-primary mt-2'>
          <Container>
            <Row>
              <Col xs lg="3"><label className='form-label mt-3' htmlFor={`${id}-numberCard`}>Credit Card Number</label></Col>
            </Row>
            <Row xs={1} md={4} lg={4}>
              <Col><input className='form-control number' value={currentNumber01} onChange={e => { setCurrentNumber01(e.target.value); }} type='text' id={`${id}-number01`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" ></input></Col>
              <Col><input className='form-control number' value={currentNumber02} onChange={e => { setCurrentNumber02(e.target.value); }} type='text' id={`${id}-number02`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" ></input></Col>
              <Col><input className='form-control number' value={currentNumber03} onChange={e => { setCurrentNumber03(e.target.value); }} type='text' id={`${id}-number03`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" ></input></Col>
              <Col><input className='form-control number' value={currentNumber04} onChange={e => { setCurrentNumber04(e.target.value); }} type='text' id={`${id}-number04`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" ></input></Col>
            </Row>
            <Row>
              <Col><label className='form-label mt-3' htmlFor={`${id}-name`}>Card Holder Name</label></Col>
            </Row>
            <Row>
              <Col><input className='form-control' value={currentText} onChange={e => { setCurrentText(e.target.value); }} type='text' id={`${id}-name`} required autoComplete='off' placeholder='Jhon Doe' maxLength={60} pattern="[a-z A-Z À-ÿ]*" ></input></Col>
            </Row>
            <Row>
              <Col><label className='form-label mt-3' htmlFor={`${id}-valid`}>Valid Thru</label></Col>
            </Row>
            <Row xs={2} md={4} lg={4}>
              <Col> <select className='form-control form-select' value={currentMonth} onChange={e => { setCurrentMonth(e.target.value); }} id={`${id}-month`} required autoComplete='off'>
                <option value={''}></option>
                <option value={'01'}>January</option>
                <option value={'02'}>February</option>
                <option value={'03'}>March</option>
                <option value={'04'}>April</option>
                <option value={'05'}>May</option>
                <option value={'06'}>June</option>
                <option value={'07'}>July</option>
                <option value={'08'}>August</option>
                <option value={'09'}>September</option>
                <option value={'10'}>October</option>
                <option value={'11'}>November</option>
                <option value={'12'}>December</option>
              </select>
              </Col>
              <Col><select className='form-control form-select' value={currentYear} onChange={e => { setCurrentYear(e.target.value); }} id={`${id}-year`} required autoComplete='off'>
                <option value={''}></option>
                <option value={'23'}>2023</option>
                <option value={'24'}>2024</option>
                <option value={'25'}>2025</option>
                <option value={'26'}>2026</option>
                <option value={'27'}>2027</option>
                <option value={'28'}>2028</option>
                <option value={'29'}>2029</option>
                <option value={'30'}>2030</option>
                <option value={'31'}>2031</option>
                <option value={'32'}>2032</option>
                <option value={'33'}>2033</option>
                <option value={'34'}>2034</option>
              </select>
              </Col>
              <Col></Col>
              <Col>
                <label className='form-label' htmlFor={`${id}-cvv`}>cvv</label>
                <input className='form-control number' value={currentCvv} onChange={e => { setCurrentCvv(e.target.value); }} type='text' id={`${id}-cvv`} required autoComplete='off' maxLength={3} minLength={3} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} pattern="[0-9]*" ></input>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="d-grid gap-2 p-2">
          <button className='btn btn-danger my-2 mx-2' variant="primary" size="sm" onClick={e => handleClick(e)} >Submit Details</button>
        </div>
      </form>
    </div>

  );
}

export default CardCreate;