import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const handleError = (err) => {
  Swal.fire({ title: err.response?.data, icon: "error" });
};

export const handleSuccess = (message) => {
  toast.success(message);
};
