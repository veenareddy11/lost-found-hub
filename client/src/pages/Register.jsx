import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          apartmentNumber
        }
      );

      alert("Registration successful");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl"
      >

        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <input
          type="text"
          placeholder="Apartment Number"
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;