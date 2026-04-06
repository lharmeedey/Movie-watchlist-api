const { prisma } = require("../config/db.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exist
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exist with this email" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user email exists in the database
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Generate JWT
  const token = generateToken(user.id, res);

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};


const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};

module.exports = { register, login, logout };
