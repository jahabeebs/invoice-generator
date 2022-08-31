export default function LineItemsCard({lineItem}) {
    return (
        <div className="flex flex-row w-fit space-x-2 border-2">
            <div className="border-r-2 pl-2 pr-2">
                Item Name: {lineItem?.name}
            </div>
            <div className="border-r-2 pr-2">
                Item Description: {lineItem?.description}
            </div>
            <div className="border-r-2 pr-2">
                Item Price (USDC): {lineItem?.priceUSDC}
            </div>
        </div>
    );
}