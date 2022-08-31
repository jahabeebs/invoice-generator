import Head from 'next/head'
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Invoice App</title>
                <meta name="description" content="Invoice application"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="flex flex-col">
                <h1 className="text-center">
                    Welcome to my invoice app!
                </h1>
                <div className="text-center space-x-4">
                    <Link href={`/invoices`}>
                        <button className="border-2 p-2 mt-4">
                            Click here to see all the invoices
                        </button>
                    </Link>
                    <Link href={`/addInvoice`}>
                        <button className="border-2 p-2 mt-4">
                            Click here to create a new invoice
                        </button>
                    </Link>
                </div>
            </main>
            <footer>
            </footer>
        </div>
    )
}
