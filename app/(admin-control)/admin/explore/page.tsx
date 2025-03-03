"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ExploreAdminPage() {
  const [exploreData, setExploreData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'ongoing', 'completed'
  const [filterYear, setFilterYear] = useState("all"); // 'all', '1st Year', '2nd Year', '3rd Year'

  const supabase = createClient();

  // Fetch all data from the explore table
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("explore").select("*");

      if (error) {
        setError(error.message);
      } else {
        setExploreData(data);
        setFilteredData(data); // Initialize filtered data
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  // Filter and search data
  useEffect(() => {
    let data = exploreData;

    // Apply status filter
    if (filterStatus !== "all") {
      data = data.filter((item) => item.status === filterStatus);
    }

    // Apply year filter
    if (filterYear !== "all") {
      data = data.filter((item) => item.year === filterYear);
    }

    // Apply search query
    if (searchQuery) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.phone_no.includes(searchQuery) ||
          item.year.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(data);
  }, [searchQuery, filterStatus, filterYear, exploreData]);

  // Toggle status between ongoing and completed
  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ongoing" ? "completed" : "ongoing";
    const { error } = await supabase
      .from("explore")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setExploreData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Explore Data</h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, phone, or year..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Years</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Phone No
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Year
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Toggle Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.phone_no}</td>
                <td className="px-6 py-4">{item.year}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      item.status === "ongoing"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.status === "completed"}
                      onChange={() => toggleStatus(item.id, item.status)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-gray-600 peer-focus:ring-4 peer-focus:ring-gray-300 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
