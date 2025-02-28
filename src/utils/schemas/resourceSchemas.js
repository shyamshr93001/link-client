import * as Yup from "yup";

export const addResourceSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
  description: Yup.string().optional(),
  url: Yup.string().url("Invalid URL").optional(),
});
