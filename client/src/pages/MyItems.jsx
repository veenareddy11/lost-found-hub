import { useEffect, useState } from "react";
import axios from "axios";

function MyItems() {

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

const [updatedTitle, setUpdatedTitle] = useState("");

const [updatedDescription, setUpdatedDescription] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchMyItems();

  }, []);

  const fetchMyItems = async () => {

    try {

      const response = await axios.get(
        "https://lost-found-hub-1.onrender.com/api/items"
      );

      const myItems = response.data.filter(
        (item) => item.owner === user._id
      );

      setItems(myItems);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteItem = async (id) => {

    try {

      await axios.delete(
        `https://lost-found-hub-1.onrender.com/api/items/${id}`
      );

      fetchMyItems();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (item) => {

  setEditingItem(item);

  setUpdatedTitle(item.title);

  setUpdatedDescription(item.description);

};

const handleUpdate = async () => {

  try {

    await axios.put(
      `https://lost-found-hub-1.onrender.com/api/items/${editingItem._id}`,
      {
        title: updatedTitle,
        description: updatedDescription
      }
    );

    setEditingItem(null);

    fetchMyItems();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-5xl font-bold mb-10 text-gray-800">
        My Posted Items
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {items.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold mb-2">
                {item.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {item.description}
              </p>

              <p>
                <span className="font-bold">
                  Category:
                </span>{" "}
                {item.category}
              </p>

              <p>
                <span className="font-bold">
                  Location:
                </span>{" "}
                {item.location}
              </p>

              <button
                onClick={() => deleteItem(item._id)}
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              <button
  onClick={() => handleEdit(item)}
  className="mt-3 ml-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
>
  Edit
</button>

            </div>

          </div>

        ))}

      </div>

      {editingItem && (

  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    <div className="bg-white p-8 rounded-2xl w-96">

      <h2 className="text-2xl font-bold mb-5">
        Edit Item
      </h2>

      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <div className="flex gap-4">

        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={() => setEditingItem(null)}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

    </div>

  );

}

export default MyItems;