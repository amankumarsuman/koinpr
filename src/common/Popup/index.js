import React from 'react';

import './Popup.scss';

const CommonPopup = (props) => {
  return (
    <div className='popup'>
        <div className='content'>
            <div className='title'>{props.title}</div>
            <div className='input'>
                <input className='ip' type='text' placeholder={props.input1} />
                { props.input2 && <input className='ip ip1' type='text' placeholder={props.input2} />}
            </div>
            <button type='submit' className='submit'>{props.buttonText}</button>
            <div className='bottom'>Facing issues? <a href='/'>Contact support</a> </div>
        </div>
    </div>
  );
};

export default CommonPopup;