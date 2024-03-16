import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';
import sendEmail from './emailController.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isFullRegistered: user.isFullRegistered,
      phone: user.phone,
      token,
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
    phone,
    address,
    hasPaid,
    createdByAdmin,
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
// @route   PUT /api/users/checkout
// @access  Private
const updateUserCheckout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId).select('-password');

  if (user) {
    user.progresses = req.body.progresses || user.progresses;
    user.hasPaid = req.body.hasPaid;
    user.phone = req.body.phone;

    const updatedUser = await user.save();

    res.json(updatedUser);
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
    user.hasPaid = req.body.hasPaid;

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

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
  let query = {};

  if (req.query.keyword) {
    const keyword = req.query.keyword;
    query = {
      $or: [
        { email: { $regex: keyword, $options: 'i' } },
        { name: { $regex: keyword, $options: 'i' } },
      ],
    };
  }

  let users = await User.find(query).select('-password').populate('progresses');

  if (req.query.marathon) {
    users = users.filter(ele =>
      ele?.progresses?.some(
        progress => String(progress?.marathon) === req.query.marathon
      )
    );
  }

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
    user.password = req.body.password;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.hasPaid = req.body.hasPaid;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/forgot-password
// @access  Private/Admin
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email, template } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'El correo electrónico no está asociado a ninguna cuenta.',
      });
    }

    const token = await generateToken(req, user, '1h');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendEmail(req, res, {
      from: 'Body Maraton <noreply@bodymaraton.com>',
      to: req.body.email,
      subject: 'Reset password',
      html: template.replace('/login', `/reset-password#${token}`),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al procesar la solicitud.' });
  }
});

// @desc    Update user
// @route   PUT /api/users/reset-passowrd
// @access  Private/Admin
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword, token } = req.body;

  try {
    if (!newPassword || !token) {
      return res.status(400).json({
        message:
          'Se requiere una nueva contraseña y un token para restablecer la contraseña.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        message:
          'No se encontró ningún usuario asociado al token proporcionado.',
      });
    }

    if (user.resetPasswordToken !== token) {
      return res
        .status(400)
        .json({ message: 'El token proporcionado no es válido.' });
    }

    if (Date.now() > user.resetPasswordExpires) {
      return res
        .status(400)
        .json({ message: 'El token proporcionado ha caducado.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: 'La contraseña se ha restablecido correctamente.' });
  } catch (error) {
    console.error(error);
    // Maneja los errores y envía una respuesta de error
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al restablecer la contraseña.' });
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
  updateUserCheckout,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
