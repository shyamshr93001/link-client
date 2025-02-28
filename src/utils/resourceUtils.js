import { getResourceAction } from "../redux/actions/resourceActions";
import { RESOURCE_CREATED_SUCCESS } from "../redux/constants/resourceConstants";
import { axiosInstance } from "./axiosUtils";
import { handleError, handleSuccess } from "./commonUtils";

export const createResource = async (userData, values, dispatch) => {
  try {
    values.createdBy = userData.username;
    await axiosInstance.post(
      `${process.env.REACT_APP_SERVER_URL}/resources`,
      values
    );
    dispatch(getResourceData());
    handleSuccess(RESOURCE_CREATED_SUCCESS);
  } catch (err) {
    handleError(err);
  }
};

export const getResourceData = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/resources");
    dispatch(getResourceAction(res.data));
  } catch (err) {
    handleError(err)
  }
};