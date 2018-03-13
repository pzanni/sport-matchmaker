import React from "react";
import { auth } from "../../firebase/controller";

const SignOut = () => {
  return (
    <div>
      <button onClick={auth.signOut}>Sign out</button>
    </div>
  );
};

export default SignOut;
