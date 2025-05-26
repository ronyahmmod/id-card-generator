import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeList = () => {
  const [employes, setEmployes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEmploye, setSelectedEmploye] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employe List</h2>
      </div>
    </div>
  );
};

export default EmployeList;
