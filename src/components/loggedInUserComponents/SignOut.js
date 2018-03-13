import React from "react";
import { auth } from "../../firebase/controller";

const SignOut = () => {
  return (
    <div>
      <button onClick={signOut()}>Sign out</button>
    </div>
  );
};
