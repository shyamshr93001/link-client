import { GET_RESOURCE } from "../constants/resourceConstants";

export const getResourceAction = (resourceData) => {
  return {
    type: GET_RESOURCE,
    payload: resourceData,
  };
};