import prisma from "/lib/prisma"

export default async (req, res) => {
    const data = req.body;
    try {
        const result = await prisma.invoice.create({
            data: {
                ...data,
            },
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(403).json({err: "Could not add a new invoice."});
    }
};