// // src/store/useUserStore.js
// import { create } from "zustand";
// import userApiProvider from "../../../network/user-api-provider";
// import { toast } from "react-toastify";

// const useUserStore = create((set) => ({
//   users: [],
//   loading: false,
//   currentPage: 1,
//   totalPages: 1,

//   fetchUsers: async (page = 1) => {
//   set({ loading: true });

//   try {
//     const response = await userApiProvider.fetchUsers(page);

//     let users = response?.results || response?.data || response?.users || [];

//     set({
//       users,
//       currentPage: page,
//       totalPages: response.total_pages || 1,
//     });

//   } catch (error) {
//     toast.error("Failed to load users");
//     set({ users: [] });
//   }

//   set({ loading: false });
// },

// }));

// export default useUserStore;
// src/store/useUserStore.js

import { create } from "zustand";
import userApiProvider from "../../../network/user-api-provider";
import { toast } from "react-toastify";

const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  search: "",

  setSearch: (value) => set({ search: value }),

  fetchUsers: async (page = 1, search = null) => {
    const currentSearch = search !== null ? search : get().search;

    set({ loading: true });

    try {
      const response = await userApiProvider.fetchUsers(page, currentSearch);
      
      // Ensure API response is safe
      const users = response?.users || [];
      const current_page = response?.current_page || page;
      const total_pages = response?.total_pages || 1;

      set({
        users,
        currentPage: current_page,
        totalPages: total_pages,
        search: currentSearch,
      });
    } catch (error) {
      toast.error("Failed to load users");
      set({
        users: [],
        currentPage: 1,
        totalPages: 1,
      });
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (userId) => {
  const success = await userApiProvider.deleteUser(userId);

  if (success) {
    set({
      users: get().users.filter((u) => u.id !== userId),
    });
  }
  },
}));

export default useUserStore;
