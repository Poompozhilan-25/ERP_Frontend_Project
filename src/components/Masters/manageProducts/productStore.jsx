import { create } from "zustand";
import productApiProvider from "../../../network/product-api-provider";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  // ============================
  // FETCH PRODUCTS
  // ============================
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await productApiProvider.fetchProducts();
      set({ products: data });
    } finally {
      set({ loading: false });
    }
  },

  // ============================
  // DELETE PRODUCT
  // ============================
  deleteProduct: async (id) => {
    const success = await productApiProvider.deleteProduct(id);
    if (success) {
      set({
        products: get().products.filter((item) => item.id !== id),
      });
    }
  },
}));

export default useProductStore;
