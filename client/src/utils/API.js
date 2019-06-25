import axios from "axios";

export default {
  // Gets all users
  getUsers: () => {
    return axios.get("/api/user");
  },

  findUser: () => {
    return axios.get("api/user/:id");
  }
};
