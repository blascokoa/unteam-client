import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyEmail } from "../../services/auth.services";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [codeValid, setCodeValid] = useState(false);

  const { code } = useParams();

  const getCodeResult = async (code) => {
    const result = await verifyEmail({ code: code });
    setCodeValid(result.data.res);
  };

  useEffect(async () => {
    await getCodeResult(code);
    if (codeValid) {
      // TODO add the setTimeOut here
      setTimeout(() => {
        navigate("/login");
      });
    }
  }, [code]);

  return (
    <div>
      {code && <p>We received your code!</p>}
      <br />
      {codeValid && <p>You will ve redirected to login page in 2 seconds</p>}
      {!codeValid && <p>Sorry, the code introduced is not valid.</p>}
    </div>
  );
};

export default ConfirmEmail;
