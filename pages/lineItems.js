import prisma from '../lib/prisma.js'
import LineItemsCard from "../components/InvoiceCard";

export default function LineItems(props) {
    const lineItems = props.lineItems;
    return (
        <div>
            <div>{lineItems?.map((lineItem, i) => (
                <LineItemsCard lineItem={{lineItem}} key={i}></LineItemsCard>
            ))}</div>
        </div>
    );
}

export async function getServerSideProps() {
    const allLineItems = await prisma.lineItem.findMany();
    return {
        props: {
            lineItems: allLineItems,
        },
    };
}