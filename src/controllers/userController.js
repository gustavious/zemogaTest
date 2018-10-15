
export const getUser = (req, res) => {
  res.json("Hello world");
};

export const createUser = async (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    email: req.body.email,
  };
  console.log(user);
  res.status(200).json({"User created": user});
};
