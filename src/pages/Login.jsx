// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../auth/firebase";

// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from "firebase/auth";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const provider = new GoogleAuthProvider();

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     // Try logging in first
//     await signInWithEmailAndPassword(auth, email, password);
//     console.log("Login successful");
//     navigate("/");
//   } catch (error) {
//     if (error.code === "auth/user-not-found") {
//       // If user not found, create a new user
//       try {
//         await createUserWithEmailAndPassword(auth, email, password);
//         console.log("Signup successful");
//         navigate("/");
//       } catch (signupError) {
//         console.error("Signup error:", signupError.message);
//         alert(signupError.message);
//       }
//     } else if (error.code === "auth/wrong-password" || error.code === "auth/email-already-in-use") {
//       alert("Incorrect password or account already exists.");
//     } else {
//       console.error("Login error:", error.message);
//       alert(error.message);
//     }
//   }
// };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, provider);
//       console.log("Google Login successful");
//       navigate("/");
//     } catch (error) {
//       console.error("Google Login error:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-md w-full bg-white p-8 rounded shadow">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login / Signup</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
//           >
//             Login / Signup
//           </button>
//         </form>

//         <div className="text-center my-4 text-gray-500">or</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
//         >
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;



// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../auth/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
        <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;
