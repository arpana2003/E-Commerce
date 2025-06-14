import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await axiosInstance.post("user/register", data);

    toast.promise(Promise.resolve(res), {
      loading: "Wait creating your account",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });

    return res.data;
  } catch (e) {
    toast.error(e?.response?.data?.message || "An error occurred");
    throw e;
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axiosInstance.post("/user/login", data);

    toast.promise(Promise.resolve(res), {
      loading: "Wait , authentication in progress....",
      success: (data) => data?.data?.message,
      error: "Failed to login",
    });

    return await res.data;
  } catch (e) {
    toast.error(e?.response?.data?.message || "An error occurred");
    throw e;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await axiosInstance("/user/logout");

  toast.promise(Promise.resolve(res), {
    loading: "Wait , logout in progress....",
    success: (data) => data?.data?.message,
    error: "Failed to logout",
  });
  return await res.data;
});

export const updateprofile= createAsyncThunk("auth/updateProfile",async(data)=>{
    try {
        const res=await axiosInstance.put(`user/update/${data[0]}`, data[1],{ headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},});

        toast.promise(Promise.resolve(res), {
            loading: "Wait, profile update in progress....",
            success: (data) => data?.data?.message,
            error: "Failed to update profile",
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
      throw error;
    }
});

export const getUserData= createAsyncThunk("/user/details",async()=>{
    try {
        const res=await axiosInstance.get("user/me");
        return(await res).data;
    } catch (error) {
        toast.error(error.message);
    }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUserData.rejected, (state, action) => {
      state.error = action.error.message;
      toast.error("Failed to fetch user data.");
    })
    .addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
    .addCase(logout.fulfilled,(state,action)=>{
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
    })
    .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export default authSlice.reducer;
