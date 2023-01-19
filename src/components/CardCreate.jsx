import CryptoJS from "crypto-js";
import React, { useId, useMemo, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import './CardCreate.css';

import ImgChip from '../assets/chip.png';
import monthSelects from '../data/Json-month.json';
import yearSelects from '../data/Json-year.json';

import { v4 as genUUID4 } from 'uuid';

function CardCreate({ handleAddCard }) {
  const id = useId();
  const secretPass = "XkhZG4fW2t2W";
  let alertDiv = '';

  const [currenyState, setCurrentState] = useState({ currentText: "", currentNumber01:  "", currentNumber02: "", currentNumber03: "", currentNumber04: "", currentMonth: "", currentYear:"",  currentCvv: "",
    hover: false,  showMessage: false,  message: { variant: '', text: '' }, encrptedData: "", focus: ""});
  
  const handleMouseEnter = () => {
    setCurrentState({...currenyState, hover: true});
  };

  const handleMouseLeave = () => {
    setCurrentState({...currenyState, hover: false});
  };

  const handleFocusChange = (e) => {
    setCurrentState({
      ...currenyState,
      focus : e.target.id
    })
  }

  const actualizarState = e => {
    if (!isNaN(e.target.value)) {
      setCurrentState({...currenyState, [e.target.name]: e.target.value});  
    }
  };

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(currenyState.currentCvv),
        secretPass
      ).toString();
      setCurrentState({...currenyState, encrptedData: data}); 
  };

  const newCard = useMemo(() => {
    return {
      id: genUUID4(),
      text: currenyState.currentText,
      num01: currenyState.currentNumber01,
      num02: currenyState.currentNumber02,
      num03: currenyState.currentNumber03,
      num04: currenyState.currentNumber04,
      month: currenyState.currentMonth,
      year: currenyState.currentYear,
      cvv: currenyState.encrptedData,
      completed: false
    };
  });

  const handleClick = () => {
    if (!currenyState.currentCvv) return;
     encryptData();
  };

  const handleSubmit = e => {
    e.preventDefault(); 
     //console.log(newCard);
      handleAddCard(newCard); // newCard  is a object for dataset             
      setCurrentState({...currenyState, showMessage: true, message: { variant: 'success', text: 'Data saved successfully'}, 
      currentText: '', currentNumber01: '', currentNumber02: '', currentNumber03: '', currentNumber04: '', currentMonth: '', 
      currentYear: '', currentCvv: '', encrptedData: ''});     
  };
 
  
  if (currenyState.showMessage) {
    alertDiv = <Alert variant={currenyState.message.variant} onClose={() => setCurrentState({...currenyState, showMessage: false})} dismissible ><p> {currenyState.message.text} </p> </Alert>;
  }

  return (
    <div className="container container-sm " id='create-card'>
      {alertDiv}
      <div className='card-container'>
        <div id='front' className={currenyState.hover ? 'front roteFront' : 'front'}  >
          <div className='image-logo'>
            <img className='mb-2' src={ImgChip} alt="Chip png" />
            <span className='text-bold'>BANK NAME</span>
          </div>
          <div className='text-card-number'> {currenyState.currentNumber01} {currenyState.currentNumber02} {currenyState.currentNumber03} {currenyState.currentNumber04} </div>
          <div className='flexbox'>
            <div className='box'>
              <span className='small'>Card Holder Name </span>
              <div className='text-card-name'>{currenyState.currentText}</div>
            </div>
            <div className='box'>
              <span className='small'>Valid Thru </span>
              <div className='valid'>
                <span className='valid-month'>{currenyState.currentMonth}</span> /
                <span className='valid-year'>{currenyState.currentYear}</span>
              </div>
            </div>
          </div>
        </div>
        <div id='back' className={currenyState.hover ? 'back roteBack' : 'back'}  >
          <div className='stripe'></div>
          <div className='box'>
            <span className='small'>cvv</span>
            <div className='valid-cvv'>{currenyState.currentCvv}</div>
            <span className='text-bold'>BANK NAME</span>
          </div>
        </div>
      </div>
      <form className='form-control  mt-121  border-danger' onSubmit={e => handleSubmit(e)} lang={'en'}>
        <div className='form-floating text-start border-primary mt-2'>
          <Container>
            <Row><Col xs lg="3"><label className='form-label mt-3' htmlFor={`${id}-numberCard`}>Credit Card Number</label></Col></Row>
            <Row xs={1} md={4} lg={4}>
              <Col><input className='form-control number' value={currenyState.currentNumber01} onChange={actualizarState} name={'currentNumber01'} type='text' id={`${id}-number01`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" onFocus={handleFocusChange} focused={currenyState.focus} ></input></Col>
              <Col><input className='form-control number' value={currenyState.currentNumber02} onChange={actualizarState} name={'currentNumber02'} type='text' id={`${id}-number02`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" onFocus={handleFocusChange}></input></Col>
              <Col><input className='form-control number' value={currenyState.currentNumber03} onChange={actualizarState} name={'currentNumber03'} type='text' id={`${id}-number03`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" onFocus={handleFocusChange}></input></Col>
              <Col><input className='form-control number' value={currenyState.currentNumber04} onChange={actualizarState} name={'currentNumber04'} type='text' id={`${id}-number04`} required autoComplete='off' maxLength={4} minLength={4} pattern="[0-9]*" onFocus={handleFocusChange}></input></Col>
            </Row>
            <Row><Col><label className='form-label mt-3' htmlFor={`${id}-name`}>Card Holder Name</label></Col></Row>
            <Row><Col><input className='form-control' value={currenyState.currentText} onChange={e => { setCurrentState({...currenyState, currentText: e.target.value}); }} type='text' id={`${id}-name`} required autoComplete='off' placeholder='Jhon Doe' maxLength={60} pattern="[a-z A-Z À-ÿ 0-9]*" ></input></Col></Row>
            <Row><Col><label className='form-label mt-3' htmlFor={`${id}-valid`}>Valid Thru</label></Col></Row>
            <Row xs={2} md={4} lg={4}>
              <Col><select className='form-control form-select' value={currenyState.currentMonth} onChange={e => { setCurrentState({...currenyState, currentMonth: e.target.value}); }} id={`${id}-month`} name={`${id}-month`} required autoComplete='off'>
               <option value={''}></option>{monthSelects.map((monthSelect) => <option value={monthSelect.value} key={monthSelect.value} >{monthSelect.label}</option>)}  </select> </Col>
              <Col><select className='form-control form-select' value={currenyState.currentYear} onChange={e => { setCurrentState({...currenyState, currentYear: e.target.value}); }} id={`${id}-year`} name={`${id}-year`} required autoComplete='off'>
               <option value={''}></option> {yearSelects.map((yearSelect) => <option value={yearSelect.value} key={yearSelect.value} >{yearSelect.label}</option>)} </select> </Col>
              <Col></Col>
              <Col className="top-cvv"><label className='form-label' htmlFor={`${id}-cvv`}>cvv</label><input className='form-control number' value={currenyState.currentCvv} onChange={actualizarState} name={'currentCvv'} type='text' id={`${id}-cvv`} required autoComplete='off' maxLength={3} minLength={3} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} pattern="[0-9]+" ></input></Col>
            </Row>
          </Container>
        </div>
        <div className="d-grid gap-2 p-2"><button className='btn btn-danger my-2 mx-2' variant="primary" size="sm" onClick={e => handleClick(e)} >Submit Details</button></div>
      </form>
    </div>
  );
}

export default CardCreate;