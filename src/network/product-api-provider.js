import ApiClient from "./api-client";
import { toast } from "react-toastify";

class ProductApiProvider {
  // =====================================================
  // FETCH LISTS (Products, Categories, Suppliers/Brands)
  // =====================================================

  async fetchProducts(page = 1, search = "") {
    try {
      const res = await ApiClient.get("/masters/products/", {
        params: { page, search },
      });
      if (res.status === 200) return res.data;
      toast.error("Failed to load products");
      return { products: [], total_pages: 1, current_page: 1 };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading products");
      return { products: [], total_pages: 1, current_page: 1 };
    }
  }

  async fetchCategories() {
    try {
      const res = await ApiClient.get("masters/product-categories/");

      if (res.status === 200) return res.data.categories ?? res.data;

      toast.error("Failed to load categories");
      return [];
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading categories");
      return [];
    }
  }

  async fetchBrands() {
    try {
      const res = await ApiClient.get("masters/product-suppliers/");

      if (res.status === 200) return res.data.suppliers ?? res.data;

      toast.error("Failed to load brands");
      return [];
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading brands");
      return [];
    }
  }

  async fetchSingleProduct(productId) {
    try {
      const res = await ApiClient.get(`masters/product/${productId}/`);

      if (res.status === 200) return res.data;

      toast.error("Failed to load product details");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading product");
      return null;
    }
  }

  // =====================================================
  // CREATE PRODUCT
  // =====================================================

  async createProduct(data) {
    try {
      const res = await ApiClient.post("masters/product/", data);

      if (res.status === 200 || res.status === 201) {
        toast.success("Product created successfully");
        return res.data;
      }

      toast.error("Failed to create product");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating product");
      return null;
    }
  }

  // =====================================================
  // UPDATE PRODUCT
  // =====================================================

  async updateProduct(productId, data) {
    try {
      const res = await ApiClient.put(`/products/${productId}/`, data);

      if (res.status === 200) {
        toast.success("Product updated successfully");
        return res.data;
      }

      toast.error("Failed to update product");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating product");
      return null;
    }
  }

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  async deleteProduct(productId) {
    try {
      const res = await ApiClient.delete(`/products/${productId}/`);

      if (res.status === 204 || res.status === 200) {
        toast.success("Product deleted successfully");
        return true;
      }

      toast.error("Failed to delete product");
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting product");
      return false;
    }
  }
}

const productApiProvider = new ProductApiProvider();
export default productApiProvider;
