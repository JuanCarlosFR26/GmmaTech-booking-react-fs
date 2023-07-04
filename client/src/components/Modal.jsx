import React from 'react'

const Modal = ({ text, className, pClass }) => {
  return (
    <div className={className}>
        <p className={pClass}>{text}</p>
    </div>
  )
}

export default Modal