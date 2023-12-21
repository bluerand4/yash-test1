import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ListGroup from './components/ListGroup'
import SignInModel from './components/SignInModel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ListGroup></ListGroup>
      <SignInModel></SignInModel>
    </>
    
  )
}

export default App
