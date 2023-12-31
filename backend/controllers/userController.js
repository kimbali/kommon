import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isFullRegistered: user.isFullRegistered,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    isAdmin,
    city,
    phone,
    address,
    hasPaid,
    createdByAdmin,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    city,
    address,
    phone,
    hasPaid,
  });

  if (user) {
    if (!createdByAdmin) {
      generateToken(res, user._id);
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      city: user.city,
      address: user.address,
      phone: user.phone,
      progresses: [],
      hasPaid: user.hasPaid,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id)
    .select('-password')
    .populate({
      path: 'progresses',
      populate: {
        path: 'marathon',
        select: 'startDate endDate',
      },
    })
    .populate('city');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    user.progresses = req.body.progresses || user.progresses;
    user.isFullRegistered = req.body.isFullRegistered || user.isFullRegistered;
    user.hasPaid = req.body.hasPaid || user.hasPaid;

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.age = req.body.age || user.age;
    user.weight = req.body.weight || user.weight;
    user.height = req.body.height || user.height;
    user.chest = req.body.chest || user.chest;
    user.waist = req.body.waist || user.waist;
    user.buttocks = req.body.buttocks || user.buttocks;

    user.activity = req.body.activity || user.activity;
    user.porpuse = req.body.porpuse || user.porpuse;
    user.breastfeed = req.body.breastfeed || user.breastfeed;
    user.allergies = req.body.allergies || user.allergies;
    user.problems = req.body.problems || user.problems;
    user.patologies = req.body.patologies || user.patologies;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete all no admin users
// @route   DELETE /api/users
// @access  Private/admin
export const deleteAllNoAdminUsers = asyncHandler(async (req, res) => {
  try {
    const condition = {
      $or: [{ admin: false }, { admin: { $exists: false } }],
    };
    const result = await User.deleteMany(condition);

    res.json(`${result.deletedCount} documents removed`);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
