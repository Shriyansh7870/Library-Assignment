import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col lg:flex-row">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0  opacity-90" />
        <img
          src="/library.webp"
          alt="Login background"
          className="h-64 lg:h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-8"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Login
          </h2>
          <div className=" rounded-lg ">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
