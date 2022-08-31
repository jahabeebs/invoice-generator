import prisma from "/lib/prisma"
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import {useRef, useState} from "react";
import getFormattedDate from "../../helpers/dateHelpers";

export default function EditInvoice(props) {
    const router = useRouter();
    const {invoice} = props;
    const [lineItemCount, setLineItemCount] = useState(invoice?.items.length);
    const formRef = useRef();

    let due = new Date(invoice?.dueDate)
    due = getFormattedDate(due).toString()

    async function saveInvoice(params) {
        const {
            addDueDate,
            addAmountDue,
            addFirstName,
            addLastName,
            addEmail
        } = formRef.current
        let dueDate = addDueDate.value;
        dueDate = new Date(dueDate);
        let amountDue = addAmountDue.value;
        amountDue = parseInt(amountDue);
        const firstName = addFirstName.value;
        const lastName = addLastName.value;
        const email = addEmail.value

        let lineItemsArray = [];
        const names = document.querySelectorAll("#addName")
        const descriptions = document.querySelectorAll("#addDescription")
        const prices = document.querySelectorAll("#addPrice")

        let priceSum = 0;
        let lineItem = {};
        for (let i = 0; i < names.length; i++) {
            lineItem["name"] = names[i]?.value
            lineItem["description"] = descriptions[i]?.value
            lineItem["priceUSDC"] = parseInt(prices[i]?.value)
            priceSum += parseInt(prices[i]?.value)
            lineItemsArray.push(lineItem)
            lineItem = {};
        }

        if (priceSum !== amountDue) {
            window.alert("The amount due must be equal to the sum of the line items")
            return
        }

        await axios.put("/api/editInvoice", {
            id: parseInt(invoice?.id),
            dueDate,
            amountDue,
            lineItemsArray,
        });

        await axios.put("/api/editCustomer", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            id: parseInt(invoice?.customerID),
        });

        window.alert("Changes Saved")
    }

    async function handleClickAdd() {
        setLineItemCount(lineItemCount + 1);
    }

    async function handleClickSubtract() {
        if (lineItemCount > 1) {
            setLineItemCount(lineItemCount - 1);
        }
    }


    function LineItemFragment(props) {
        return (<div className="flex flex-row w-fit space-x-2 border-2 ml-4">
            <div className="border-r-2 pl-2 pr-2">
                <label className="pr-2">Name</label>
                <input id="addName" defaultValue={props?.defaultLineItemName} name="addName" type="text"/>
            </div>
            <div className="border-r-2 pr-2">
                <label className="pr-2">Description</label>
                <input id="addDescription" defaultValue={props?.defaultLineItemDescription} name="addDescription"
                       type="text"/>
            </div>
            <div className="border-r-2 pr-2">
                <label className="pr-2">Price USDC</label>
                <input id="addPrice" defaultValue={props?.defaultLineItemPrice} name="addPrice" type="text"/>
            </div>
        </div>);
    }

    return (
        <div>
            <div>
                <form ref={formRef}>
                    <div className="flex flex-col space-x-4 space-y-2">
                        <div>
                            <h1 className="ml-4">Invoice ID: {invoice?.id}</h1>
                        </div>
                        <div className="text-center mb-4">Customer Info</div>
                        <label>First Name</label>
                        <input name="addFirstName" type="text" defaultValue={invoice?.customer.firstName}/>
                        <label>Last Name</label>
                        <input name="addLastName" type="text" defaultValue={invoice?.customer.lastName}/>
                        <label>Email</label>
                        <input name="addEmail" type="email" defaultValue={invoice?.customer.email}/>
                    </div>
                    <div>
                        <div className="flex flex-row space-x-4">
                            <div className="ml-4 mt-8 flex flex-row space-x-2">
                                <div className="mb-2 p-2 border-2" onClick={handleClickAdd}>
                                    Add Item
                                </div>
                                <div className="mb-2 p-2 border-2" onClick={handleClickSubtract}>
                                    Subtract Item
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2 mb-4">Line Items</div>
                        {[...Array(lineItemCount)].map((_, i) => <LineItemFragment
                            defaultLineItemName={invoice?.items[i]?.name}
                            defaultLineItemDescription={invoice?.items[i]?.description}
                            defaultLineItemPrice={invoice?.items[i]?.priceUSDC} key={i}/>)}
                    </div>
                    <div className="ml-4 pt-4 pb-4">
                        <label>Invoice Due Date:</label>
                        <input defaultValue={due} className="ml-2" name="addDueDate" type="date"/>
                    </div>
                    <div className="ml-4 pt-2 pb-4">
                        <label>Total Amount Due:</label>
                        <input defaultValue={invoice?.amountDue} name="addAmountDue" className="ml-2" type="number"/>
                    </div>
                    <div className="flex flex-row space-x-4 mt-4 ml-4">
                        <Link href="/invoices">
                            <button className="border-2 p-2">
                                All Invoices
                            </button>
                        </Link>
                        <div className="border-2 p-2" onClick={saveInvoice}>
                            Save
                        </div>
                    </div>
                </form>
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
