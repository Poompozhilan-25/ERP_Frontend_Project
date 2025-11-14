import {
  AssetApiResponseSchema,
  AssetHistoryApiResponseSchema,
  ProductTypeApiResponseSchema,
  UnMappedAssetApiResponseSchema,
} from "@/model/asset";
import { GenericRequestSchema, GenericResponseSchema } from "@/model/generic";
import { LockGroupLockApiResponseSchema } from "@/model/lock";
import { ReturnsApiResponseSchema } from "@/model/returns";
import {
  ShipmentApiResponseSchema,
  ShipmentAssetApiResponseSchema,
} from "@/model/shipment";
import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class AssetApiProvider {
  async fetchShipment(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<ShipmentApiResponseSchema | null>(
        "/customer/shipment",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchShipmentAsset(params: any) {
    try {
      const result = await ApiClient.get<ShipmentAssetApiResponseSchema | null>(
        "/customer/asset/shipment",
        {
          params,
        }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async approveShipment(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        `/customer/shipment/changeStatus`,
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Shipment approved successfully";
        notification.showAlertNotification(message, true);
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchAssets(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<AssetApiResponseSchema | null>(
        "/customer/asset",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchUnMappedKeys() {
    try {
      const result = await ApiClient.get<UnMappedAssetApiResponseSchema | null>(
        "customer/userKey/key"
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchUnMappedLocks() {
    try {
      const result = await ApiClient.get<UnMappedAssetApiResponseSchema | null>(
        "customer/lock/nonMapping"
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchLockGroupLocks(data: any) {
    try {
      const result = await ApiClient.get<LockGroupLockApiResponseSchema | null>(
        "customer/lock/groupDetail",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchSpareAssets(params: any, data: any) {
    try {
      const result =
        await ApiClient.post<UnMappedAssetApiResponseSchema | null>(
          "customer/asset/spare",
          data,
          {
            params: {
              page: 1,
              search: params.search,
            },
          }
        );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchReturns(data: any) {
    try {
      const result = await ApiClient.get<ReturnsApiResponseSchema | null>(
        "customer/returnAsset",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async returnStock(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customer/returnAsset",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Return stock request created successfully";
        notification.showAlertNotification(message, true);
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchReturnAssets(data: any) {
    try {
      const result = await ApiClient.get<ShipmentAssetApiResponseSchema | null>(
        "customer/asset/returns",
        {
          params: data,
        }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchProductTypes() {
    try {
      const result = await ApiClient.get<ProductTypeApiResponseSchema | null>(
        "/productType"
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchStockHistory(assetId: number) {
    try {
      const result = await ApiClient.get<AssetHistoryApiResponseSchema | null>(
        "customer/asset/history",
        {
          params: {
            assetId: assetId,
          },
        }
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async fetchSpareAsset(data: any) {
    try {
      const result =
        await ApiClient.post<UnMappedAssetApiResponseSchema | null>(
          "customer/asset/typeSpare",
          data
        );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
}

const assetApiProvider = new AssetApiProvider();

export default assetApiProvider;
