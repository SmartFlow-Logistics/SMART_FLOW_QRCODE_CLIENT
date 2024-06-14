import { AxiosError } from "axios";
import http from "../http-common";
import { ProductCheckResponse } from "../types/product_check_types";

export async function productCheckAction(
  productId: string,
  inventoryId: string
) {
  try {
    const res = await http.get(
      `/productInfo?productId=${productId}&inventoryId=${inventoryId}`
    );
    return res.data as ProductCheckResponse;
  } catch (error) {
    const axiosError = error as AxiosError;
    return axiosError.message as string;
  }
}
