import { GenericRequestSchema, GenericResponseSchema } from "@/model/generic";
import { TripApiResponseSchema } from "@/model/trip";
import { TruckApiResponseSchema } from "@/model/truck";
import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class TruckApiProvider {
  async fetchTrucks(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<TruckApiResponseSchema | null>(
        "/customer/vehicle",
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

  async createTruck(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customer/vehicle",
        data
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
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

  async truckDetails(data: any) {
    try {
      const result = await ApiClient.get<any | null>("/customer/vehicle/edit", {
        params: data,
      });
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

  async updateTruck(data: any) {
    try {
      const result = await ApiClient.put<GenericResponseSchema | null>(
        "/customer/vehicle",
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

  async fetchTrip(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<TripApiResponseSchema | null>(
        "/customer/trip",
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

  async fetchActiveTrucks(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<TruckApiResponseSchema | null>(
        "/customer/vehicle/active",
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

  async createTrip(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customer/trip",
        data
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
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

  async cancelTrip(data: any) {
    try {
      const result = await ApiClient.put<GenericResponseSchema | null>(
        "/customer/trip/cancel",
        data
      );
      const statusCode = result.status ?? 0;
      const message = result.data?.message ?? "Something went wrong";
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

  async fetchTripJourney(data: any) {
    try {
      const result = await ApiClient.post<any | null>(
        "/customer/trip/monitorDetails",
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
const truckApiProvider = new TruckApiProvider();

export default truckApiProvider;
