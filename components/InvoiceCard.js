import Link from "next/link";
import getFormattedDate from "../helpers/dateHelpers";

export default function InvoiceCard({invoice}) {

    let due = new Date(invoice?.dueDate);
    due = getFormattedDate(due);

    return (
        <Link href={`/invoice/${invoice?.id}`}>
            <div className="space-y-2 m-2 border-2 border-white">
                <div>
                    Invoice ID: {invoice?.id}
                </div>
                <div>
                    Customer Name: {invoice?.customer.firstName} {invoice?.customer.lastName}
                </div>
                <div>
                    Customer Email: {invoice?.customer.email}
                </div>
                <div>
                    Invoice Due Date: {due ? due : "N/A"}
                </div>
                <div>
                    Invoice Amount Due: {invoice?.amountDue}
                </div>
            </div>
        </Link>
    );
}