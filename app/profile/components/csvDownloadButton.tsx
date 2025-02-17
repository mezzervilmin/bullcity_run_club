"use client";
import { getMemberCSV } from "@/app/actions";
import { useState } from "react";
import { Spinner } from "./spinner";

export const CSVDownloadButton = () => {
  const [loading, setLoading] = useState(false);
  const downloadFile = async () => {
    setLoading(true);
    const csv = await getMemberCSV();
    if (!csv.error && csv.file) {
      const link = document.createElement("a");
      link.href = "data:text/csv," + encodeURIComponent(csv.file);

      const date = new Date();
      const dateString = date.toISOString().split("T")[0];
      link.download = `run_club_visits${dateString}.csv`;
      link.click();
      link.remove();
    }
    setLoading(false);
  };
  return (
    <button
      onClick={downloadFile}
      className="bg-yellow-500 hover:bg-yellow-800 text-white font-bold py-2 w-full rounded"
    >
      {loading ? <Spinner /> : "Download Member CSV"}
    </button>
  );
};
export default CSVDownloadButton;
