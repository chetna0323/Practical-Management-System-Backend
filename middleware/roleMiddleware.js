


import UserModel from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // If no email provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });

    // Check if the user exists and has the Admin role
    if (user && user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Access Denied: Admins only." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const { email } = req.body;

    // If no email provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await UserModel.findOne({ email });

    if (user &&  user.role === "Teacher"){
      next();
    } else {
      res.status(403).json({ message: "Access Denied: Teachers or Admins only." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const isAdminOrTeacher = async (req, res, next) => {
  try {
    const { email } = req.body;

    // If no email provided
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await UserModel.findOne({ email });

    if (user && (user.role === "Admin" || user.role === "Teacher")) {
      next();
    } else {
      res.status(403).json({ message: "Access Denied: Admins or Teachers only." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
