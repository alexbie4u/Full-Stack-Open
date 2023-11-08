import React from 'react'

export default function ErrorMessage({ message }) {
    if (message === null) {
        return null
      }
    
      return (
        <div className='errorMessage'>
          {message}
        </div>
      )
    }