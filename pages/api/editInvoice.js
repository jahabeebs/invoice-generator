import prisma from "/lib/prisma"

export default async (req, res) => {
    const {id, dueDate, amountDue, lineItemsArray} = req.body;
    try {
        const updateInvoice = await prisma.invoice.update({
            where: {
                id: parseInt(id),
            },
            data: {
                dueDate,
                amountDue,
                lineItems: {
                    deleteMany: {},
                    createMany: {
                        data: lineItemsArray,
                    },
                },
            },
        });
        res.status(200).json(updateInvoice);
    } catch (error) {
        res.status(403).json({err: "Could not update the invoice."});
    }
};