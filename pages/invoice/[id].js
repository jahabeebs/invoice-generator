import prisma from "/lib/prisma"
import axios from "axios";
import {useRouter} from "next/router";
import LineItemsCard from "../../components/LineItemsCard";
import Link from "next/link";
import getFormattedDate from "../../helpers/dateHelpers";

export default function Invoice(props) {
    const router = useRouter();
    const {invoice} = props;

    let due = new Date(invoice?.dueDate);
    due = getFormattedDate(due).toString()

    async function deleteInvoice() {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            // ...
            await axios.post("/api/deleteInvoice", {id: parseInt(invoice?.id)});
            await router.push("/invoices");
        }
    }

    return (
        <div>
            <div>
                <div className="flex flex-col space-x-4 space-y-2">
                    <div>
                        <h1 className="ml-4">Invoice ID: {invoice?.id}</h1>
                    </div>
                    <div className="text-center mb-4">Customer Info</div>
                    <label>First Name</label>
                    <div>{invoice?.customer.firstName}</div>
                    <label>Last Name</label>
                    <div>{invoice?.customer.lastName}</div>
                    <label>Email</label>
                    <div>{invoice?.customer.email}</div>
                </div>
                <div>
                    <div className="text-center mt-8">Line Items</div>
                    <div className="mt-4 mb-4 ml-4">{invoice.items?.map((lineItem, i) => (
                        <LineItemsCard lineItem={lineItem} key={i}></LineItemsCard>
                    ))}</div>
                </div>
                <div className="ml-4">
                    <span> Invoice Due Date: {due ? due : "N/A"} </span>
                </div>
                <div className="ml-4">
                    Total Amount Due (USDC): {invoice?.amountDue}
                </div>
                <div className="flex flex-row space-x-4 mt-4 ml-4">

                    <Link href={`/editInvoice/${invoice?.id}`}>
                        <button className="border-2 p-2">

                            Edit

                        </button>
                    </Link>

                    <Link href="/invoices">
                        <button className="border-2 p-2">

                            All Invoices

                        </button>
                    </Link>
                    <button className="border-2 p-2" onClick={deleteInvoice}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params;
    const invoice = await prisma.invoice.findUnique({where: {id: parseInt(id)}});
    const customer = await prisma.customer.findUnique({where: {id: parseInt(invoice.customerID)}});
    invoice.customer = customer;
    invoice.items = [];
    const lineItems = await prisma.lineItem.findMany({where: {invoiceID: parseInt(id)}});
    for (const item of lineItems) {
        invoice.items.push(item);
    }

    return {
        props: {
            invoice: JSON.parse(JSON.stringify(invoice)),
        },
    };
}
