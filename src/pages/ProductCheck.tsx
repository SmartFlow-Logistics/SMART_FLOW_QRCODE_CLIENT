import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { productCheckAction } from "../actions/product_check_action";
import { ProductCheckResponse } from "../types/product_check_types";

function ProductCheck() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const inventoryId = searchParams.get("inventoryId") as string;
    const productId = searchParams.get("productId") as string;

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
                <div className="flex justify-between space-x-4 p-4">
                    <div className="flex-1 flex flex-col space-y-4">
                        <img src={productDetails?.productDetails.image} alt="product image" />
                        <div className="flex flex-col items-start">
                            <div className="flex space-x-3">
                                <h3 className="text-lg font-semibold text-gray-700">Product Name: </h3>
                                <p className="text-gray-600">{productDetails?.productDetails.name}</p>
                            </div>
                            <div className="flex space-x-3">
                                <h2 className="text-lg font-semibold text-gray-700">Product ID:</h2>
                                <p className="text-gray-600">{productId}</p>
                            </div>
                            <p className="text-gray-600">{productDetails?.productDetails.description}</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start">
                        <div className="flex space-x-3">
                            <h2 className="text-lg font-semibold text-gray-700">Inventory ID:</h2>
                            <p className="text-gray-600">{inventoryId}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductCheck;