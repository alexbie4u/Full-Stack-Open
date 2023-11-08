import React from 'react'

export default function Notification({ message }) {
    if (message === null) {
        return null
      }
    
      return (
        <div className="updateMessage">
          {message}
        </div>
      )
    }