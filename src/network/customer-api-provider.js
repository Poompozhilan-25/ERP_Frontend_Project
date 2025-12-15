// api/customer-api-provider.js
import ApiClient from "./api-client";
import { toast } from "react-toastify";

class CustomerApiProvider {
  async fetchCustomers(params) {
    try {
      console.log("API CALL → /customers/", params);

      const res = await ApiClient.get("/masters/customers/", { params });

      if (res.status === 200) return res.data;

      toast.error("Failed to load customers");
      return { customers: [], total_pages: 1 };

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching customers"
      );
      return { customers: [], total_pages: 1 };
    }
  }

  async deleteCustomer(id) {
    try {
      const res = await ApiClient.delete(`/customers/${id}/`);

      if (res.status === 204 || res.status === 200) {
        toast.success("Customer deleted");
        return true;
      }

      toast.error("Failed to delete customer");
      return false;

    } catch (error) {
      toast.error("Error deleting customer");
      return false;
    }
  }

  async fetchSingleCustomer(id) {
    try {
      const res = await ApiClient.get(`/customers/${id}/`);

      if (res.status === 200) return res.data;

      toast.error("Failed to load customer details");
      return null;

    } catch (error) {
      toast.error("Error fetching customer details");
      return null;
    }
  }
}

export default new CustomerApiProvider();
