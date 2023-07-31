import { useState, useEffect } from "react";
import { Row, Col, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";
import { SIGNUP, SEND_OTP, VERIFY_OTP } from "../../redux/Login/Login.types";
import { ModalLoginButton, ModalCancelButton } from "./styles";
import { RootState } from "../../redux/rootReducer";
// import {PasswordInput} from "antd-password-input-strength";

interface dataFormProps {
  toggleSignupModal: () => void;
  toggleLoginModal: () => void;
}

function SignupModal({ toggleSignupModal, toggleLoginModal }: dataFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("email");
  const [inutOtp, setinputOtp] = useState("");

  const [usernameInput, setUsernameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const otpSentData = useSelector((data: RootState) => data.login.otpSentData);
  const signupData = useSelector((data: RootState) => data.login.signupData);

  const dispatch = useDispatch();

  const handleSwitchToLogin = () => {
    toggleLoginModal();
    toggleSignupModal();
  };

  useEffect(() => {
    if (otpSentData?.message === "OTP sent.") {
      setCurrentScreen("otp");
    } else if (otpSentData === "Email already Registered, Please login.") {
      // toast.error(otpSentData);
    } else if (otpSentData === "OTP Verified successfully!") {
      setCurrentScreen("fullForm");
    }
  }, [otpSentData]);

  useEffect(() => {
    if (signupData.message === "Registration successful") {
      toggleSignupModal();
    }
  }, [signupData]);

  const handleSendOTP = async () => {
    if (emailInput && emailInput.length > 6) {
      if (emailInput.includes("@") && emailInput.includes(".")) {
        dispatch({
          type: SEND_OTP,
          payload: {
            email: emailInput,
          },
        });
      } else {
        toast.error("Please enter a valid email!");
      }
    } else {
      toast.error("Please enter a valid email!");
    }
  };

  const handleVerifyOTP = () => {
    if (inutOtp && inutOtp.length === 4) {
      dispatch({
        type: VERIFY_OTP,
        payload: {
          email: otpSentData?.message === "OTP sent." && otpSentData?.email,
          otp: inutOtp,
        },
      });
    }
  };
  const [passErrorMsg, setPassErrorMsg] = useState("");

  function validatePassword(p) {
    var errors = [];
    if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    if (errors.length > 0) {
      console.log(errors.join("\n"));
      setPassErrorMsg(errors.join(". "));
      return false;
    }
    return true;
  }

  const handleSignupButtonClick = async () => {
    const passwordFormat = /^[A-Za-z]\w{7,14}$/;
    if (firstNameInput.length < 3) {
      toast.error("First name is not valid");
    } else if (lastNameInput.length < 3) {
      toast.error("Last name is not valid");
    } else if (emailInput.length < 4) {
      toast.error("Email is not valid");
    } else if (!validatePassword(passwordInput)) {
      toast.error(passErrorMsg); 
    } else if (passwordInput !== confirmPasswordInput) {
      toast.error("Both passwords should match");
    } else {
      dispatch({
        type: SIGNUP,
        payload: {
          // username: usernameInput,
          firstName: firstNameInput,
          lastName: lastNameInput,
          email: emailInput,
          password: passwordInput,
          mobile_number: "+9199999999",
          password_repeat: confirmPasswordInput,
        },
      });
    }
  };

  const otpSendAction = async () => {
    setLoading(true);
    await handleSendOTP();
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  const signupAction = async () => {
    setLoading(true);
    await handleSignupButtonClick();
    setTimeout(() => {
      setLoading(false);
    }, 7500);
  };

  return (
    <div style={{ marginTop: "1rem", paddingBottom: "1rem" }}>
      <Row justify="center">
        <svg
          width="229"
          height="113"
          viewBox="0 0 229 113"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H228.974V113H0V0Z" fill="#121825" />
          <path
            d="M180.567 41.0397L189.713 9.22754L163.811 29.5308L136.701 10.909L152.03 41.8472L148.182 24.9035L163.82 36.6234L178.452 26.4711L174.075 43.6673L187.846 54.1654L170.615 55.7005L169.376 80.8411L174.914 60.7007L207.678 59.6615L180.567 41.0397Z"
            fill="url(#paint0_linear_1540_17681)"
          />
          <path
            d="M165.016 28.6707L136.701 11.1152L163.883 29.6146L165.016 28.6707Z"
            fill="#FFD086"
          />
          <path
            d="M180.495 41.1296L207.678 59.6289L180.873 39.8082L180.495 41.1296Z"
            fill="#FFD086"
          />
          <path
            d="M176.342 60.7607H174.832L169.358 80.5815L176.342 60.7607Z"
            fill="#FFD086"
          />
          <path
            d="M149.537 25.8394L148.216 24.8955L151.991 41.6959L149.537 25.8394Z"
            fill="#FFD086"
          />
          <g filter="url(#filter0_d_1540_17681)">
            <path
              d="M26.719 59.8829C25.32 59.8829 24.0552 59.6433 22.9246 59.1642C21.8131 58.6851 20.9316 57.9952 20.28 57.0945C19.6284 56.1938 19.2931 55.1303 19.2739 53.9038H23.5857C23.6432 54.7278 23.9307 55.3794 24.4481 55.8585C24.9847 56.3376 25.7129 56.5771 26.6328 56.5771C27.5718 56.5771 28.3096 56.3567 28.8462 55.916C29.3828 55.456 29.6511 54.862 29.6511 54.1337C29.6511 53.5397 29.469 53.051 29.1049 52.6677C28.7408 52.2844 28.2808 51.9874 27.7251 51.7766C27.1885 51.5466 26.4411 51.2975 25.4829 51.0292C24.1798 50.6459 23.1162 50.2722 22.2922 49.9081C21.4873 49.5249 20.7878 48.9595 20.1937 48.2121C19.6188 47.4456 19.3314 46.4299 19.3314 45.1651C19.3314 43.977 19.6284 42.9421 20.2225 42.0606C20.8166 41.179 21.6502 40.5083 22.7234 40.0484C23.7965 39.5693 25.023 39.3297 26.4028 39.3297C28.4725 39.3297 30.1493 39.8376 31.4333 40.8533C32.7364 41.8498 33.4551 43.2487 33.5892 45.0501H29.1624C29.1241 44.3602 28.827 43.7949 28.2713 43.3541C27.7347 42.8942 27.016 42.6642 26.1153 42.6642C25.3296 42.6642 24.6972 42.8655 24.2181 43.2679C23.7582 43.6703 23.5282 44.2548 23.5282 45.0214C23.5282 45.558 23.7007 46.0083 24.0457 46.3724C24.4098 46.7174 24.8505 47.0048 25.368 47.2348C25.9045 47.4456 26.6519 47.6947 27.6101 47.9822C28.9133 48.3655 29.9768 48.7487 30.8009 49.132C31.6249 49.5153 32.334 50.0902 32.9281 50.8567C33.5221 51.6233 33.8192 52.6294 33.8192 53.875C33.8192 54.9482 33.5413 55.9447 32.9855 56.8646C32.4298 57.7844 31.6153 58.5222 30.5422 59.078C29.469 59.6146 28.1946 59.8829 26.719 59.8829ZM52.3421 43.7566V59.6816H48.289V57.6694C47.7716 58.3593 47.0913 58.9055 46.2481 59.3079C45.424 59.6912 44.5233 59.8829 43.546 59.8829C42.3003 59.8829 41.1984 59.6241 40.2402 59.1067C39.282 58.5701 38.5251 57.794 37.9693 56.7783C37.4327 55.7435 37.1644 54.517 37.1644 53.0989V43.7566H41.1888V52.524C41.1888 53.7888 41.505 54.7661 42.1374 55.456C42.7698 56.1268 43.6322 56.4621 44.7245 56.4621C45.836 56.4621 46.708 56.1268 47.3404 55.456C47.9728 54.7661 48.289 53.7888 48.289 52.524V43.7566H52.3421ZM60.3372 46.0562C60.8546 45.328 61.5637 44.7243 62.4644 44.2452C63.3843 43.747 64.4287 43.4979 65.5977 43.4979C66.9583 43.4979 68.1848 43.8332 69.2771 44.504C70.3886 45.1747 71.2606 46.1329 71.893 47.3785C72.5445 48.605 72.8703 50.0327 72.8703 51.6616C72.8703 53.2905 72.5445 54.7374 71.893 56.0022C71.2606 57.2478 70.3886 58.2156 69.2771 58.9055C68.1848 59.5954 66.9583 59.9404 65.5977 59.9404C64.4287 59.9404 63.3938 59.7008 62.4931 59.2217C61.6116 58.7426 60.893 58.139 60.3372 57.4107V67.2705H56.3128V43.7566H60.3372V46.0562ZM68.7597 51.6616C68.7597 50.7034 68.5585 49.8794 68.156 49.1895C67.7727 48.4804 67.2553 47.9438 66.6038 47.5797C65.9714 47.2156 65.2815 47.0336 64.5341 47.0336C63.8059 47.0336 63.116 47.2252 62.4644 47.6085C61.832 47.9726 61.3146 48.5092 60.9121 49.2182C60.5289 49.9273 60.3372 50.7609 60.3372 51.7191C60.3372 52.6773 60.5289 53.5109 60.9121 54.22C61.3146 54.929 61.832 55.4752 62.4644 55.8585C63.116 56.2226 63.8059 56.4046 64.5341 56.4046C65.2815 56.4046 65.9714 56.213 66.6038 55.8297C67.2553 55.4465 67.7727 54.9003 68.156 54.1912C68.5585 53.4822 68.7597 52.639 68.7597 51.6616ZM90.5987 51.3742C90.5987 51.9491 90.5604 52.4665 90.4837 52.9264H78.8418C78.9376 54.0762 79.34 54.9769 80.0491 55.6285C80.7581 56.2801 81.6301 56.6059 82.6649 56.6059C84.1597 56.6059 85.2233 55.9639 85.8557 54.6799H90.1963C89.7363 56.213 88.8548 57.4778 87.5517 58.4743C86.2485 59.4517 84.6484 59.9404 82.7512 59.9404C81.2181 59.9404 79.8383 59.605 78.6118 58.9343C77.4045 58.2444 76.4559 57.2766 75.766 56.0309C75.0952 54.7853 74.7599 53.348 74.7599 51.7191C74.7599 50.071 75.0952 48.6242 75.766 47.3785C76.4367 46.1329 77.3757 45.1747 78.583 44.504C79.7904 43.8332 81.1797 43.4979 82.7512 43.4979C84.2651 43.4979 85.6161 43.8236 86.8043 44.4752C88.0116 45.1268 88.9411 46.0562 89.5926 47.2635C90.2633 48.4517 90.5987 49.8219 90.5987 51.3742ZM86.4306 50.2243C86.4114 49.1895 86.0377 48.3655 85.3095 47.7522C84.5813 47.1198 83.6902 46.8036 82.6362 46.8036C81.6397 46.8036 80.7965 47.1102 80.1066 47.7235C79.4358 48.3175 79.0238 49.1512 78.8705 50.2243H86.4306ZM97.5605 46.2287C98.078 45.3855 98.7487 44.7243 99.5727 44.2452C100.416 43.7662 101.374 43.5266 102.447 43.5266V47.7522H101.384C100.119 47.7522 99.1607 48.0492 98.5091 48.6433C97.8767 49.2374 97.5605 50.2722 97.5605 51.7479V59.6816H93.5362V43.7566H97.5605V46.2287ZM111.252 59.9404C109.949 59.9404 108.78 59.7104 107.745 59.2505C106.71 58.7714 105.886 58.1294 105.273 57.3245C104.679 56.5196 104.353 55.6285 104.296 54.6512H108.349C108.425 55.2644 108.722 55.7722 109.24 56.1747C109.776 56.5771 110.438 56.7783 111.223 56.7783C111.99 56.7783 112.584 56.625 113.005 56.3184C113.446 56.0118 113.667 55.6189 113.667 55.1398C113.667 54.6224 113.398 54.2391 112.862 53.99C112.344 53.7217 111.511 53.4343 110.361 53.1276C109.173 52.8402 108.195 52.5431 107.429 52.2365C106.681 51.9299 106.03 51.4604 105.474 50.828C104.938 50.1956 104.669 49.3428 104.669 48.2696C104.669 47.3881 104.918 46.5832 105.417 45.855C105.934 45.1268 106.662 44.5519 107.601 44.1303C108.559 43.7087 109.681 43.4979 110.965 43.4979C112.862 43.4979 114.376 43.977 115.506 44.9351C116.637 45.8742 117.26 47.1486 117.375 48.7583H113.523C113.465 48.1259 113.197 47.6276 112.718 47.2635C112.258 46.8803 111.635 46.6886 110.85 46.6886C110.121 46.6886 109.556 46.8228 109.154 47.0911C108.77 47.3594 108.579 47.733 108.579 48.2121C108.579 48.7487 108.847 49.1607 109.384 49.4482C109.92 49.7165 110.754 49.9944 111.884 50.2818C113.034 50.5693 113.983 50.8663 114.73 51.1729C115.478 51.4796 116.12 51.9587 116.656 52.6102C117.212 53.2426 117.499 54.0858 117.519 55.1398C117.519 56.0597 117.26 56.8837 116.742 57.612C116.244 58.3402 115.516 58.9151 114.558 59.3367C113.619 59.7391 112.517 59.9404 111.252 59.9404ZM125.508 47.0623V54.7661C125.508 55.3027 125.632 55.6956 125.881 55.9447C126.15 56.1747 126.59 56.2897 127.204 56.2897H129.072V59.6816H126.542C123.15 59.6816 121.454 58.0336 121.454 54.7374V47.0623H119.557V43.7566H121.454V39.8184H125.508V43.7566H129.072V47.0623H125.508ZM130.932 51.6616C130.932 50.0519 131.248 48.6242 131.88 47.3785C132.532 46.1329 133.404 45.1747 134.496 44.504C135.608 43.8332 136.844 43.4979 138.204 43.4979C139.393 43.4979 140.427 43.7374 141.309 44.2165C142.21 44.6956 142.928 45.2993 143.465 46.0275V43.7566H147.518V59.6816H143.465V57.3532C142.947 58.1006 142.229 58.7235 141.309 59.2217C140.408 59.7008 139.364 59.9404 138.176 59.9404C136.834 59.9404 135.608 59.5954 134.496 58.9055C133.404 58.2156 132.532 57.2478 131.88 56.0022C131.248 54.7374 130.932 53.2905 130.932 51.6616ZM143.465 51.7191C143.465 50.7418 143.273 49.9081 142.89 49.2182C142.507 48.5092 141.989 47.9726 141.338 47.6085C140.686 47.2252 139.987 47.0336 139.239 47.0336C138.492 47.0336 137.802 47.2156 137.17 47.5797C136.537 47.9438 136.02 48.4804 135.617 49.1895C135.234 49.8794 135.042 50.7034 135.042 51.6616C135.042 52.6198 135.234 53.463 135.617 54.1912C136.02 54.9003 136.537 55.4465 137.17 55.8297C137.821 56.213 138.511 56.4046 139.239 56.4046C139.987 56.4046 140.686 56.2226 141.338 55.8585C141.989 55.4752 142.507 54.9386 142.89 54.2487C143.273 53.5397 143.465 52.6965 143.465 51.7191ZM155.473 46.2287C155.99 45.3855 156.661 44.7243 157.485 44.2452C158.328 43.7662 159.286 43.5266 160.36 43.5266V47.7522H159.296C158.031 47.7522 157.073 48.0492 156.421 48.6433C155.789 49.2374 155.473 50.2722 155.473 51.7479V59.6816H151.448V43.7566H155.473V46.2287Z"
              fill="url(#paint1_linear_1540_17681)"
            />
          </g>
          <g filter="url(#filter1_d_1540_17681)">
            <path
              d="M70.4491 71.1136L75.1595 78.6807H72.3682L68.9445 73.1853L65.7388 78.6807H62.9693L67.6797 71.1136L62.9475 63.5248H65.7388L69.1843 69.0638L72.4118 63.5248H75.1813L70.4491 71.1136ZM77.0601 72.6619C77.0601 71.4262 77.3072 70.3431 77.8015 69.4127C78.3103 68.4677 79.0082 67.7408 79.895 67.232C80.7818 66.7231 81.7995 66.4687 82.948 66.4687C84.4018 66.4687 85.6012 66.8176 86.5461 67.5155C87.5056 68.1988 88.1526 69.1801 88.487 70.4594H85.8047C85.5866 69.8634 85.2377 69.3981 84.758 69.0638C84.2782 68.7294 83.6749 68.5622 82.948 68.5622C81.9303 68.5622 81.1162 68.9257 80.5056 69.6526C79.9095 70.3649 79.6115 71.368 79.6115 72.6619C79.6115 73.9558 79.9095 74.9662 80.5056 75.6931C81.1162 76.42 81.9303 76.7835 82.948 76.7835C84.3872 76.7835 85.3395 76.151 85.8047 74.8862H88.487C88.138 76.1074 87.4838 77.0815 86.5243 77.8084C85.5648 78.5207 84.3727 78.8769 82.948 78.8769C81.7995 78.8769 80.7818 78.6225 79.895 78.1137C79.0082 77.5903 78.3103 76.8634 77.8015 75.933C77.3072 74.988 77.0601 73.8977 77.0601 72.6619ZM97.1794 66.4687C98.0953 66.4687 98.9095 66.665 99.6218 67.0575C100.349 67.45 100.916 68.0316 101.323 68.8021C101.744 69.5726 101.955 70.503 101.955 71.5934V78.6807H99.491V71.9641C99.491 70.8883 99.222 70.0669 98.6841 69.4999C98.1462 68.9184 97.412 68.6276 96.4816 68.6276C95.5512 68.6276 94.8097 68.9184 94.2573 69.4999C93.7194 70.0669 93.4504 70.8883 93.4504 71.9641V78.6807H90.9644V62.5435H93.4504V68.0606C93.872 67.5518 94.4027 67.1593 95.0423 66.8831C95.6966 66.6068 96.4089 66.4687 97.1794 66.4687ZM104.298 72.6183C104.298 71.4117 104.545 70.3431 105.039 69.4127C105.548 68.4822 106.231 67.7626 107.089 67.2538C107.961 66.7304 108.921 66.4687 109.967 66.4687C110.912 66.4687 111.734 66.6577 112.432 67.0357C113.144 67.3992 113.711 67.8571 114.133 68.4096V66.665H116.64V78.6807H114.133V76.8925C113.711 77.4595 113.137 77.932 112.41 78.3099C111.683 78.6879 110.854 78.8769 109.924 78.8769C108.892 78.8769 107.947 78.6152 107.089 78.0919C106.231 77.554 105.548 76.8125 105.039 75.8676C104.545 74.908 104.298 73.825 104.298 72.6183ZM114.133 72.6619C114.133 71.8333 113.958 71.1136 113.609 70.503C113.275 69.8924 112.831 69.4272 112.279 69.1074C111.726 68.7875 111.13 68.6276 110.491 68.6276C109.851 68.6276 109.255 68.7875 108.703 69.1074C108.15 69.4127 107.699 69.8706 107.351 70.4812C107.016 71.0773 106.849 71.7896 106.849 72.6183C106.849 73.447 107.016 74.1739 107.351 74.799C107.699 75.4241 108.15 75.9039 108.703 76.2383C109.27 76.5581 109.866 76.718 110.491 76.718C111.13 76.718 111.726 76.5581 112.279 76.2383C112.831 75.9184 113.275 75.4532 113.609 74.8426C113.958 74.2175 114.133 73.4906 114.133 72.6619ZM125.968 66.4687C126.913 66.4687 127.756 66.665 128.498 67.0575C129.254 67.45 129.842 68.0316 130.264 68.8021C130.686 69.5726 130.896 70.503 130.896 71.5934V78.6807H128.432V71.9641C128.432 70.8883 128.163 70.0669 127.625 69.4999C127.087 68.9184 126.353 68.6276 125.423 68.6276C124.492 68.6276 123.751 68.9184 123.198 69.4999C122.661 70.0669 122.392 70.8883 122.392 71.9641V78.6807H119.906V66.665H122.392V68.0388C122.799 67.5445 123.315 67.1593 123.94 66.8831C124.58 66.6068 125.256 66.4687 125.968 66.4687ZM138.909 66.4687C139.839 66.4687 140.66 66.6577 141.373 67.0357C142.1 67.3992 142.667 67.8571 143.074 68.4096V66.665H145.581V78.8769C145.581 79.9818 145.349 80.9631 144.884 81.8209C144.418 82.6932 143.742 83.3764 142.856 83.8707C141.983 84.365 140.937 84.6122 139.715 84.6122C138.087 84.6122 136.735 84.2269 135.659 83.4564C134.583 82.7004 133.973 81.6682 133.827 80.3598H136.292C136.481 80.9849 136.88 81.4865 137.491 81.8645C138.116 82.257 138.858 82.4533 139.715 82.4533C140.719 82.4533 141.525 82.148 142.136 81.5374C142.761 80.9268 143.074 80.04 143.074 78.8769V76.8707C142.652 77.4377 142.078 77.9174 141.351 78.3099C140.639 78.6879 139.824 78.8769 138.909 78.8769C137.862 78.8769 136.902 78.6152 136.03 78.0919C135.172 77.554 134.489 76.8125 133.98 75.8676C133.486 74.908 133.239 73.825 133.239 72.6183C133.239 71.4117 133.486 70.3431 133.98 69.4127C134.489 68.4822 135.172 67.7626 136.03 67.2538C136.902 66.7304 137.862 66.4687 138.909 66.4687ZM143.074 72.6619C143.074 71.8333 142.899 71.1136 142.55 70.503C142.216 69.8924 141.773 69.4272 141.22 69.1074C140.668 68.7875 140.072 68.6276 139.432 68.6276C138.792 68.6276 138.196 68.7875 137.644 69.1074C137.091 69.4127 136.641 69.8706 136.292 70.4812C135.957 71.0773 135.79 71.7896 135.79 72.6183C135.79 73.447 135.957 74.1739 136.292 74.799C136.641 75.4241 137.091 75.9039 137.644 76.2383C138.211 76.5581 138.807 76.718 139.432 76.718C140.072 76.718 140.668 76.5581 141.22 76.2383C141.773 75.9184 142.216 75.4532 142.55 74.8426C142.899 74.2175 143.074 73.4906 143.074 72.6619ZM159.859 72.3784C159.859 72.8291 159.83 73.2362 159.772 73.5996H150.591C150.664 74.5591 151.02 75.3297 151.66 75.9112C152.3 76.4927 153.085 76.7835 154.015 76.7835C155.352 76.7835 156.297 76.2237 156.85 75.1043H159.532C159.169 76.2092 158.507 77.1178 157.548 77.8302C156.603 78.528 155.425 78.8769 154.015 78.8769C152.866 78.8769 151.834 78.6225 150.918 78.1137C150.017 77.5903 149.305 76.8634 148.781 75.933C148.272 74.988 148.018 73.8977 148.018 72.6619C148.018 71.4262 148.265 70.3431 148.76 69.4127C149.268 68.4677 149.973 67.7408 150.875 67.232C151.791 66.7231 152.837 66.4687 154.015 66.4687C155.149 66.4687 156.159 66.7159 157.046 67.2102C157.933 67.7045 158.624 68.4023 159.118 69.3036C159.612 70.1905 159.859 71.2154 159.859 72.3784ZM157.264 71.5934C157.25 70.6775 156.923 69.9433 156.283 69.3909C155.643 68.8384 154.851 68.5622 153.906 68.5622C153.048 68.5622 152.314 68.8384 151.703 69.3909C151.093 69.9288 150.729 70.6629 150.613 71.5934H157.264Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1540_17681"
              x="17.9069"
              y="39.3301"
              width="143.82"
              height="30.6744"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1.36701" />
              <feGaussianBlur stdDeviation="0.683504" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1540_17681"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1540_17681"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_1540_17681"
              x="61.5805"
              y="62.5439"
              width="99.6459"
              height="24.8024"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1.36701" />
              <feGaussianBlur stdDeviation="0.683504" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1540_17681"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1540_17681"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1540_17681"
              x1="201.26"
              y1="41.8845"
              x2="137.833"
              y2="36.0327"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFD086" />
              <stop offset="0.399636" stop-color="#C17700" />
              <stop offset="1" stop-color="#FFAB26" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1540_17681"
              x1="91.2477"
              y1="42.8846"
              x2="91.2477"
              y2="55.3585"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FFC15F" />
              <stop offset="1" stop-color="#FFAB26" />
            </linearGradient>
          </defs>
        </svg>
      </Row>
      {currentScreen === "email" && (
        <Row justify="center">
          <Col span={18}>
            <Row justify="center">
              <p
                style={{
                  color: "#fff",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                  letterSpacing: "1px",
                }}
              >
                Sign up with
              </p>
            </Row>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 12,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {" "}
              <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1rem" }}>
                    Email ID
                  </label>
                }
                style={{ marginBottom: "0.75rem" }}
                name="email"
                rules={[
                  {
                    message: "Please input your email!",
                  },
                ]}
              >
                {console.log(otpSentData)}
                <Input
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  placeholder="Enter your email"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#222534",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item>
              <Row justify="center">
                <ModalLoginButton loading={isLoading} onClick={otpSendAction}>
                  <span
                    style={{
                      fontSize: "1.2em",
                      color: "#020202",
                      position: "relative",
                      top: "2px",
                    }}
                  >
                    SIGN UP
                  </span>
                </ModalLoginButton>
              </Row>
              <Row justify="center">
                <p style={{ color: "#fff", fontSize: "1em" }}>
                  Already have an account?{" "}
                  <span
                    style={{ color: "#ffbe55", cursor: "pointer" }}
                    onClick={handleSwitchToLogin}
                  >
                    Login
                  </span>
                </p>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
      {currentScreen === "otp" && (
        <Row justify="center">
          <Col span={18}>
            <Row justify="center">
              <p
                style={{
                  color: "#fff",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                Please enter the OTP send to your email address
              </p>
            </Row>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 12,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "1rem",
                      textAlign: "center",
                    }}
                  >
                    OTP
                  </label>
                }
                name="otp"
                rules={[
                  {
                    message: "Please input your otp!",
                  },
                ]}
              >
                <Row justify="center">
                  <OtpInput
                    value={inutOtp}
                    onChange={(otp) => {
                      setinputOtp(otp);
                    }}
                    numInputs={4}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    inputStyle={{
                      border: "1px solid transparent",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      background: "#222534",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "400",
                      caretColor: "blue",
                    }}
                    focusStyle={{
                      border: "1px solid #020202",
                      outline: "none",
                    }}
                  />
                </Row>
              </Form.Item>
              <Row justify="center">
                <ModalLoginButton onClick={handleVerifyOTP}>
                  <span
                    style={{
                      fontSize: "1.2em",
                      color: "#020202",
                    }}
                  >
                    SUBMIT
                  </span>
                </ModalLoginButton>
              </Row>
              <Row justify="center">
                <ModalCancelButton
                  onClick={() => {
                    setCurrentScreen("email");
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.2em",
                      color: "#fff",
                    }}
                  >
                    CANCEL
                  </span>
                </ModalCancelButton>
              </Row>
              <Row justify="center">
                <p
                  style={{ color: "#fff", fontSize: "1rem" }}
                  onClick={handleSendOTP}
                >
                  Didn't get OTP?{" "}
                  <span style={{ color: "#ffbe55", cursor: "pointer" }}>
                    Resend
                  </span>
                </p>{" "}
              </Row>
            </Form>
          </Col>
        </Row>
      )}
      {currentScreen === "fullForm" && (
        <Row justify="center">
          <Col span={18}>
            <Row justify="center">
              <p
                style={{
                  color: "#fff",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                Please fill the form to complete sign up process
              </p>
            </Row>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{
                span: 18,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {/* <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1.2em" }}>
                    Username
                  </label>
                }
                name="username"
                rules={[
                  {
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                  }}
                  placeholder="Enter your username"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#5B5B5B",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item> */}

              <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1rem" }}>
                    First Name
                  </label>
                }
                name="firstName"
                rules={[
                  {
                    message: "Please input your firstName!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setFirstNameInput(e.target.value);
                  }}
                  placeholder="Enter your first name"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#222534",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1rem" }}>
                    Last Name
                  </label>
                }
                name="lastName"
                rules={[
                  {
                    message: "Please input your lastName!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setLastNameInput(e.target.value);
                  }}
                  placeholder="Enter your last name"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#222534",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1.2em" }}>
                    Password
                  </label>
                }
                name="password"
                rules={[
                  {
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                  }}
                  placeholder="Enter your password"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#222534",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label style={{ color: "#fff", fontSize: "1rem" }}>
                    Confirm Password
                  </label>
                }
                name="confirmPass"
                rules={[
                  {
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  onChange={(e) => {
                    setConfirmPasswordInput(e.target.value);
                  }}
                  placeholder="Enter your password again"
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    background: "#222534",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "6px",
                  }}
                />
              </Form.Item>
              {/* </Form.Item> */}
              <Row justify="center">
                <ModalLoginButton loading={isLoading} onClick={signupAction}>
                  <span
                    style={{
                      fontSize: "1.2em",
                      color: "#020202",
                    }}
                  >
                    SIGN UP
                  </span>
                </ModalLoginButton>
                <ModalCancelButton
                  onClick={() => {
                    setCurrentScreen("email");
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.2em",
                      color: "#fff",
                    }}
                  >
                    CANCEL
                  </span>
                </ModalCancelButton>
              </Row>
              <Row justify="center">
                <p style={{ color: "#fff", fontSize: "1em" }}>
                  Already have an account?{" "}
                  <span
                    style={{ color: "#ffbe55", cursor: "pointer" }}
                    onClick={handleSwitchToLogin}
                  >
                    Login
                  </span>
                </p>
              </Row>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default SignupModal;
