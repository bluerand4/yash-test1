import axios from 'axios'
// const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
// export const BASE_URL = `http://localhost:${SERVER_PORT}`;

import React, { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode'
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux'
// import { GLOBALTYPES } from '../redux/actions/GlobalTypes';

const RECALL_LINK=`https://vnmpm8z32m.execute-api.us-east-1.amazonaws.com/post1`

const postDataAPI = async (url:any, post:any, token:any) => {

    const res = await axios.post(`${RECALL_LINK}`, post,
        {
            headers: { Authorization: token }
        })

    return res;
}

// const getDataAPI = async (url:any, token:any) => {
//     const res = await axios.get(`${BASE_URL}/${url}`,
//         {
//             headers: { Authorization: token }
//         })
//     console.log('hi')
//     return res;
// }

// const googleLogin = (userData:any) => async (dispatch:any) => {
//     try {
//         dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
//         const res = await postDataAPI(`auth/googleLogin`, userData,null)

//         console.log('res',res)
        
//     } catch {}
// }
const googleLogin = async (userData:any)=> {
    try {
        console.log('first')
        let first= userData.given_name
        let last = userData.family_name
        console.log("first: ", first)
        
        let new_userData={first,last}
        // const RECALL_LINK=`auth/googleLogin`
        const RECALL_LINK=`https://vnmpm8z32m.execute-api.us-east-1.amazonaws.com/post1`
        const res = await postDataAPI(RECALL_LINK, new_userData,null)

        console.log('res',res)
        
    } catch (err) {console.log("err: ", err)}
}

// const youtube_clientId = process.env.REACT_APP_YOUTUBE_CLIENT_ID
// const redirect_url = process.env.REACT_APP_YOUTUBE_REDIRECT_URI;
// const REACT_APP_ID:String= process.env.REACT_APP_YOUTUBE_CLIENT_ID
const REACT_APP_ID= '1004172397703-jek7l46jdln2ctaabndg7l7angea4l10.apps.googleusercontent.com'
// const REACT_APP_ID= '308860405821-uj2cen6ln2tbgm0lf1nbvr6gj39n2njj.apps.googleusercontent.com'
function SignInModel({ display, onClose }:any) {
//   const { t } = useTranslation();
  const handleDisplayChange = () => {
    onClose();
  };



  useEffect(() => {
    const handleClickOutside = (event:any) => {
      const modalContainer = document.getElementById('modal');

      if (modalContainer && !modalContainer.contains(event.target)) {
        onClose();
      }
    };

    if (display) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [display, onClose]);


//   const handleYoutubeSignIn = (e) => {
//     e.preventDefault();
//     const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${youtube_clientId}&redirect_uri=${redirect_url}&scope=https://www.googleapis.com/auth/youtube.force-ssl&response_type=code&access_type=offline`;
//     window.location.href = authUrl;
//   }

  const handleGoogleUserData = (response:any)=>{
    let userData = jwtDecode(response.credential)
    console.log("userData: ", userData)
    googleLogin(userData)
  }
  
  const handleError:any =(response:any)=> {
    console.log("error: ", response)
  }

  return (
    <>
      {/* {display && <div className="modal-backdrop"></div>} */}
      <div id="modal" className="popupContainer bg-gray-900 rounded-[5px] " style={{ display: display ? 'block' : 'none' }}>
        <div className='flex items-center justify-center flex-col ' id='modal-div-1'>

          <div id='modal-div-2' className="popupHeader w-full mb-[10px] bg-gray-800 text-white rounded-[5px] border-none">
            <span id='modal-login-text' className="header_title">{('Login')}</span>
            <div onClick={handleDisplayChange} className="modal_close rounded-r-[5px] h-full">
              <svg className="flex-shrink-0 w-5  text-white  " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>

          <section id='popupBody' className="popupBody">
            <div id='social_login' className="social_login">
              {/* <button id='sign-in-with-youutube' className='bg-[red] text-white font-bold px-[20px] py-[8px] rounded-[6px]' onClick={handleYoutubeSignIn}>Sign In With Youtube</button> */}
              <GoogleOAuthProvider clientId={REACT_APP_ID}>
                <GoogleLogin
                    onSuccess={handleGoogleUserData}
                    onError={handleError}
                    // className='mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                />

                


              </GoogleOAuthProvider>    
            </div>
          </section>
        </div>
      </div>
    </>

  );
}

export default SignInModel;