import * as Yup from "yup";

export const createTopicSchema = Yup.object({
  name: Yup.string().required("Topic name is required"),
  visibility: Yup.string().required("Visibility is required"),
});

export const editTopicSchema = Yup.object({
  newName: Yup.string().required("New name is required"),
  visibility: Yup.string().required("Visibility is required"),
});
