import Login from "./Login";
import DisplayPage from "./DisplayPage";
import { useState } from "react";

function App() {

  const [userData, setUserData] = useState(null); // Will store the token + user

  // Called from Login when login succeeds
  const handleLoginSuccess = (data) => {
    setUserData(data);
  };

  return (
    <div>
      {userData ? (
        <DisplayPage userData={userData} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
  
}
  
  
  
export default App;