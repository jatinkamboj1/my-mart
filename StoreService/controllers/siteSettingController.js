// src/controllers/settings.controller.js
const prisma = require("../prismaClient");

//
// CREATE
//
exports.createSetting = async (req, res) => {
  try {
    const { key, value, jsonValue, description } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }

    const exists = await prisma.siteSetting.findUnique({
      where: { key },
    });

    if (exists) {
      return res.status(409).json({ error: "Key already exists" });
    }

    const setting = await prisma.siteSetting.create({
      data: { key, value, jsonValue, description },
    });

    res.json({ success: true, data: setting });
  } catch (err) {
    res.status(500).json({ error: "Failed to create setting" });
  }
};

//
// UPDATE (UPSERT)
//
exports.updateSetting = async (req, res) => {
  try {
    const { key, value, jsonValue, description } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value, jsonValue, description },
      create: { key, value, jsonValue, description },
    });

    res.json({ success: true, data: setting });
  } catch (err) {
    res.status(500).json({ error: "Failed to update setting" });
  }
};

//
// LIST ALL
//
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: "asc" },
    });

    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

//
// GENERIC GET BY KEY
//
exports.getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });

    if (!setting) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({
      success: true,
      data: setting.jsonValue ?? setting.value,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch setting" });
  }
};

//
// SPECIFIC APIs (as you requested)
//
exports.getAnnouncementText = async (req, res) => {
  try {
    const data = await prisma.siteSetting.findUnique({
      where: { key: "announcement.text" },
    });

    res.json({ data: data?.value || null });
  } catch {
    res.status(500).json({ error: "Failed" });
  }
};

exports.getSearchHeading = async (req, res) => {
  try {
    const data = await prisma.siteSetting.findUnique({
      where: { key: "search.heading" },
    });

    res.json({ data: data?.value || null });
  } catch {
    res.status(500).json({ error: "Failed" });
  }
};

exports.getWelcomeMessage = async (req, res) => {
  try {
    const data = await prisma.siteSetting.findUnique({
      where: { key: "welcome.message" },
    });

    res.json({ data: data?.value || null });
  } catch {
    res.status(500).json({ error: "Failed" });
  }
};