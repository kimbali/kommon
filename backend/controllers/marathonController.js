import asyncHandler from '../middleware/asyncHandler.js';
import Marathon from '../models/Marathon.js';

// @desc    Fetch all marathons
// @route   GET /api/marathons
// @access  Public
export const getMarathons = asyncHandler(async (req, res) => {
  const today = new Date(req.query?.startDate).setHours(0, 0, 0, 0);

  const dateFilter = req.query?.startDate
    ? {
        $or: [{ startDate: { $gte: today } }],
      }
    : {};

  const isActive =
    req.query.isActive === 'true'
      ? {
          isActive: true,
        }
      : {};

  const marathons = await Marathon.find({
    ...dateFilter,
    ...isActive,
  })
    .sort({ startDate: 1 })
    .populate('planning', 'name');

  res.json({ marathons });
});

// @desc    Fetch single marathon
// @route   GET /api/marathons/:id
// @access  Public
export const getMarathonById = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    return res.json(marathon);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Fetch single marathon
// @route   GET /api/marathons/client/:id
// @access  Public
export const getMarathonClientById = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id).populate('planning');

  if (marathon) {
    return res.json(marathon);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Fetch shopping list
// @route   GET /api/marathons/shopping-list/:marathonId/:week
// @access  Protect
export const getShoppingList = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id).populate({
    path: 'planning',
    populate: {
      path: 'month',
      // match: { week: req.params.week },
      match: { week: { $in: [1, 2] } },
      populate: {
        path: 'meals.recipe',
        select: 'ingredients',
        populate: {
          path: 'ingredients.ingredient',
          select: 'name supermarket measure',
        },
      },
    },
  });

  if (marathon) {
    const ingredientsList = marathon.planning.month
      .reduce((acc, day) => {
        const mealsRecipesIngredients = day?.meals.reduce((acc, ele) => {
          return [...acc, ...ele.recipe?.ingredients];
        }, []);

        return [...acc, ...mealsRecipesIngredients];
      }, [])
      .reduce((acc, ele) => {
        const exists =
          acc.findIndex(item => item.ingredientId === ele.ingredient?._id) + 1;

        const position = exists - 1;

        const quantity = exists
          ? acc[position].quantity + ele?.quantity
          : ele?.quantity;

        const ingredient = {
          ingredientId: ele.ingredient?._id,
          name: ele.ingredient?.name,
          quantity,
          supermarket: ele.ingredient?.supermarket,
          measure: ele.ingredient?.measure,
        };

        const arraySet = [...acc];

        if (exists) {
          arraySet[position] = ingredient;
        } else {
          arraySet.push(ingredient);
        }

        return arraySet;
      }, []);

    return res.json(ingredientsList);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Create a marathon
// @route   POST /api/marathons
// @access  Private/Admin
export const createMarathon = asyncHandler(async (req, res) => {
  const { startDate, endDate, name, planning, telegramLink } = req.body;
  const newMarathon = new Marathon({
    startDate,
    endDate,
    name,
    planning,
    participants: 0,
    telegramLink,
  });

  const createdMarathon = await newMarathon.save();

  const marathon = await Marathon.findById(createdMarathon._id).populate(
    'planning',
    'name'
  );
  res.status(201).json(marathon);
});

// @desc    Update a marathon
// @route   PUT /api/marathons/:id
// @access  Private/Admin
export const updateMarathon = asyncHandler(async (req, res) => {
  const { startDate, endDate, name, planning, isActive, telegramLink } =
    req.body;

  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    marathon.startDate = startDate || marathon.startDate;
    marathon.endDate = endDate || marathon.endDate;
    marathon.name = name || marathon.name;
    marathon.planning = planning || marathon.planning;
    marathon.isActive = isActive || marathon.isActive;
    marathon.telegramLink = telegramLink || marathon.telegramLink;

    const updatedMarathon = await marathon.save();
    const marathonUpdated = await Marathon.findById(req.params.id).populate(
      'planning',
      'name'
    );
    res.json(marathonUpdated);
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Update participants
// @route   PUT /api/marathons/participants/:id
// @access  Public
export const updateParticipants = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    marathon.participants = marathon.participants + 1;

    await marathon.save();
    res.json({ message: 'Marathon updated' });
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});

// @desc    Delete a marathon
// @route   DELETE /api/marathon/:id
// @access  Private/Admin
export const deleteMarathon = asyncHandler(async (req, res) => {
  const marathon = await Marathon.findById(req.params.id);

  if (marathon) {
    await Marathon.deleteOne({ _id: marathon._id });
    res.json({ message: `Marathon ${marathon.name} removed` });
  } else {
    res.status(404);
    throw new Error('Marathon not found');
  }
});
