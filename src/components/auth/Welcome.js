import React from "react";

export default function Welcome() {
  return (
    <section className="section auth">
      <div className="container">
        <h1>Welcome!</h1>
        <p>
          You have successfully registered a new account. A verification link
          has been sent to your email. Please verify your email before logging
          in.
        </p>
      </div>
    </section>
  );
}
