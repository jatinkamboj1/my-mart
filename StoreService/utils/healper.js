const { Prisma } = require('@prisma/client');

function parseDecimal(value) {
    return new Prisma.Decimal(value);
}

module.exports = { parseDecimal }