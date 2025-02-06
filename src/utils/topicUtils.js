import axios from "axios";
import Swal from "sweetalert2";

// const updateTopic = async (newTopic) => {
//     try {
//       const topicForm = {
//         name: topicObj.name,
//         visibility: newTopic.visibility,
//         newName: newTopic.name
//       }

//       const topic = await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateTopic`, topicForm);

//       getTopicData()
//       handleEditModalClose()
//       Swal.fire({
//         title: "Updated Topic Successfully",
//         icon: "success",
//       });
//     }
//     catch (err) {
//       Swal.fire({
//         title: err.response.data,
//         icon: "error",
//       });
//     }
//  }

export const testTopic = async (topicObj, getTopicData) => {
  return "shyam";
};

export const deleteTopic = async (name, getTopicData) => {
  try {
    console.log(name);
    const topic = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/deleteTopic`,
      { name: name }
    );
    getTopicData();
    Swal.fire({
      title: "Deleted Topic Successfully",
      icon: "success",
    });
  } catch (err) {
    Swal.fire({
      title: err.response.data,
      icon: "error",
    });
  }
};
