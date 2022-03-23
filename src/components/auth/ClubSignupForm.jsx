import { useEffect, useState } from "react";
import { signupClubService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const ClubSignupForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // ---------------------------------------------
  const [clubName, setClubName] = useState("");
  const [clubNIF, setClubNIF] = useState("");
  // ---------------------------------------------
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const club = {
      email,
      password,
      password2,
      clubName,
      clubNIF,
      role: "admin",
    };
    try {
      await signupClubService(club);
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
    return !email || !password || !password2 || !clubName || !clubNIF;
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
        <label>Club Name:</label>
        <input
          type={"text"}
          value={clubName}
          onChange={(e) => {
            setClubName(e.target.value);
          }}
        />
        <label>Club NIF:</label>
        <input
          type={"text"}
          value={clubNIF}
          onChange={(e) => {
            setClubNIF(e.target.value.toUpperCase());
          }}
        />
        <br />

        <button disabled={enabledIfFilled()}>Submit</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ClubSignupForm;
