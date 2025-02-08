import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBookForm = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://server-library-kmon.onrender.com/api/books/${_id}`
        );
        const data = await response.json();
        if (response.ok) {
          setBook(data);
        } else {
          toast.error("Failed to fetch book details.");
        }
      } catch (error) {
        toast.error("Error fetching the book.");
        console.error("Error:", error);
      }
    };

    fetchBook();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBook = {
      title: book.title,
      language: book.language,
      imageLink: book.imageLink,
      pages: book.pages,
    };

    try {
      const response = await fetch(
        `https://server-library-kmon.onrender.com/api/books/${_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        }
      );

      if (response.ok) {
        toast.success("Book updated successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error("Failed to update book details.");
      }
    } catch (error) {
      toast.error("Error updating the book.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!book || Object.keys(book).length === 0) return <div>Loading...</div>;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 mb-12">
          Edit Book Inventory
        </h1>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Edit Book
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gray-600">
                Language
              </label>
              <input
                type="text"
                name="language"
                value={book.language}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gray-600">
                Image URL
              </label>
              <input
                type="text"
                name="imageLink"
                value={book.imageLink}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1 text-gray-600">
                Pages
              </label>
              <input
                type="number"
                name="pages"
                value={book.pages}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBookForm;
