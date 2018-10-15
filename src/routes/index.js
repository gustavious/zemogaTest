import {createUser} from "../controllers";

export default function(app) {
  app.route('/signup')
    .post(createUser)
}
