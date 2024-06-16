export interface NewInventoryRequest {
  productId: string;
  packageId: string;
  expirationDate: Date;
  productionDate: Date;
  quantityAvailable: number;
}

export interface NewInventoryResponse {
  status: string;
  data: NewInventoryRequest;
  message: string;
}
