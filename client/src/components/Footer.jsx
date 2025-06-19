import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t p-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} Developed by{" "}
      <a
        href="https://facebook.com/rony.ahmmod.9"
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Engr. Md. Rony Ahmmod
      </a>
    </footer>
  );
};

export default Footer;
