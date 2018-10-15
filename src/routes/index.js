import {
  createUser,
  login,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers";

export default async (app) => {
  // Create a user
  app.post('/signup', createUser);
  // Log in a user
  app.post('/login', login);
  // Get all stored users
  app.get('/users', getAllUsers);
  app.route('/users/:id')
    // Get a specific user
    .get(getUser)
    // Update a user
    .put(updateUser);
}
