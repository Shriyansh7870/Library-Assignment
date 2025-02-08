import EditBookForm from "./components/EditBookForm";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import BookInventory from "./components/bookInventery";
import ContactForm from "./components/contatct";
import Home from "./pages/Home";
import { useAuth, SignIn, SignUp } from "@clerk/clerk-react";
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/sign-in" />;

  return children;
};

function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoaded && isSignedIn && window.location.pathname === "/sign-in") {
      navigate("/");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route path="/sign-in/sso-callback" element={<SignIn />} />
      <Route path="/sign-up/sso-callback" element={<SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-book/:_id"
        element={
          <ProtectedRoute>
            <EditBookForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <BookInventory />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
