import useAxios from ".";

  // Membuat Bahan Baku baru
  export const sendRecoveryEmail = async (data) => {
    try {
      const response = await useAxios.post("/change-password", data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const findUserBasedFromToken = async (token) => {
    try {
      const response = await useAxios.post("/find-user-token", { token }); // Send token as part of the request body
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };  
  
  // Mengedit Bahan Baku
  export const ChangePasswordToken = async (values, token) => {
    try {
      const response = await useAxios.post(`/change-password/${token}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
