import { useState } from "react";

import SignUpForm from "../components/forms/signup";
import SignInForm from "../components/forms/signin";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
      </button>
    </>
  );
}
