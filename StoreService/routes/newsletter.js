
const express = require("express");
const router = express.Router();

const { authenticateJWT, isAdmin } = require("../middleware/auth");


router.post('/', async (req, res) => {
  try {
    let { email, name, consentGiven, source } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // normalize email
    email = email.trim().toLowerCase()

    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
        consentGiven: !!consentGiven,
        consentAt: consentGiven ? new Date() : null,
        source,
      },
    })

    return res.status(201).json(subscriber)
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email already subscribed' })
    }

    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return res.json(subscribers)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { id } = req.params

    await prisma.newsletterSubscriber.delete({
      where: { id },
    })

    return res.json({ message: 'Deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Subscriber not found' })
    }

    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router;