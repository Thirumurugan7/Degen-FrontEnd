import React, { useEffect } from "react";
import navbarData from "./navbar.data";
import Logo from "../../assets/ud-logo.png";
import "./Navbar.css";
import { checkUser, logoutUser } from "../../services/magic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "../../assets/navbar/phone-icon.svg";
import ArrowDown from "../../assets/navbar/arrow-down.svg";
import { useSelector, useDispatch } from "react-redux";
import { useWalletContext } from "@coinbase/waas-sdk-web-react";
import { setUserData } from "../../services/wallet/UserSlice";
import { getAccount, switchChain, disconnect } from "@wagmi/core";
import { connectConfig } from "../../ConnectKit/Web3Provider";
import { useDisconnect } from "wagmi";
import {
  createPublicClient,
  getContract,
  http,
  createWalletClient,
} from "viem";
import { CustomButton } from "../../ConnectKit/ConnectKitButton";
// import { connectConfig } from "../../ConnectKit/Web3Provider";
import config from "../../../src/config.json"
import conABI from "../../../src/abi/abi.json"
const Navbar = ({ loggedIn, setLog }) => {
  const userr = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();

  const [loginStatus, setLoginStatus] = useState(false);
  const [gotAddress, setGotAddress] = useState(false);
  const [gotData, setGotData] = useState(false);

  const { waas, user, isCreatingWallet, wallet } = useWalletContext();

  const navigate = useNavigate();
  console.log(userr, "before redux");




  useEffect(() => {
    if (userr) {
      if (userr.address) {
        loggedIn = true;
        setLoginStatus(true);
      }
    }
  }, []);

  const handleLogout = async () => {
    console.log("logging out");
    if (user) {
      const res = await waas.logout();
      console.log(res);
      dispatch(setUserData({ rootId: "", address: "", phno: "" }));
      navigate("/");
    }

   await disconnect(connectConfig);
    dispatch(setUserData({ rootId: "", address: "", phno: "" }));

    navigate("/");
  };

  const handleNavigate = () => {
    if (userr.address !== "") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  const handlesuccess = async () => {
    console.log("connecrted")
  }

  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <img
          src={Logo}
          alt="logo"
          onClick={handleNavigate}
          className="navbarLogo"
        />

        {/* Old version */}
        {/* <div className="navbarTextRow">
          {navbarData.map((text, i) => (
            <div key={i}>{text}</div>
          ))}
        </div> */}

        <div className="navbarRightSide">
          {/* {userr.address !== "" ? (
            <div
              className="navbarRightDiv"
              onClick={() => {
                setLog(false);
                handleLogout();
              }}
            >
              Log out
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 9L13 5M13 5L9 1M13 5H5C3.93913 5 2.92172 5.42143 2.17157 6.17157C1.42143 6.92172 1 7.93913 1 9C1 10.0609 1.42143 11.0783 2.17157 11.8284C2.92172 12.5786 3.93913 13 5 13H7"
                  stroke="white"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          ) : (
            // <div
            //   className="navbarRightDiv"
            //   onClick={() => {
            //     setLog(false);
            //     navigate("/");
            //   }}
            // >
            //   Sign in
            // </div>


          )} */}

<CustomButton onSuccess={handlesuccess} />

        </div>

        {/* {loggedIn && <button onClick={logoutUser}>logout</button>}
        {!loggedIn && <button>login</button>} */}
      </div>
    </div>
  );
};

export default Navbar;
