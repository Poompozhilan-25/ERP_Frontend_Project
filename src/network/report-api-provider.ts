import { AccessApiResponseSchema } from "@/model/access";
import { GenericRequestSchema } from "@/model/generic";
import { EventReportApiResponseSchema } from "@/model/report/event";
import { FaceRegistrationReportApiResponseSchema } from "@/model/report/faceRegistration";
import { FaceVerificationReportApiResponseSchema } from "@/model/report/faceVerification";
import { OtpReportApiResponseSchema } from "@/model/report/otp";
import { TripApiResponseSchema } from "@/model/trip";
import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class ReporApiProvider {
  async fetchEventReport(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<EventReportApiResponseSchema | null>(
        "customer/report/event",
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

  async fetchAccessReport(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<AccessApiResponseSchema | null>(
        "customer/report/access",
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

  async fetchFaceVerificationReport(data: GenericRequestSchema) {
    try {
      const result =
        await ApiClient.get<FaceVerificationReportApiResponseSchema | null>(
          "customer/report/faceVerification",
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

  async fetchTripReport(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<TripApiResponseSchema | null>(
        "customer/report/trip",
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

  async fetchFaceRegistrationRequest(data: GenericRequestSchema) {
    try {
      const result =
        await ApiClient.get<FaceRegistrationReportApiResponseSchema | null>(
          "percept/registration/request",
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

  async fetchOtpReport(data: GenericRequestSchema) {
    try {
      const result = await ApiClient.get<OtpReportApiResponseSchema | null>(
        "customer/report/otp",
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
}

const reportApiProvider = new ReporApiProvider();

export default reportApiProvider;
