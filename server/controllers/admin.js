const Category = require("../models/categories");
const Type = require("../models/type");
const User = require("../models/user");
const Perks = require("../models/perks");
const Skills = require("../models/skill");

const { v4: uuidv4 } = require("uuid");
// ==================================================
//  Read
// ==================================================

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};


exports.getType = async (req, res) => {
  try {
    const types = await Type.findAll();
    return res.status(200).json(types);
  } catch (err) {
    console.error("Error fetching types:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.findAll();
    return res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

exports.getPerks = async (req, res) => {
  try {
    const perks = await Perks.findAll();
    return res.status(200).json(perks);
  } catch (err) {
    console.error("Error fetching perks:", err);
    return res.status(400).json({
      error: "Some Error",
    });
  }
};

// ==================================================
//  Category
// ==================================================
exports.categoryCreate = async (req, res) => {
  const { category } = req.body;
  const catId = uuidv4();

  try {
    // Check if category name already exists
    const existingCategory = await Category.findOne({ where: { cat_name: category } });
    if (existingCategory) {
      return res.status(400).json({
        error: "Category Name Exists",
      });
    }

    // Create new category
    const newCategory = await Category.create({
      Id: catId,
      cat_id: catId,
      cat_name: category,
    });

    return res.status(200).json({
      message: "Category Added",
      category: newCategory,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.typeCreate = async (req, res) => {
  const { type } = req.body;
  const typeId = uuidv4();

  try {
    // Check if type name already exists
    const existingType = await Type.findOne({ where: { type_name: type } });
    if (existingType) {
      return res.status(400).json({
        error: "Type Name Exists",
      });
    }

    // Create new type
    const newType = await Type.create({
      type_id: typeId,
      type_name: type,
    });

    return res.status(200).json({
      message: "Type Added",
      type: newType,
    });
  } catch (err) {
    console.error("Error creating type:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.skillCreate = async (req, res) => {
  const { skill } = req.body;
  const skillId = uuidv4();

  try {
    // Check if skill name already exists
    const existingSkill = await Skills.findOne({ where: { skill_name: skill } });
    if (existingSkill) {
      return res.status(400).json({
        error: "Skill Name Exists",
      });
    }

    // Create new skill
    const newSkill = await Skills.create({
      skill_id: skillId,
      skill_name: skill,
    });

    return res.status(200).json({
      message: "Skill Added",
      skill: newSkill,
    });
  } catch (err) {
    console.error("Error creating skill:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.perksCreate = async (req, res) => {
  const { perks } = req.body;
  const perksId = uuidv4();

  try {
    // Check if perks name already exists
    const existingPerks = await Perks.findOne({ where: { perks_name: perks } });
    if (existingPerks) {
      return res.status(400).json({
        error: "Perks Name Exists",
      });
    }

    // Create new perks
    const newPerks = await Perks.create({
      perks_id: perksId,
      perks_name: perks,
    });

    return res.status(200).json({
      message: "Perks Added",
      perks: newPerks,
    });
  } catch (err) {
    console.error("Error creating perks:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};


exports.userCreate = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: password, // Remember to handle password hashing if required
      role: role,
    });

    // Remove sensitive information from response
    newUser.hashed_password = undefined;
    newUser.salt = undefined;

    return res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

// ==================================================
//  Delete
// ==================================================
exports.userDelete = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user does not exist
    if (!user) {
      return res.status(404).json({
        error: "User Not Found",
      });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({
      msg: "User Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};
exports.skillsDelete = async (req, res) => {
  const skillId = req.params.id;

  try {
    // Find the skill by ID
    const skill = await Skills.findByPk(skillId);

    // If skill does not exist
    if (!skill) {
      return res.status(404).json({
        error: "Skill Not Found",
      });
    }

    // Delete the skill
    await skill.destroy();

    return res.status(200).json({
      msg: "Skill Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting skill:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};

exports.perksDelete = async (req, res) => {
  const perksId = req.params.id;

  try {
    // Find the perks by ID
    const perks = await Perks.findByPk(perksId);

    // If perks does not exist
    if (!perks) {
      return res.status(404).json({
        error: "Perks Not Found",
      });
    }

    // Delete the perks
    await perks.destroy();

    return res.status(200).json({
      msg: "Perks Deleted Successfully",
    });
  } catch (err) {
    console.error("Error deleting perks:", err);
    return res.status(400).json({
      error: err.message,
    });
  }
};
// ==================================================
//  Update
// ==================================================

exports.userUpdate = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user does not exist
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Update user fields if provided
    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }

    // Save the updated user
    await user.save();

    // Return the updated user object with sensitive data removed
    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(400).json({
      error: "User update failed",
    });
  }
};

// ==================================================
//  Status
// ==================================================
exports.userStatus = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user does not exist
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Toggle the block_user status
    user.block_user = !user.block_user;

    // Save the updated user
    await user.save();

    // Return the updated user object with sensitive data removed
    const updatedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      block_user: user.block_user,
    };

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user status:", err);
    return res.status(400).json({
      error: "User status update failed",
    });
  }
};

exports.skillsStatus = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the skill by ID
    const skill = await Skills.findByPk(userId);

    // If skill does not exist
    if (!skill) {
      return res.status(404).json({
        error: "Skill not found",
      });
    }

    // Toggle the skill_isBlock status
    skill.skill_isBlock = !skill.skill_isBlock;

    // Save the updated skill
    await skill.save();

    // Return the updated skill object
    res.json(skill);
  } catch (err) {
    console.error("Error updating skill status:", err);
    return res.status(400).json({
      error: "Skill status update failed",
    });
  }
};

exports.perksStatus = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the perk by ID
    const perks = await Perks.findByPk(userId);

    // If perk does not exist
    if (!perks) {
      return res.status(404).json({
        error: "Perk not found",
      });
    }

    // Toggle the perks_isBlock status
    perks.perks_isBlock = !perks.perks_isBlock;

    // Save the updated perk
    await perks.save();

    // Return the updated perk object
    res.json(perks);
  } catch (err) {
    console.error("Error updating perks status:", err);
    return res.status(400).json({
      error: "Perks status update failed",
    });
  }
};

// ==================================================
//  Details
// ==================================================

exports.userDetail = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findByPk(userId);

    // If user does not exist
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Omit sensitive information
    user.h_password = undefined;
    user.salt = undefined;

    // Return user details
    res.json(user);
  } catch (err) {
    console.error("Error fetching user details:", err);
    return res.status(400).json({
      error: "User details fetch failed",
    });
  }
};
