import prisma from "/lib/prisma"

export default async (req, res) => {
    const data = req.body;
    try {
        const updateInvoice = await prisma.customer.update({
            where: {
                id: parseInt(req.body.id),
            },
            data: {
                ...data
            },
        });
        res.status(200).json(updateInvoice);
    } catch (error) {
        res.status(403).json({err: "Could not update the customer."});
    }
};