import prisma from "/lib/prisma"

export default async (req, res) => {
    const {id} = req.body;
    try {
        const deleteInvoice = await prisma.invoice.delete({
            where: {
                id,
            },
        });
        res.status(200).json(deleteInvoice);
    } catch (error) {
        res.status(403).json({err: "Could not delete the invoice."});
    }
};