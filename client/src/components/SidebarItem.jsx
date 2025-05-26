import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarItem = ({ item, currentPath }) => {
  const [open, setOpen] = useState(false);

  const isActive = (path) => currentPath === path;

  if (item.children) {
    return (
      <div className="mb-2">
        <div
          className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="text-lg" />}
            <span>{item.label}</span>
          </div>
          <span>{open ? "−" : "+"}</span>
        </div>

        {open && (
          <div className="pl-6">
            {item.children.map((child) => (
              <Link
                to={child.path}
                key={child.label}
                className={`block p-2 text-sm rounded hover:bg-blue-100 ${
                  isActive(child.path) ? "bg-blue-100 font-medium" : ""
                }`}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`flex items-center gap-2 p-2 rounded hover:bg-blue-100 mb-2 ${
        isActive(item.path) ? "bg-blue-100 font-semibold" : ""
      }`}
    >
      {item.icon && <item.icon className="text-lg" />}
      <span>{item.label}</span>
    </Link>
  );
};
