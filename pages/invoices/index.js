import prisma from "/lib/prisma"
import InvoiceCard from "../../components/InvoiceCard";
import Link from "next/link";

export default function Invoices(props) {
    const {invoices} = props;

    return (
        <div>
            <div>
                <div className="m-2 text-center">Invoices</div>
                <div>{invoices?.map((invoice, i) => (
                    <InvoiceCard invoice={invoice} key={i}></InvoiceCard>
                ))}</div>
            </div>
            <div>
                <Link href="/">
                    <button className="border-2 p-2 mt-4 ml-2">
                        Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const allInvoices = await prisma.invoice.findMany();

    for (const invoice of allInvoices) {
        const customer = await prisma.customer.findUnique({where: {id: parseInt(invoice.customerID)}});
        invoice.customer = customer;
    }

    return {
        props: {
            invoices: JSON.parse(JSON.stringify(allInvoices)),
        },
    };
}