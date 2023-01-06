import React from 'react';

import './Popup.scss';

const CommonPopup = (props) => {
  return (
    <div className='popup'>
        <div className='content'>
            <div className='title'>{props.title}</div>
            <div className='input'>
                <input className='ip' type='text'
                onChange={(e) => props.setValue1(e.target.value)}
                			value={props.value1}
                placeholder={props.input1} />
                { props.input2 && <input 
                 onChange={(e) => props.setValue2(e.target.value)}
                 value2={props.value1}
                className='ip ip1' type='text' placeholder={props.input2} />}
            </div>
            {/* {props?.error && <div className="error_msg">{props?.error}</div>}
		      	{props?.msg && <div className="success_msg">{props?.msg}</div>} */}
            <button type='submit' onClick={props.handleSubmit} className='submit'>{props.buttonText}</button>
            <div className='bottom'>Facing issues? <a href='/'>Contact support</a> </div>
        </div>
    </div>
  );
};

export default CommonPopup;