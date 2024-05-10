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

  // Mengedit Bahan Baku
  export const ChangePassword = async (values, token) => {
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
