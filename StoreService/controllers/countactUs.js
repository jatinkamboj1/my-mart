const prisma = require('../prismaClient'); // Import prisma client (adjust path as needed)

const createContact = async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format (must be 10 digits)" });
    }

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "All fields except phone are required." });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        email,
        subject,
        message,
      },
    });

    res
      .status(201)
      .json({ message: "Your message has been sent successfully!", contact });
  } catch (error) {
    console.error(`Error in createContact: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContacts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),

      prisma.contact.count(),
    ]);

    return res.status(200).json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("getContacts:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error("getContactById:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const markContactAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }

    const updated = await prisma.contact.update({
      where: {
        id: Number(id),
      },
      data: {
        isRead: true,
      },
    });

    return res.status(200).json({
      message: "Contact marked as read",
      contact: updated,
    });
  } catch (error) {
    console.error("markContactAsRead:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  markContactAsRead
};
