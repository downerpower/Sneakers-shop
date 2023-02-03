import AccountForm from "./AccountForm";

const LogIn = ({isLogged, userName, setUserName, setIsLogged}) => {
   return (
      <AccountForm
         isLogged={isLogged}
         setIsLogged={setIsLogged}
         userName={userName}
         setUserName={setUserName} />
   );
}

export default LogIn;