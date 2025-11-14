import { showNotification } from "@mantine/notifications";

function showAlertNotification(message: string, success: boolean) {
  showNotification({
    color: success ? "green" : "red",
    title: success ? "Success" : "Error",
    message,
  });
}

function showAxiosErrorAlert(error: any) {
  let message = "Something went wrong";
  if (error.message === "Network Error") {
    // Network error occurred
    message = "No internet, Check your network connection.";
  } else if (error && error.response) {
    message = error.response.data?.message ?? message;
  } else {
    message = error.toString();
  }
  showAlertNotification(message, false);
}

const notification = {
  showAlertNotification,
  showAxiosErrorAlert,
};

export default notification;
