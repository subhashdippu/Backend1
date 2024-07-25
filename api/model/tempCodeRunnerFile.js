import User from "../model/User";
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "user already" });
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User is not found" });
    }
    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
