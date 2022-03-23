import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signupClubService,
  signupMemberService,
} from "../../services/auth.services";

const MemberSignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // ---------------------------------------------
  const [clubCode, setClubCode] = useState("");
  // ---------------------------------------------
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password, password2, clubCode, role: "member" };
    try {
      await signupMemberService(user);
      navigate("/signup/verify");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const enabledIfFilled = () => {
    return !email || !password || !password2 || !clubCode;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type={"text"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.toLowerCase());
          }}
        />
        <label>Password:</label>
        <input
          type={"password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type={"password"}
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <hr />
        <label>Club Code:</label>
        <input
          type={"text"}
          value={clubCode}
          onChange={(e) => {
            setClubCode(e.target.value.toUpperCase());
          }}
        />
        <br />

        <button disabled={enabledIfFilled()}>Submit</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default MemberSignupForm;
