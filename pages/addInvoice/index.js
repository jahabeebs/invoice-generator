import {useRef, useState} from "react";
import axios from "axios";
import Link from "next/link";

function LineItemFragment() {
    return (<div className="flex flex-row w-fit space-x-2 border-2">
        <div className="border-r-2 pl-2 pr-2">
            <label className="pr-2">Name</label>
            <input id="addName" name="addName" type="text"/>
        </div>
        <div className="border-r-2 pr-2">
            <label className="pr-2">Description</label>
            <input id="addDescription" name="addDescription" type="text"/>
        </div>
        <div className="border-r-2 pr-2">
            <label className="pr-2">Price USDC</label>
            <input id="addPrice" name="addPrice" type="text"/>
        </div>
    </div>);
}

export default function AddInvoice() {
    const [lineItemCount, setLineItemCount] = useState(1);
    const formRef = useRef();


    async function addNewInvoice(params) {
        const {
            addDueDate,
            addAmountDue,
            addFirstName,
            addLastName,
            addEmail
        } = formRef.current
        let dueDate = addDueDate.value;
        dueDate = new Date(dueDate);
        let lineItemsArray = [];
        let amountDue = addAmountDue.value;
        amountDue = parseInt(amountDue);
        const firstName = addFirstName.value;
        const lastName = addLastName.value;
        const email = addEmail.value

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

        await axios.post("/api/addCustomer", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            invoices: {
                create: [
                    {
                        dueDate: dueDate,
                        amountDue: amountDue,
                        lineItems: {
                            create: lineItemsArray,
                        },
                    },
                ],
            },

        });
        window.location.reload();
    }

    async function handleClickAdd() {
        setLineItemCount(lineItemCount + 1);
    }

    async function handleClickSubtract() {
        if (lineItemCount > 1) {
            setLineItemCount(lineItemCount - 1);
        }
    }

    function calculateTotalAmountDue() {
        const prices = document.querySelectorAll("#addPrice")
        let total = 0;
        for (let i = 0; i < prices.length; i++) {
            if (parseInt(prices[i]?.value)) {
                total += parseInt(prices[i]?.value)
            }
        }
        document.getElementById('addAmountDue').value = total;
    }

    return (
        <div className="m-2">
            <form ref={formRef}>
                <div>
                    <div className="flex flex-col space-x-4">
                        <div className="text-center mb-4">Customer Info</div>
                        <label>First Name</label>
                        <input name="addFirstName" type="text"/>
                        <label>Last Name</label>
                        <input name="addLastName" type="text"/>
                        <label>Email</label>
                        <input name="addEmail" type="email"/>
                        <div className="mt-10 text-center mb-4">Line Items</div>
                        <div className="flex flex-row space-x-4">
                            <div className="mb-2 p-2 border-2" onClick={handleClickAdd}>
                                Add Item
                            </div>
                            <div className="mb-2 p-2 border-2" onClick={handleClickSubtract}>
                                Subtract Item
                            </div>
                        </div>
                        {[...Array(lineItemCount)].map((_, i) => <LineItemFragment key={i}/>)}
                    </div>
                </div>
                <div className="flex flex-col mt-10 text-center">Other Info</div>
                <div className="flex flex-col ml-4 mt-4">
                    <label>Due Date</label>
                    <input name="addDueDate" type="date"/>
                </div>
                <div className="flex flex-col ml-4 mt-4">
                    <div onClick={calculateTotalAmountDue}>
                        <label>Total Amount Due (press here to calculate)</label>
                    </div>
                    <input name="addAmountDue" id="addAmountDue" type="number"/>
                </div>
                <div className="flex flex-row">
                    <div onClick={() => addNewInvoice()} className="w-fit ml-4 mt-10 border-2 p-2">
                        Create new invoice
                    </div>
                    <Link href={`/invoices`}>
                        <div className="w-fit ml-4 mt-10 border-2 p-2">
                            View all invoices
                        </div>
                    </Link>
                </div>
            </form>
        </div>

    );


}