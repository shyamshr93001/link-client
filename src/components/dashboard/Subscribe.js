import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubs,
  createFormData,
  unSubTopic,
} from "../../utils/subscribeUtils";

const Subscribe = ({ topicObj }) => {
  const dispatch = useDispatch();
  const subsReducer = useSelector((store) => store.subscriptionReducer);
  const userReducer = useSelector((store) => store.user);

  const { subsData } = subsReducer;
  const { userData } = userReducer;

  const [seriousness, setSeriousness] = useState("Casual");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const formData = createFormData(
      topicObj.name,
      userData.username,
      seriousness
    );
    await addToSubs(formData, dispatch);
  };

  const handleUnSubscribe = async () => {
    const formData = createFormData(
      topicObj.name,
      userData.username,
      seriousness
    );
    await unSubTopic(formData, dispatch);
    getSubsUI();
  };

  const getSubsUI = () => {
   
    setIsSubscribed(
      subsData.some(
        (sub) =>
          sub.user.username === userData.username &&
          sub.topic.name === topicObj.name
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
