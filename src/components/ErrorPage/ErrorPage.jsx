import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./errorPage.css";

function ErrorPage() {
  const [homepage, setHomepage] = useState(false);

  return (
    <div className="error-page">
      <div>
        <h1>Ooops!</h1>
        <p>404 - Page Not Found</p>
        {homepage && <Navigate to="/" replace={true} />}
        <button onClick={() => setHomepage(true)}>Go to homepage</button>
      </div>
    </div>
  );
}

export default ErrorPage;
