import { fetchBooks, deleteBook } from "../redux/slices/bookSlice";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, status, error } = useSelector((state) => state.books);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil((books?.length || 0) / booksPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleEditClick = (bookId, e) => {
    e.stopPropagation();
    navigate(`/edit-book/${bookId}`);
  };

  const handleDeleteClick = (bookId, e) => {
    e.stopPropagation();
    setBookToDelete(bookId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete)).then(() => {
        dispatch(fetchBooks());
      });
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <div className="text-lg text-gray-600 font-medium">
            Loading books...
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Please wait while we fetch the data
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-center text-red-600">
          <div className="text-xl font-semibold mb-2">Error Loading Books</div>
          <div className="text-base">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold">
              Image
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold">
              Title
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold">
              Author
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold">
              Language
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold">
              Pages
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks?.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100 transition">
              <td className="px-4 py-4 border-b border-gray-300">
                <img
                  src={book.imageLink}
                  alt="Book Cover"
                  className="w-16 h-16 rounded-md cursor-pointer hover:opacity-75 transition"
                />
              </td>
              <td className="px-4 py-4 border-b border-gray-300 cursor-pointer hover:text-blue-600 transition">
                {book?.title}
              </td>
              <td className="px-4 py-4 border-b border-gray-300">
                {book?.author}
              </td>
              <td className="px-4 py-4 border-b border-gray-300">
                {book?.language}
              </td>
              <td className="px-4 py-4 border-b border-gray-300">
                {book?.pages}
              </td>
              <td className="px-4 py-4 border-b border-gray-300 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-xl transition"
                    onClick={(e) => handleEditClick(book._id, e)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl transition"
                    onClick={(e) => handleDeleteClick(book._id, e)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 rounded-md ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm md:max-w-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-center text-sm md:text-base">
              Are you sure you want to delete this book?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full sm:w-auto"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-full sm:w-auto"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
