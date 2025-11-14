import ApiClient from "@/network/api-client";
import notification from "@/utills/notification";

class UserApiProvider {
  // ===========================
  // WEBPAGE
  // ===========================
  async fetchWebpage() {
    try {
      const result = await ApiClient.get("/webPage");
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

  // ===========================
  // ROLE
  // ===========================

  async createRole(data) {
    try {
      const result = await ApiClient.post("/customer/role", data);
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "Role created successfully";
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

  async fetchRoleData(params) {
    try {
      const result = await ApiClient.get("/customer/role", { params });
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

  async updateRole(data) {
    try {
      const result = await ApiClient.put("/customer/role", data);
      const statusCode = result.status ?? 0;
      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "Role updated successfully";
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

  // ===========================
  // USER CRUD
  // ===========================

  async fetchUser(params, signal) {
    try {
      const result = await ApiClient.get("/customer/user", {
        params,
        signal,
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
      if (signal?.aborted) {
        console.warn("Previous Request Was Canceled");
      } else {
        notification.showAxiosErrorAlert(error);
      }
      return null;
    }
  }

  async createUser(data) {
    try {
      const result = await ApiClient.post("/masters/users/", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User created successfully";
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

  async updateUserGeneralDetails(data) {
    try {
      const result = await ApiClient.put("/customer/user", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User updated successfully";
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

  async updateUserRoleDetails(data) {
    try {
      const result = await ApiClient.put("/customer/user/role", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User updated successfully";
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

  // ===========================
  // USER GROUP
  // ===========================

  async fetchUserGroup(params) {
    try {
      const result = await ApiClient.get("/customer/user/group", { params });
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

  async createUserGroup(data) {
    try {
      const result = await ApiClient.post("/customer/user/group", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User group created successfully";
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

  async updateUserGroup(data) {
    try {
      const result = await ApiClient.put("/customer/user/group", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User Group updated successfully";
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

  async removeUserGroup(id) {
    try {
      const result = await ApiClient.put(`/customer/user/removeGroup/${id}`);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "User group removed successfully";
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

  // ===========================
  // KEY MAPPING
  // ===========================

  async fetchUnMappedUsers() {
    try {
      const result = await ApiClient.get("/customer/userKey/user");
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

  async fetchUserKeyMappings(params) {
    try {
      const result = await ApiClient.get("customer/userKey", { params });
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

  async createUserKeyMapping(data) {
    try {
      const result = await ApiClient.post("customer/userKey", data);
      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "UserKey mapped successfully";
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

  async removeUserKeyMapping(data) {
    try {
      const result = await ApiClient.delete("customer/userKey", {
        params: data,
      });

      const statusCode = result.status ?? 0;

      let message = result.data?.message ?? "Something went wrong";

      if (statusCode === 200 || statusCode === 201) {
        message = "UserKey mapping removed successfully";
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

  // ===========================
  // ROLE BASED WEBPAGE
  // ===========================
  async fetchWebPageByRoleId(params) {
    try {
      const result = await ApiClient.get("customer/role/details", { params });

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

  // ===========================
  // UPDATE PASSWORD
  // ===========================
  async updatePassword(data) {
    try {
      const result = await ApiClient.put(
        "customer/user/changePassword",
        data
      );

      const statusCode = result.status ?? 0;
      const message =
        result.data?.message ?? "Password updated successfully";

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

const userApiProvider = new UserApiProvider();
export default userApiProvider;
