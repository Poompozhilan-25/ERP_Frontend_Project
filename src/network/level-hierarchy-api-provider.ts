import { DropdownLocationsApiResponseSchema } from "@/model/dropDownLocations";
import { GenericResponseSchema } from "@/model/generic";
import {
  LevelHierarchyApiResponseSchema,
  LocationApiResponseSchema,
} from "@/model/location";
import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class LevelHierarchyApiProvider {
  async createOnboardingSetup(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customerLevel/hierarchy",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message =
          result.data?.message ?? "CustomerLevel hierarchy added successfully";
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

  async createCustomerLevels(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customerLevel/defaultLevels",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = result.data?.message ?? "customerLevel added successfully";
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

  async createCustomerLocations(data: any) {
    try {
      const result = await ApiClient.post<GenericResponseSchema | null>(
        "/customerLevel/level",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = result.data?.message ?? "CustomerLevel added successfully";
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

  async fetchLevelHierarchy() {
    try {
      const result =
        await ApiClient.get<LevelHierarchyApiResponseSchema | null>(
          "/customerLevel/hierarchies"
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

  async fetchCustomerDropdownLocations(params: any) {
    try {
      const result =
        await ApiClient.get<DropdownLocationsApiResponseSchema | null>(
          "/customerLevel/allLevels",
          {
            params: params,
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

  async fetchLocationByHierarchyId(params: any) {
    try {
      const result = await ApiClient.get<LocationApiResponseSchema | null>(
        "/customerLevel/levels",
        {
          params: params,
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

  async updateLevelManagement(data: any) {
    try {
      const result = await ApiClient.patch<GenericResponseSchema | null>(
        "/customerLevel/level",
        data
      );
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";
      if (statusCode === 200 || statusCode === 201) {
        message = "Level updated successfully";
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
}
const levelHierarchyApiProvider = new LevelHierarchyApiProvider();

export default levelHierarchyApiProvider;
