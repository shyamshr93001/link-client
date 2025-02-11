import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToSubs, unsubTopic } from "../../utils/subscribeUtils";

const Subscribe = ({ topicObj }) => {
  const dispatch = useDispatch();
  const subsReducer = useSelector((store) => store.subscriptionReducer);
  const userReducer = useSelector((store) => store.user);

  const { subsData } = subsReducer;
  const { userData } = userReducer;

  const [seriousness, setSeriousness] = useState("Casual");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const createFormData = () => ({
    topic: topicObj.name,
    user: userData.username,
    seriousness: seriousness,
  });

  const handleSubscribe = async () => { 
    const formData = createFormData();
    await addToSubs(formData, dispatch);
  };

  const handleUnSubscribe = async () => {
    const formData = createFormData();
    await unsubTopic(formData, dispatch);
  };

  const getSubsUI = () => {
    setIsSubscribed(
      subsData.some(
        (sub) => sub.user === userData.username && sub.topic === topicObj.name
      )
    );
  };

  useEffect(() => {
    getSubsUI();
  }, [subsData]);

  return (
    <div>
      <label>
        <select
          className="form-select"
          value={seriousness}
          onChange={(e) => setSeriousness(e.target.value)}
        >
          <option value="Casual">Casual</option>
          <option value="Serious">Serious</option>
          <option value="Very Serious">Very Serious</option>
        </select>
      </label>
      {!isSubscribed && (
        <button className="btn btn-primary" onClick={handleSubscribe}>
          Subscribe
        </button>
      )}
      {isSubscribed && (
        <button className="btn btn-danger" onClick={handleUnSubscribe}>
          Unsubscribe
        </button>
      )}
    </div>
  );
};

export default Subscribe;
