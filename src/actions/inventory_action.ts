import { AxiosError } from "axios";
import http from "../http-common";
import {
  NewInventoryRequest,
  NewInventoryResponse,
} from "../types/inventory_types";

export async function createNewInventory(newInventory: NewInventoryRequest) {
  try {
    const res = await http.post(`/inventory`, newInventory);
    return res.data as NewInventoryResponse;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    return axiosError.message as string;
  }
}