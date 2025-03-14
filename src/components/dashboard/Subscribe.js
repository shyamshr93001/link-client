import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSubs,
  createFormData,
  unSubTopic,
} from "../../utils/subscribeUtils";

const Subscribe = ({ topicObj }) => {
  const dispatch = useDispatch();
  const { subsData } = useSelector((store) => store.subscriptionReducer);
  const { userData } = useSelector((store) => store.user);
  
  const [seriousness, setSeriousness] = useState("Casual");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const formData = createFormData(
    topicObj.name,
    userData.username,
    seriousness
  );

  const handleSubscribe = async () => {
    await addToSubs(formData, dispatch);
  };

  const handleUnSubscribe = async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsData]);

  return (
    <div className="mt-3">
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
