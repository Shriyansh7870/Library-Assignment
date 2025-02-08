import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 max-w-xl"
        >
          <div className="text-center lg:text-left space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Start Your Journey
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-gray-600 text-lg">
                Join our community and discover amazing features:
              </p>
              <div className="space-y-3">
                {[
                  "Personalized Experience",
                  "Real-time Updates",
                  "Secure Platform",
                  "Premium Support",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:w-1/2 w-full max-w-md"
        >
          <div className=" rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full transform translate-x-20 -translate-y-20 opacity-50" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full transform -translate-x-16 translate-y-16 opacity-50" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Create Account
              </h2>
              <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
