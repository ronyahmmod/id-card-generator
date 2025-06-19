import React from "react";
import DataGrid from "../components/DataGrid/DataGrid";
import { data } from "../components/DataGrid/data"; // your JSON array
import { columns } from "../components/DataGrid/column"; // headers

export default function SampleGrid() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Custom Data Grid</h1>
      <DataGrid data={data} columns={columns} pageSize={5} />
    </div>
  );
}
