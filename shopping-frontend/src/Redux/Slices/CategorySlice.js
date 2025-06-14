import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  categoryData: [],
};

export const getCategory = createAsyncThunk("/category/get", async () => {
  try {
    const res = await axiosInstance.get("/items/");

    return res.data.category;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createCategory = createAsyncThunk(
  "/createCategory",
  async (data) => {
    try {
      const response = await axiosInstance.post("/items/", data);

      toast.promise(response, {
        loading: "Creating new category",
        success: "Category created successfully",
        error: "Failed to create category",
      });

      return (await response).data;
    } catch (error) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "/removeCategory",
  async (data) => {
    try {
      const response = await axiosInstance.delete(`/items/${data}`);
      toast.success(await response).message;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const createItem = createAsyncThunk(
  "/category/createItem",
  async (data) => {
    try {
      const response = await axiosInstance.post(`/items/${data[0]}`, data[1]);
      return (await response).data;
    } catch (error) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const removeItemfromCategory = createAsyncThunk(
  "/category/removeitem",
  async ({ categoryId, itemId }) => {
    try {
      const response = await axios.delete(
        `/api/category/${categoryId}?itemId=${itemId}`
      );
      return response.data;
    } catch (error) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "category/item/removeWishlist",
  async (data) => {
    try {
      const response = await axiosInstance.delete(`/items/wishlist/${data}`);

      toast.promise(Promise.resolve(response), {
        loading: "removing item from wishlist ....",
        success: "Item removed from wishlist successfully",
        error: "Failed to remove from wishist",
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addtoWishlist = createAsyncThunk(
  "/category/item/addToWishlist",
  async () => {
    try {
      const response = await axiosInstance.post("/items/wishlist");
      toast.promise(response, {
        loading: "adding item from wishlist ....",
        success: "Item added from wishlist successfully",
        error: "Failed to add from wishist",
      });

      return await response;
    } catch (error) {
      toast.error(e?.response?.data?.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/category/update",
  async ({ id, formData }) => {
    try {
      const response = await axiosInstance.put(`/items/${id}`, formData);

      toast.promise(Promise.resolve(response), {
        loading: "Updating category...",
        success: "Category updated successfully!",
        error: "Failed to update category.",
      });

      return (await response).data;
    } catch (error) {
      toast.error(e?.response?.data?.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        if (action?.payload) {
          state.categoryData = [...action.payload];
        }
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedIndex = state.categoryData.findIndex(
          (cat) => cat._id === action.payload?.updatedCategory?._id
        );
        if (updatedIndex !== -1) {
          state.categoryData[updatedIndex] = action.payload.updatedCategory;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
});

export default categorySlice.reducer;
