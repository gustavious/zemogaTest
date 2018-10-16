import {
  createUser,
  login,
  getAllUsers,
  getUser,
  updateUser,
  removeUser,
} from "../controllers";
import path from 'path';

export default async (app) => {
  // Create a user
  app.post('/signup', createUser);
  // Log in a user
  app.post('/login', await login);
  // Get all stored users
  app.get('/users', getAllUsers);
  app.route('/users/:id')
    // Get a specific user
    .get(getUser)
    // Update an user
    .put(updateUser)
    // Remove an user
    .delete(removeUser);

  // Get all votes

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../UI/index.html'));
  });
}
