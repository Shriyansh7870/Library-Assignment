import { fetchBooks } from "../redux/slices/bookSlice";
import { motion } from "framer-motion";
import { Book, Globe, Calendar, Languages, ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookInventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [displayedBooks, setDisplayedBooks] = React.useState([]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const loadMoreBooks = () => {
    const nextBooks = books.slice(0, page * 12);
    setDisplayedBooks(nextBooks);
    setPage((prevPage) => prevPage + 1);

    if (nextBooks.length >= books.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (books.length > 0) {
      loadMoreBooks();
    }
  }, [books]);

  const BookCard = ({ book }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={book.imageLink || "/api/placeholder/400/300"}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-lg truncate">
            {book.title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="w-4 h-4 text-blue-600" />
            <span className="text-gray-700 font-medium truncate">
              {book.author}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600">{book.year}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600">{book.country}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600">{book.language}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{book.about}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-gray-500">{book.pages} pages</span>
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </motion.div>
  );

  if (status === "loading" && displayedBooks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Book Inventory</h1>
            <div className="text-gray-600">{books.length} books available</div>
          </div>
        </div>

        <InfiniteScroll
          dataLength={displayedBooks.length}
          next={loadMoreBooks}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-4">
              No more books to load.
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedBooks.map((book, index) => (
              <BookCard key={`${book.title}-${index}`} book={book} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default BookInventory;
