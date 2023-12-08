// import React, { useState } from 'react'
// import './App.css'
// import { createStore } from 'redux'  

// const App = () => {

//   const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1
//       case 'DECREMENT':
//         return state - 1
//       case 'ZERO':
//         return 0
//       default: // if none of the above matches, code comes here
//         return state
//     }
//   }

//   const store = createStore(counterReducer)

//   return (
//     <>
//       <h1>Counterapp</h1>
//       <div className="card">
//         <p>{count}</p>
//         <button onClick={() => setCount((count) => count + 1)}>Plus</button>
//         <button onClick={() => setCount((count) => count - 1)}>Minus</button>
//         <button onClick={() => setCount((count) => count = 0)}>0</button>
//       </div>
//     </>
//   )
// }

// export default App
