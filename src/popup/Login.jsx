import { useState } from "react";

function Login({ onLoginSuccess }) {

    const [id,setId] = useState('')
    const [error, setError] = useState('')

    const handleInputChange = (event) => {
        setId(event.target.value);
        setError('')
    };

    const fakeData = {
        "income":7000,
        "total":300,
        "categories":["Groceries","Clothing"],
        "category_amount":[200,100]
    }

    const handleClick = async () => {

        if (id) { // Only send the request if 'id' has a value
            
            onLoginSuccess(fakeData);
            // try {
            //     const res = await fetch("https://api.example.com/login", {
            //       method: "POST",
            //       body: JSON.stringify({ userId: id }),
            //       headers: { "Content-Type": "application/json" },
            //     });
          
            //     if (!res.ok) {
            //       setError(`Login failed. Status: ${res.status}`);
            //       return;
            //     }
            
                
          
            //   } catch (err) {
            //     console.error("Login error:", err);
            //     setError("Network error or invalid ID.");
            //   }
        }
    };

    return (
        <div className="container">
        <h1 id = "ext_name">SpendSmart</h1>   
        <input type="text" id="customerID"  onChange={handleInputChange} placeholder="Enter Customer ID"/>
        {error && (
            <p className="error_msg">
                {error}
            </p>
        )}
        <button onClick={handleClick}>Sign In</button>
      </div>
    );
  }
  
export default Login;