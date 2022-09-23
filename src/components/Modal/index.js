import React from 'react'

const Modal = ({ showModal, children, hideModal }) => {
    return (
      showModal && (
        <div onClick={hideModal} className="modalBackground" style={{zIndex: "90"}}>
          <div onClick={e => e.stopPropagation()} className="modalContainer">
              {children}
          </div>
        </div>
      )
    );
  };
  

export default Modal