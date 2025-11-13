import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../api/planApi.js";
import { subscribePlan, fetchMySubscription } from "../features/subscriptionSlice.js";

const Plans = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { subscription, loading, error } = useSelector((state) => state.subscription);

  const [plans, setPlans] = React.useState([]);

  useEffect(() => {
    // Fetch plans from backend
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlans();

    // Fetch user's current subscription
    if (user) dispatch(fetchMySubscription());
  }, [dispatch, user]);

  const handleSubscribe = async (planId) => {
    if (!user) return alert("Please login first!");
    const resultAction = await dispatch(subscribePlan({ planId, token: user.token }));

    if (subscribePlan.fulfilled.match(resultAction)) {
      dispatch(fetchMySubscription());
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="mb-2">Price: ${plan.price}</p>
            <p className="mb-2">Duration: {plan.duration} days</p>
            <ul className="mb-4 list-disc list-inside">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            {subscription && subscription?.plan?._id === plan._id ? (
              <button className="w-full bg-gray-400 text-white p-2 rounded" disabled>
                Subscribed
              </button>
            ) : (
              <button
                onClick={() => handleSubscribe(plan._id)}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
