import React, { useState, useRef,useEffect } from "react";
import TelephoneIcon from "../../assets/home-page/icons/telephone.png";

import { useNavigate } from "react-router-dom";

import "./PhoneSearchInput.css";
import { formatPhoneNumber } from "../../functions/formatPhoneNumber";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../services/wallet/UserSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useAccount } from 'wagmi'


const PhoneSearchInput = ({ initialValue, update, setUpdate ,onSub }) => {
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userr, "befie redux");
  const navigate = useNavigate();

  const account = useAccount()


  const ref = useRef(null);

  const handleFocus = () => {
    ref.current.focus();
  };
  
  console.log("Acas",account.isConnected)
  //fake value
  const [value, setValue] = useState(
    initialValue ? formatPhoneNumber(initialValue) : ""
  );

  //value for submission
  const [phoneValue, setPhoneValue] = useState("");
  const [isWords, setIsWords] = useState(false);

  function handleChange(event) {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    // Format the numeric value with spaces
    const formattedValue = formatPhoneNumber(numericValue);

    // Update state with the formatted value
    setValue(formattedValue);

    // Update state for real value
    setPhoneValue(numericValue);
  }
  function handleChangeWords(event) {
    const inputValue = event.target.value;

    // Remove all non-numeric characters from input value
    const numericValue = inputValue.replace(/[^a-zA-Z]/g, "").toUpperCase();
    // Format the numeric value with spaces
    const formattedValue = numericValue;

    console.log("afsdasds",formattedValue)

    // Update state with the formatted value
    setValue(formattedValue);


    const keypadMapping = {
      A: '2', B: '2', C: '2',
      D: '3', E: '3', F: '3',
      G: '4', H: '4', I: '4',
      J: '5', K: '5', L: '5',
      M: '6', N: '6', O: '6',
      P: '7', Q: '7', R: '7', S: '7',
      T: '8', U: '8', V: '8',
      W: '9', X: '9', Y: '9', Z: '9'
    };
  
    // Convert each letter to its corresponding number
    const numericValueInL = formattedValue.split('')
      .map(letter => keypadMapping[letter] || '')
      .join('');
  


console.log("Sdfsdf",numericValueInL.length)
    // Update state for real value
if(numericValueInL.length ===  5){
  setPhoneValue(numericValueInL);

}
    console.log("len",phoneValue.length)

    console.log(phoneValue)
  }

  useEffect(() => {
    // This will log every time phoneValue changes.
    console.log("phoneValue length:", phoneValue.length);
    console.log("phoneValue:", phoneValue);
  }, [phoneValue]);

  const onSearch = async () => {
    // setUpdate(!update);
    console.log("searching");

    console.log("val",phoneValue)

    


    if(!account.isConnected){
toast.warn("Connect your wallet please");
return
    }

    if(phoneValue.length !==5){
      toast.warn("5 digits is required");
      return;

    }
    

  try {

    const queryurl = 'https://degen-backend.vercel.app/degen/checkDegen'
    const res = await axios.post(queryurl,{
      number:phoneValue
    })

    if(res.status === 203){
      navigate(`/search-results?n=${phoneValue}`);
// return;
    }

    else if(res.status === 200 || res.status === 201){
      toast("number already taken")

    }

  } catch (error) {

    toast.warn("number already taken")
    console.log("erdutdkutu",error)
  }


    // onSub();
  };

  return (
    <>
      <div className="phoneSearchInputSwitch">
        {/* <div className="phoneSearchInputSwitchBtn switchActive">
      Standard
    </div>
    <div className="phoneSearchInputSwitchBtn">
      Phone words
    </div> */}

      <div className="toggle-container">
        <button
          className={!isWords ? 'toggle-button active' : 'toggle-button inactive'}
          onClick={() => {setIsWords(false);
          setValue("")}}
        >
          Numbers
        </button>
        <button
          className={isWords ? 'toggle-button active' : 'toggle-button inactive'}
          onClick={() => {setIsWords(true);
            setValue("")}}
        >
          Words
        </button>
        </div>
      </div>
      <div className="phoneSearchInput">
        <div className="phoneSearchInputIcon">
          <img src={TelephoneIcon} alt="icon" />
        </div>
        {!isWords && <div className="phoneSearchInputBox" onClick={handleFocus}>
          Phone number
          <div className="phoneSearchInputBoxRow" onClick={handleFocus}>
<div className="Degen">            +999 DEGEN
</div>            <input
              type="text"
              value={value}
              onChange={handleChange}
              maxLength={5}
              ref={ref}
              placeholder="12345"
            />
          </div>
        </div>}
   { isWords &&    <div className="phoneSearchInputBox" onClick={handleFocus}>
          Phone number
          <div className="phoneSearchInputBoxRow" onClick={handleFocus}>
<span className="Degen">            +999 DEGEN
</span>            <input
              type="text"
              value={value}
              onChange={handleChangeWords}
              maxLength={5}
              ref={ref}
              placeholder="CHAIN"
            />
          </div>
        </div>}
        <button
          onClick={onSearch}
        
        >
          LFG!
        </button>
      </div>

      <ToastContainer />
    </>
  );
};

export default PhoneSearchInput;
