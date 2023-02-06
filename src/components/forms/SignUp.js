import AccountForm from "./AccountForm";

const SignUp = ({isLogged, userName, setUserName, setIsLogged}) => {
   return (
      <AccountForm
         isLogged={isLogged}
         setIsLogged={setIsLogged}
         userName={userName}
         setUserName={setUserName}
         isSignUpForm={true} />
   );
}

export default SignUp;