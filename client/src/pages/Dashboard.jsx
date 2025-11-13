import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySubscription } from "../features/subscriptionSlice.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subscription, loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    if (user) {
      dispatch(fetchMySubscription());
    }
  }, [dispatch, user]);

  if (!user) {
    return <p className="p-6">Please login to view your dashboard.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>

      {loading && <p>Loading subscription...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!subscription ? (
        <p>You do not have an active subscription yet. Go to <a href="/plans" className="text-blue-500 underline">Plans</a> to subscribe.</p>
      ) : (
        <div className="border p-4 rounded shadow-md max-w-md">
          <h3 className="text-xl font-semibold mb-2">{subscription?.plan?.name}</h3>
          <p className="mb-1">Price: ${subscription?.plan?.price}</p>
          <p className="mb-1">Duration: {subscription?.plan?.duration} days</p>
          <p className="mb-1">Start Date: {new Date(subscription?.start_date).toLocaleDateString()}</p>
          <p className="mb-1">End Date: {new Date(subscription?.end_date).toLocaleDateString()}</p>
          <p className={`font-semibold mt-2 ${subscription?.status === "active" ? "text-green-600" : "text-red-600"}`}>
            Status: {subscription.status.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
