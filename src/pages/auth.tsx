import { useState } from "react";

import SignUpForm from "../components/forms/signup";
import SignInForm from "../components/forms/signin";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-eminence-300 to-eminence-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div className="flex flex-col justify-between relative h-[80vh] w-[40vw] px-4 py-10 bg-eminence-50 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold text-eminence-600 uppercase">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>

          {isSignUp ? <SignUpForm /> : <SignInForm />}

          <button className="text-eminence-400 underline" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
}
