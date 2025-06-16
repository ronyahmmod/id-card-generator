import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OauthSuccess = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false); // 👈 this tracks if logic has already run

  useEffect(() => {
    if (hasRun.current) return; // 👈 skip second effect run
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email, role }));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Signing in with Google. Please wait...</p>;
};

export default OauthSuccess;
