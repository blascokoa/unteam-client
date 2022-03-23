import { useState } from "react";
import { checkCodeRecoverPassword } from "../../services/auth.services";

const RecoverPasswordField = (props) => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verifyCodeResult = await checkCodeRecoverPassword(code);
    console.log(verifyCodeResult);
    props.handlePasswordForm(verifyCodeResult);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Please write here the restoration code:</label>
        <input
          type={"text"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RecoverPasswordField;
