"use client";
import { useState } from "react";
import { Spinner } from "./spinner";
import { clearVisits } from "@/app/actions";

export const ClearVisitsButton = () => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const clearVisitClick = async () => {
    setLoading(true);
    await clearVisits();
    setLoading(false);
    setConfirmed(false);
  };

  return confirmed ? (
    <button
      onClick={clearVisitClick}
      className="bg-red-500 hover:bg-red-900 text-white font-bold p-4 rounded"
    >
      {loading ? <Spinner /> : "Confirm Reset"}
    </button>
  ) : (
    <button
      onClick={() => setConfirmed(true)}
      className="bg-blue-800 hover:bg-blue-900 text-white font-bold p-4 rounded"
    >
      {loading ? <Spinner /> : "Reset ALL Visits"}
    </button>
  );
};
