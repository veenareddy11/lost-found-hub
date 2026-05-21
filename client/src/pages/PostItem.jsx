import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function PostItem() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user) {
  return <Navigate to="/login" />;
}

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      data.append("location", location);
      data.append("image", image);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      data.append("owner", user._id);

      await axios.post(
  "https://lost-found-hub-1.onrender.com/api/items/create",
  data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      alert("Item posted successfully");

      window.location.href = "/";

    } catch (error) {

  console.log(error);

  console.log(error.response);

  alert(error.response?.data?.message || "Upload failed");

}

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl"
      >

        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Post Lost Item
        </h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl h-32"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-4 mb-5 border rounded-xl"
          required
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-5"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition"
        >
          Post Item
        </button>

      </form>

    </div>

  );

}

export default PostItem;