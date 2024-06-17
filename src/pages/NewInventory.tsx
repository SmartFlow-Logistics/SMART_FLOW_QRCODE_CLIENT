import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { createNewInventory } from '../actions/inventory_action'
import { NewInventoryRequest } from '../types/inventory_types'

const products = [
    { id: 'f5263511-43cc-41dd-a307-986902059cc1', name: 'Muya biskut' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
    { id: '4', name: 'Product 4' },
    { id: '5', name: 'Product 5' },
]

const packages = [
    { id: '1dbfa3c9-0212-4ec5-9a8d-d7c51289c2d1', name: 'Carton' },
    { id: '2', name: 'Package 2' },
    { id: '3', name: 'Package 3' },
    { id: '4', name: 'Package 4' },
    { id: '5', name: 'Package 5' },
]

function NewInventory() {

    const [formData, setFormData] = useState({
        productId: '',
        packageId: '',
        quantity: 0,
        location: '',
        productionDate: new Date().toISOString().split('T')[0],
        expirationDate: ''
    })

    const [isPending, setIsPending] = useState(false)

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
        event.preventDefault()
        const data: NewInventoryRequest = {
            productId: formData.productId,
            packageId: formData.packageId,
            expirationDate: new Date(formData.expirationDate),
            productionDate: new Date(formData.productionDate),
            quantityAvailable: Number(formData.quantity)
        }
        setIsPending(true)
        const response = await createNewInventory(data)
        if (typeof (response) !== 'string') {
            setIsPending(false)
            Swal.fire({
                icon: 'success',
                title: 'New Inventory created successfully',
                text: response.message,
            })
            // reset the form
            setFormData({
                productId: '',
                packageId: '',
                quantity: 0,
                location: '',
                productionDate: new Date().toISOString().split('T')[0],
                expirationDate: ''
            })

        } else {
            setIsPending(false)
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'response',
            })
        }
    }
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
                        {packages.map(packageV => (
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

export default NewInventory