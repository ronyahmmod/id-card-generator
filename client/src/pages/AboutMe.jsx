import React from "react";
import { useAuth } from "../contexts/AuthContext";

const AboutMe = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.profilePhoto}
          alt={user.name}
          className="w-28 h-28 rounded-full shadow-md border-2 border-gray-300 dark:border-gray-700"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Role: <span className="capitalize">{user.role}</span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            📧 Email: {user.email}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            🌐 Provider: {user.provider}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            🕒 Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {user.facebookId && (
            <a
              href={`https://facebook.com/rony.ahmmod`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              🔗 Facebook Profile
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
