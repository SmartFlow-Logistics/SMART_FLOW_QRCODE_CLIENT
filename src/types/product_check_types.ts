export interface Inventory {
  id: string;
  productId: string;
  packageId: string;
  expirationDate: Date;
  productionDate: Date;
  quantityAvailable: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  productCode: string;
  barcode: string;
  serialNumber: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  refrigerated: boolean;
  image: string;
  massUnit: string;
  liquidUnit: string;
  dimensionUnit: string;
}

export interface ProductCheckResponse {
  inventoryDetails: Inventory;
  productDetails: Product;
}
