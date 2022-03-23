import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>
        We sent to your email a verification link, if you cannot find it, please
        search it on SPAM folder.
      </h3>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Go to Login Page
      </button>
    </div>
  );
};

export default VerifyEmail;
