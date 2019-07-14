import axios from "axios";

export default {
  // *** USER API METHODS

  // This method will return all users from the database
  getAllUsers: () => {
    return axios.get("/all/users");
  },

  getAllUsername: () => {
    return axios.get("/all/username");
  },

  // This method will return a single user
  getUser: id => {
    return axios.get("/user/" + id);
  },

  getUserByEmail: email => {
    return axios.get("/user/email/" + email);
  },

  getUserByGoal: id => {
    return axios.get("/user/goal/" + id);
  },

  // This method will add a user to the database
  addUser: data => {
    return axios.post("/add/user", {
      data
    });
  },

  // This method will edit info for a user selected by id
  // The data object needs to have colName, and info
  editUser: (id, data) => {
    console.log(data);
    return axios.put("/user/" + id, {
      data
    });
  },

  // *** GOAL API METHODS

  // This method will return all the goals that a user owns
  // Note the id parameter is the userId
  getAllGoals: id => {
    return axios.get("/all/goals/" + id);
  },

  // This route will return a single goal queried on goalId
  getGoal: id => {
    return axios.get("/goal/" + id);
  },

  getBasicGoal: id => {
    return axios.get("/goal/basic/" + id);
  },

  // This method will add a goal to the database
  // The data object being passed in needs to have name, category, dueDate, and UserId
  addGoal: data => {
    return axios.post("/add/goal", {
      data
    });
  },

  // This method will allow a user to edit a specific goal selected by id
  // The data object needs to contain colName and info
  editGoal: (id, data) => {
    return axios.put("/goal/update/" + id, {
      data
    });
  },

  // This method will delete a goal selected by id
  deleteGoal: id => {
    return axios.delete("/goal/" + id);
  },

  // *** MILESTONE API METHODS

  // This method will return all milestones that a user owns
  // Note the id parameter is the userId
  getAllMilestones: id => {
    return axios.get("/all/milestones/" + id);
  },

  // This method will return a single milestone selected by id
  getMilestone: id => {
    return axios.get("/milestone/" + id);
  },

  // This method will select a milestone to update based on id.
  // The data object needs to contain colName and info to update the object
  editMilestone: (id, data) => {
    return axios.put("/milestone/" + id, {
      data
    });
  },

  // This method will select a milestone by id and delete it
  deleteMilestone: id => {
    return axios.delete("/milestone/" + id);
  },

  // *** BUDDY API METHODS

  // This method will return all the buddy relationships that a user "owns"
  getAllBuddies: id => {
    return axios.get("/buddy/owner/" + id);
  },

  // This method will return all buddy relationships associated with a single goal
  // note the id parameter is the goalId
  getBuddyByGoal: id => {
    return axios.get("/buddy/goal/" + id);
  },

  // This method will return all buddy relationships that a user is associated on.
  getBuddies: id => {
    return axios.get("/buddy/buddy/" + id);
  },

  // This method will return a single buddy relationship queried off of id
  getbuddy: id => {
    return axios.get("/buddy/" + id);
  },

  // This method will add a buddy relationship to the database
  // const newBuddy = {
  //   duration: req.body.duration,
  //   buddyId: req.body.buddyId,
  //   GoalId: req.body.goalId,
  //   UserId: req.body.userId
  // };
  // This is what the data object should look like
  addBuddy: data => {
    return axios.post("/buddy/add", {
      data
    });
  },

  // This method will edit a buddy relationship selected off of id
  // The data object needs to contain colName, and info
  editBuddy: (id, data) => {
    return axios.put("/buddy/" + id, {
      data
    });
  },

  // This method will delete a buddy relationship from the database
  deleteBuddy: id => {
    return axios.delete("/buddy/" + id);
  }
};
