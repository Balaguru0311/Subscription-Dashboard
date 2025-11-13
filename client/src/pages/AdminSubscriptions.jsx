import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllSubscriptions } from "../api/subscriptionApi.js";

const AdminSubscriptions = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === "admin") {
      const fetchSubscriptions = async () => {
        setLoading(true);
        try {
          const data = await getAllSubscriptions(user.token);
          setSubscriptions(data);
        } catch (err) {
          setError(err.response?.data?.message || "Error fetching subscriptions");
        } finally {
          setLoading(false);
        }
      };
      fetchSubscriptions();
    }
  }, [user]);

  if (!user) return <p className="p-6">Please login as admin to view this page.</p>;
  if (user.role !== "admin") return <p className="p-6 text-red-500">Access denied. Admins only.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All User Subscriptions</h2>

      {loading && <p>Loading subscriptions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub._id} className="text-center">
                <td className="border px-4 py-2">{sub.user.name}</td>
                <td className="border px-4 py-2">{sub.plan.name}</td>
                <td className="border px-4 py-2">{new Date(sub.start_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(sub.end_date).toLocaleDateString()}</td>
                <td className={`border px-4 py-2 font-semibold ${sub.status === "active" ? "text-green-600" : "text-red-600"}`}>
                  {sub.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
