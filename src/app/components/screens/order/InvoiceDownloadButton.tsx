"use client";

import { useState } from 'react';
import { downloadInvoice } from '@/actions/payments/paypal/downloadInvoice.action';
import { IoDownloadOutline } from 'react-icons/io5';



interface Props {
    orderId: string;
};

export const InvoiceDownloadButton = ({ orderId }: Props) => {
    const [error, setError] = useState<null | string>(null);
    const handleDownload = async () => {
        const { ok, message, pdf } = await downloadInvoice(orderId);

        if (!ok) {
            setError(message ?? 'Error al generar pdf')
        }

        if (pdf) {
            const url = URL.createObjectURL(pdf);
            const a = document.createElement("a");
            a.href = url;
            a.download = `invoice-${orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            alert("No se pudo descargar la factura.");
        }
    };

    return (
        <>
            {error && (
                <span className='text-red-500'> {error} </span>
            )}
            <button
                onClick={handleDownload}
                className="px-4 py-2 border-2 border-purple-500 rounded-lg text-purple-500 hover:bg-purple-500 hover:text-white flex gap-2 items-center"
            >
                Descargar Factura
                <IoDownloadOutline size={30} />
            </button>
        </>
    );
};


