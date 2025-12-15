// store/customerStore.js
import { create } from "zustand";
import customerApiProvider from "../../../network/customer-api-provider";
import { toast } from "react-toastify";

export const useCustomerStore = create((set, get) => ({
  customers: [],
  totalPages: 1,
  loading: false,

  filters: {
    page: 1,
    per_page: 10,
    status: "",
    customer_type: "",
    assigned_sales_rep: "",
    search: "",
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
        ...(key !== "page" && { page: 1 }), // Reset page when filters change
      },
    })),

  fetchCustomers: async () => {
    const { filters } = get();
    set({ loading: true });

    console.log("Zustand FETCH with filters →", filters);

    const data = await customerApiProvider.fetchCustomers(filters);

    const formatted = data.customers?.map((c) => ({
      id: c.id,
      customer_id: c.customer_id,
      first_name: c.first_name,
      company_name: c.company_name || "N/A",
      customer_type: c.customer_type,
      email: c.email,
      status: c.status,
      credit_limit: c.credit_limit?.toString(),
      city: c.city,
    })) ?? [];

    set({
      customers: formatted,
      totalPages: data.total_pages || 1,
      loading: false,
    });
  },

  deleteCustomer: async (id) => {
    const ok = window.confirm("Delete this customer?");
    if (!ok) return;

    const success = await customerApiProvider.deleteCustomer(id);

    if (success) {
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
      }));
    }
  },
}));
