import useAxios from ".";

// Mendapatkan semua penitip untuk ditaruh di halaman dashboard
export const GetAllPenitips = async () => {
  try {
    const response = await useAxios.get("/penitips", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

  // [Tidak dipakai] Mendapatkan Penitip by nama penitip
  export const GetPenitipByName = async (nama_penitip) => {
    try {
      const response = await useAxios.get(`/penitips/${nama_penitip}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Membuat Penitip baru
  export const CreatePenitip = async (data) => {
    try {
      const response = await useAxios.post("/penitips", data, {
        headers: {
          "Content-Type": "application/json", // untuk upload thumbnail
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

// Mengedit penitip
export const UpdatePenitip = async (values) => {
    try {
      const response = await useAxios.put(`/penitips/${values.id}`, values, {
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
  
  // Menghapus penitpi
  export const DeletePenitip = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await useAxios.delete(`/penitips/${id}`, {
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

  
