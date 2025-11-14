import { AssetApiResponseSchema } from "@/model/asset";
import { GatewayApiResponseSchema } from "@/model/gateway";
import { GenericRequestSchema, GenericResponseSchema } from "@/model/generic";
import { GeofenceApiSchema } from "@/model/geofence";
import { LocationApiResponseSchema } from "@/model/location";
import {
  LockGroupApiResponseSchema,
  LockMappingApiResponseSchema,
} from "@/model/lock";
import { UserByLocationIdApiResponseSchema } from "@/model/user";
import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class LocationApiProvider {
  async fetchCustomerLocation(
    params: GenericRequestSchema,
    data?: any,
    signal?: AbortSignal
  ) {
    try {
      const result = await ApiClient.post<LocationApiResponseSchema | null>(
        "customerLocation",
        data,
        {
          params: {
            page: params.page,
            search: params.search,
          },
          signal: signal,
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
      if (signal?.aborted) {
        console.warn("Previous Request Was Canceled");
      } else {
        notification.showAxiosErrorAlert(error);
        return null;
      }
    }
  }

  async fetchUsersByLocation(data: any) {
    try {
      const result =
        await ApiClient.get<UserByLocationIdApiResponseSchema | null>(
          "customer/user/location",
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

  async fetchLockMappingByLocationId(data: any) {
    try {
      const result = await ApiClient.get<LockMappingApiResponseSchema | null>(
        "customer/lock/mapping",
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

  async createLocation(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customerLevel/level",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Location added successfully";
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

  async createLockMapping(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customer/lock/mapping",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Lock mapping created successfully";
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

  async removeLockMapping(data: any) {
    try {
      const result = await ApiClient.delete<GenericResponseSchema | null>(
        "customer/lock/mapping",
        {
          params: data,
        }
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Lock mapping removed successfully";
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

  async fetchLockGroupByLocationId(data: any) {
    try {
      const result = await ApiClient.get<LockGroupApiResponseSchema | null>(
        "customer/lock/group",
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

  async createGeofence(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customerLocation/createGeofence",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Geofence created successfully";
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

  async fetchGeofence(data: any) {
    try {
      const result = await ApiClient.get<GeofenceApiSchema | null>(
        "customerLocation/geofence",
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

  async updateGeofence(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customerLocation/updateGeofence",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Geofence updated successfully";
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

  async updateLocation(data: any) {
    try {
      const result = await ApiClient.patch<GenericResponseSchema | null>(
        "/customerLevel/level",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Location updated successfully";
        notification.showAlertNotification(message, true);
        return result;
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error: any) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async createLockGroup(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customer/lock/group",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Lock group created successfully";
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

  async updateLockGroup(data: any) {
    try {
      const result = await ApiClient.put<GenericResponseSchema | null>(
        "customer/lock/group",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Lock group updated successfully";
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

  async removeLockGroup(data: any) {
    try {
      const result = await ApiClient.delete<GenericResponseSchema | null>(
        "customer/lock/group",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Lock group removed successfully";
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

  async removeGeofence(data: any) {
    try {
      const result = await ApiClient.delete<GenericResponseSchema | null>(
        "customerLocation/geofence",
        { params: data }
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Geofence removed successfully";
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

  async fetchNonMappingGatewayAssets(params: any, data: any) {
    try {
      const result = await ApiClient.post<AssetApiResponseSchema | null>(
        `customer/gateway/nonMappingGatewayAssets`,
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

  async createGateway(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "customer/gateway/new",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
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

  async fetchGateway(params: any, data: any) {
    try {
      const result = await ApiClient.post<GatewayApiResponseSchema | null>(
        "customer/gateway",
        data,
        {
          params: {
            page: params.page,
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

  async removeGateway(data: any) {
    try {
      const result = await ApiClient.delete<GenericResponseSchema | null>(
        "customer/gateway",
        {
          data: data,
        }
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
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
}

const locationApiProvider = new LocationApiProvider();

export default locationApiProvider;
