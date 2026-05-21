import { useEffect, useState } from "react";
import axios from "axios";

function Home() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchItems();

  }, []);

  const fetchItems = async () => {

    try {

      const response = await axios.get(
        'https://lost-found-hub-1.onrender.com/api/items'
      );

      setItems(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleClaim = async (id) => {

    if (!user) {

      alert("Please login to claim items");

      return;

    }

    try {

      await axios.put(
        `https://lost-found-hub-1.onrender.com/api/items/claim/${id}`,
        {
          userId: user._id
        }
      );

      fetchItems();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen overflow-hidden text-white bg-linear-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">

      {/* HERO SECTION */}

      <div className="relative px-6 md:px-16 py-20">

        {/* Glow Effects */}

        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 opacity-20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-[120px] rounded-full"></div>

        <div className="relative z-10 text-center">

          <div className="inline-block px-6 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-lg mb-8">

            <p className="text-sm text-gray-200">
              Welcome to Lost & Found Hub
            </p>

          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">

            Lost Something?

            <br />

            <span className="bg-linear-to-r from-pink-400 via-orange-300 to-yellow-300 bg-clip-text text-transparent">
              Find It Here
            </span>

          </h1>

          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed mb-14">

            A smart community platform to report, search,
            recover, and manage lost belongings easily
            within your apartment or campus.

          </p>

          {/* FEATURE CARDS */}

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">

            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-500">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h2 className="text-2xl font-bold mb-3">
                Smart Search
              </h2>

              <p className="text-gray-300">
                Easily browse and discover lost items
                posted by the community.
              </p>

            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-500">

              <div className="text-5xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-bold mb-3">
                Easy Reporting
              </h2>

              <p className="text-gray-300">
                Upload item details and images
                securely in seconds.
              </p>

            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition duration-500">

              <div className="text-5xl mb-4">
                🤝
              </div>

              <h2 className="text-2xl font-bold mb-3">
                Faster Recovery
              </h2>

              <p className="text-gray-300">
                Connect owners with finders
                efficiently and safely.
              </p>

            </div>

          </div>

          {/* SEARCH BAR */}

          <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-4xl font-bold mb-8">

              Search for{" "}

              <span className="bg-linear-to-r from-pink-400 to-orange-300 bg-clip-text text-transparent">
                lost items
              </span>

            </h2>

            <input
              type="text"
              placeholder="Search by title, category or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black/20 border border-white/10 outline-none text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
            />

          </div>

        </div>

      </div>

      {/* ITEMS SECTION */}

      <div className="px-6 md:px-16 pb-20 relative z-10">

        <h2 className="text-5xl font-bold mb-12">

          Recently Lost Items

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

          {filteredItems.map((item) => (

            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-3 hover:scale-105 transition duration-500 shadow-2xl"
            >

              <div className="overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-6">

                <h2 className="text-3xl font-bold mb-3 text-white">
                  {item.title}
                </h2>

                <p className="text-gray-300 mb-5">
                  {item.description}
                </p>

                <div className="space-y-2 text-gray-200 mb-5">

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

                </div>

                {/* BUTTONS */}

                <div className="mt-5">

                  {item.status === "Unclaimed" ? (

                    <button
                      onClick={() => handleClaim(item._id)}
                      className="w-full bg-linear-to-r from-pink-500 to-orange-400 py-3 rounded-2xl font-bold hover:scale-105 transition"
                    >
                      Claim Item
                    </button>

                  ) : item.claimedBy?._id?.toString() === user?._id?.toString() ? (

                    <button
                      onClick={() => handleClaim(item._id)}
                      className="w-full bg-linear-to-r from-yellow-500 to-orange-500 py-3 rounded-2xl font-bold hover:scale-105 transition"
                    >
                      Undo Claim
                    </button>

                  ) : (

                    <div className="w-full bg-red-500/20 border border-red-500 text-red-300 py-3 rounded-2xl font-bold text-center">

                      Already Claimed

                    </div>

                  )}

                </div>

                {/* STATUS */}

                <div className="mt-5 text-center">

                  <span
                    className={
                      item.status === "Claimed"
                        ? "text-green-400 font-bold"
                        : "text-yellow-300 font-bold"
                    }
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Home;