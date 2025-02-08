import BookList from "../components/BookList";
import Navbar from "../components/Navbar";
import { fetchBooks, addBook } from "../redux/slices/bookSlice";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    about: "",
  });
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleAddInventoryClick = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBook(newBook)).unwrap();
      setIsPopupOpen(false);
      setNewBook({
        author: "",
        country: "",
        imageLink: "",
        language: "",
        link: "",
        pages: "",
        title: "",
        year: "",
        about: "",
      });
      toast.success("Book successfully added!");
    } catch (error) {
      toast.error("Failed to add the book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <Navbar handleSidebarToggle={handleSidebarToggle} />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        } lg:ml-64`}
      >
        <div className="sticky top-0 z-10 bg-white shadow-sm lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={handleSidebarToggle}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">BookTracker</h1>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-center sm:text-left">
              Book Inventory
            </h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
              onClick={handleAddInventoryClick}
            >
              Add Inventory
            </button>
          </div>

          {/* Book List */}
          <div className="-mx-2 sm:mx-0">
            <BookList />
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Add Book</h2>
                <button
                  onClick={closePopup}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Language</label>
                    <input
                      type="text"
                      name="language"
                      value={newBook.language}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={newBook.country}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Year</label>
                    <input
                      type="number"
                      name="year"
                      value={newBook.year}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageLink"
                      value={newBook.imageLink}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Pages</label>
                    <input
                      type="number"
                      name="pages"
                      value={newBook.pages}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Link</label>
                    <input
                      type="text"
                      name="link"
                      value={newBook.link}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">About</label>
                  <textarea
                    name="about"
                    value={newBook.about}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
