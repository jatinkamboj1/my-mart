const prisma = require("../prismaClient");

/* =====================================================
   APPLY CHARGES (REUSABLE SERVICE)
===================================================== */
async function calculateCharges({ orderTotal }) {
  if (isNaN(orderTotal)) {
    throw {
      status: 400,
      message: "orderTotal is required and must be a number",
    };
  }

  const charges = await prisma.charges.findMany({
    where: {
      isDeleted: false,
      isActive: true,
    },
    orderBy: { order: "asc" },
    select: {
      name: true,
      percentage: true,
      flatRate: true,
      operation: true,
    },
  });

  let runningTotal = Number(orderTotal);
  const appliedCharges = [];

  let taxAmount = 0;

  for (const charge of charges) {
    let amount = 0;

    // Base calculation
    if (charge.percentage != null) {
      amount = (runningTotal * charge.percentage) / 100;
    } else if (charge.flatRate != null) {
      amount = charge.flatRate;
    }

    // Apply operation
    switch (charge.operation) {
      case "ADD":
        runningTotal += amount;
        break;

      case "SUBTRACT":
        runningTotal -= amount;
        amount = -amount;
        break;

      case "MULTIPLY":
        amount = runningTotal * (amount / 100);
        runningTotal += amount;
        break;

      case "DIVIDE":
        if (amount !== 0) {
          amount = runningTotal / amount;
          runningTotal += amount;
        }
        break;
    }

    // Categorize (for orders)
    taxAmount += amount;

    appliedCharges.push({
      name: charge.name,
      amount: Number(amount),
    });
  }

  return {
    totalPay: Number(runningTotal),
    charges: appliedCharges,
    breakdown: {
      taxAmount: Number(taxAmount),
    },
  };
}

module.exports = { calculateCharges }