import { useState } from "react";

const NewPasswordField = (props) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.changePassword(password, password2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Password:</label>
      <input
        type={"password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <label>Repeat your password:</label>
      <input
        type={"password"}
        value={password2}
        onChange={(e) => {
          setPassword2(e.target.value);
        }}
      />

      <button>Submit</button>
    </form>
  );
};

export default NewPasswordField;
