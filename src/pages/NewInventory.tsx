import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createNewInventory } from '../actions/inventory_action';
import { NewInventoryRequest } from '../types/inventory_types';

const products = [
    { id: '14b07357-8b25-4493-b7dc-95fd4a65b864', name: 'Tena 5L Food Oil' },
    { id: 'ffe47eda-8044-489c-9d5a-429ce7d6f0f3', name: 'T1L-123' },
    { id: '3b409e49-58f5-4148-9c4a-2740bf87cba5', name: 'Tena 3L Food Oil' },
];

const packages: Record<string, { id: string; name: string }[]> = {
    '14b07357-8b25-4493-b7dc-95fd4a65b864': [{ id: "efc594c3-afda-42ea-922a-bc89dc37680b", name: "12 pc pack" }],
    'ffe47eda-8044-489c-9d5a-429ce7d6f0f3': [{ id: "9c43e332-4d1f-4eed-942c-6d58332ba6bc", name: "12 pc Pack[1L]" }],
    '3b409e49-58f5-4148-9c4a-2740bf87cba5': [{ id: "3ae0f6f3-d44e-4bea-a696-f3d2eb662080", name: "12 pc Pack[3L]" }],
};

function NewInventory() {

    const [formData, setFormData] = useState({
        productId: '',
        packageId: '',
        quantity: 0,
        location: '',
        productionDate: new Date().toISOString().split('T')[0],
        expirationDate: ''
    });

    const [isPending, setIsPending] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: NewInventoryRequest = {
            productId: formData.productId,
            packageId: formData.packageId,
            expirationDate: new Date(formData.expirationDate),
            productionDate: new Date(formData.productionDate),
            quantityAvailable: Number(formData.quantity)
        };
        setIsPending(true);
        const response = await createNewInventory(data);
        if (typeof (response) !== 'string') {
            setIsPending(false);
            Swal.fire({
                icon: 'success',
                title: 'New Inventory created successfully',
                text: response.message,
            });
            // reset the form
            setFormData({
                productId: '',
                packageId: '',
                quantity: 0,
                location: '',
                productionDate: new Date().toISOString().split('T')[0],
                expirationDate: ''
            });

        } else {
            setIsPending(false);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: response,
            });
        }
    }
    const selectedPackages = packages[formData.productId] || [];

    return (
        <div>
            <div className='bg-cyan-900 py-6 text-white'>
                <h1 className='text-4xl'>New Inventory</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col p-6 items-start space-y-3 w-full'>
                    <label className='text-lg font-semibold'>Product</label>
                    <select
                        className='border p-2 w-full'
                        onChange={handleInputChange}
                        name='productId'
                        value={formData.productId}
                    >
                        <option value="">Select Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col p-6 items-start space-y-3 w-full'>
                    <label className='text-lg font-semibold'>Package</label>
                    <select
                        className='border p-2 w-full'
                        onChange={handleInputChange}
                        name='packageId'
                        value={formData.packageId}
                    >
                        <option value="">Select Package</option>
                        {selectedPackages.map(packageV => (
                            <option key={packageV.id} value={packageV.id}>{packageV.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col p-6 items-start space-y-3 w-full'>
                    <label className='text-lg font-semibold'>Quantity</label>
                    <input
                        type='number'
                        className='border p-2 w-full'
                        onChange={handleInputChange}
                        name='quantity'
                        value={formData.quantity === 0 ? '' : formData.quantity}
                    />
                </div>
                <div className='flex flex-col p-6 items-start space-y-3 w-full'>
                    <label className='text-lg font-semibold'>Production Date</label>
                    <input
                        type='date'
                        className='border p-2 w-full'
                        onChange={handleInputChange}
                        name='productionDate'
                        value={formData.productionDate}
                    />
                </div>
                <div className='flex flex-col p-6 items-start space-y-3 w-full'>
                    <label className='text-lg font-semibold'>Expiration Date</label>
                    <input
                        type='date'
                        className='border p-2 w-full'
                        onChange={handleInputChange}
                        name='expirationDate'
                        value={formData.expirationDate}
                    />
                </div>
                <div className='flex flex-col items-center p-4 rounded-md'>
                    <button type='submit' className='bg-lime-900 text-white text-2xl px-14 py-6 rounded-3xl'>
                        {isPending ? (
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>
                        ) : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewInventory;
