import React from 'react'
import SignInModel from './SignInModel'
const Home = () => {
  
    const token =localStorage.getItem('token')
    return (
        <>
            
            {
                !token?
                <SignInModel />
                : <div>Home</div>     
            }
        </>
    
  )
}

export default Home