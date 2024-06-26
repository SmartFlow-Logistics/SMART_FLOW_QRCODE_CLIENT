import { useState, useEffect } from "react";
import moment from "moment";
import { productCheckAction } from "../actions/product_check_action";
import { ProductCheckResponse } from "../types/product_check_types";
import { useLocation } from "react-router-dom";


function ProductCheck() {
    // select the inventoryId and productId from the URL query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const inventoryId = searchParams.get("inventoryId") ?? '';
    const productId = searchParams.get("productId") ?? '';

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<ProductCheckResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productCheckAction(productId, inventoryId);

                if (typeof response === 'string') {
                    setError(response);
                } else {
                    setProductDetails(response);
                }

                setIsLoading(false);
            } catch (error) {
                setError(error as string);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productId, inventoryId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl font-semibold">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="flex flex-col items-start bg-white shadow-lg rounded-lg p-8 w-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{productDetails?.productDetails.name}</h1>
                <div className="flex max-md:flex-col justify-between space-x-4 p-4">
                    <div className="flex-1 flex flex-col space-y-4">
                        <img src={productDetails?.productDetails.image} alt="product image" />
                        <div className="flex flex-col items-start space-y-2">
                            <DataViewer label="Product Name" data={productDetails?.productDetails.name ?? ""} />
                            <DataViewer label="Product Code" data={productDetails?.productDetails.productCode ?? ""} />
                            <div className="flex flex-col items-start space-x-0 w-full">
                                <h2 className="text-lg font-semibold text-gray-700 max-md:text-base">Description:</h2>
                                <p className="w-full flex justify-start text-gray-600 border p-3">{productDetails?.productDetails.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start space-y-2 py-3 px-6 max-md:px-none">
                        <DataViewer label="Width" data={`${productDetails?.productDetails.width} ${productDetails?.productDetails.dimensionUnit ?? ""}`} />
                        <DataViewer label="Height" data={`${productDetails?.productDetails.width} ${productDetails?.productDetails.dimensionUnit ?? ""}`} />
                        <DataViewer label="Depth" data={`${productDetails?.productDetails.width} ${productDetails?.productDetails.dimensionUnit ?? ""}`} />
                        <DataViewer label="Weight" data={`${productDetails?.productDetails.weight} ${productDetails?.productDetails.massUnit ?? ""}`} />
                        <DataViewer label="Production Date" data={moment(productDetails?.inventoryDetails.productionDate).format('MMMM Do YYYY')} />
                        <DataViewer label="Expiration Date" data={moment(productDetails?.inventoryDetails.expirationDate).format('MMMM Do YYYY')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataViewer({ label, data }: { label: string, data: string }) {
    return (
        <div className="flex max-md:flex-col max-md:items-start max-md:space-x-0 space-x-3">
            <h2 className="text-lg font-semibold text-gray-700 max-md:text-base">{label}:</h2>
            <p className="text-gray-600">{data}</p>
        </div>
    )
}

export default ProductCheck;