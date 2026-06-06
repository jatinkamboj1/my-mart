const prisma = require("../prismaClient");
const { connect } = require("../routes/address");

const buildFilterQuery = (filters) => {
  const query = {};
  for (const key in filters) {
    if (filters[key]) {
      query[key] = { contains: filters[key], mode: "insensitive" };
    }
  }
  return query;
};

const addUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    let userId = id;
    if (id === "user") {
      userId = req.user.id;
    }
    const data = req.body;
    const existingAddressName = await prisma.addresses.findFirst({
      where: {
        userId: userId,
        name: data.name,
      },
    });

    if (existingAddressName) {
      return res.status(400).json({ message: "Address name already exists" });
    }
    const address = await prisma.addresses.create({
      data: { ...data, user: { connect: { id: userId } } },
    });

    return res
      .status(201)
      .json({ message: "Successfully added an address", address });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAddressByUserId = async (req, res) => {
  const { id } = req.params;
  let userId = id;
  if (id === "user") {
    userId = req.user.id;
  }
  try {
    const address = await prisma.addresses.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "asc" },
    });
    if (!address) return res.status(404).json({ message: "No address found." });
    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAddressBytoken = async (req, res) => {
  const { id } = req.user; // Extract user ID from token
  try {
    const addresses = await prisma.Addresses.findMany({
      where: { userId: id },
      include: { user: true },
    });

    if (!addresses.length) {
      return res.status(404).json({ message: "No address found." });
    }

    return res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const getAddressType = async (req, res) => {
  const { id } = req.user; // Extract user ID from token
  try {
    const addresses = await prisma.Addresses.findMany({
      where: { userId: id },
      select: {
        id: true,
        street: true,
        user: true,
        city: true,
        stateOrProvince: true,
        country: true,
        zip: true,
      },
    });

    if (!addresses.length) {
      return res.status(404).json({ message: "No address found." });
    }

    return res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateAddress = async (req, res) => {
  const id = req.params.id;
  try {
    const address = await prisma.addresses.findUnique({ where: { id } });
    if (!address) return res.status(404).json({ message: "No address found" });
    const {
      street,
      city,
      stateOrProvince,
      country,
      name,
      zip,
    } = req.body;
    const existingName = await prisma.addresses.findFirst({
      where: {
        userId: address.userId,
        name: name,
      },
    });
    if (existingName && existingName.id !== id) {
      return res.status(400).json({ message: "Address name already exists" });
    }
    const updatedAddress = await prisma.addresses.update({
      where: { id },
      data: {
        street: street || address.street,
        city: city || address.city,
        name: name || address.name,
        stateOrProvince: stateOrProvince || address.stateOrProvince,
        country: country || address.country,
        zip: zip || address.zip,
      },
    });
    return res.status(200).json({
      message: "Successfully updated address",
      updatedAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

const updateAddressbyToken = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await prisma.addresses.findUnique({ where: { id } });
    if (!address) return res.status(404).json({ message: "No address found" });
    const {
      street,
      city,
      stateOrProvince,
      country,
      zip,
    } = req.body;
    const updatedAddress = await prisma.addresses.update({
      where: { id },
      data: {
        street: street || address.street,
        city: city || address.city,
        stateOrProvince: stateOrProvince || address.stateOrProvince,
        country: country || address.country,
        zip: zip || address.zip,
      },
    });
    return res.status(200).json({
      message: "Successfully updated address",
      updatedAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};
const deleteAddress = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.addresses.delete({ where: { id } });
    return res.status(200).json({ message: "Successfully deleted address" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = {
  getAddressType,
  addUserAddress,
  getAddressByUserId,
  updateAddress,
  updateAddressbyToken,
  getAddressBytoken,
  deleteAddress,
};
