import useAxios from ".";

// Mendapatkan semua penitip untuk ditaruh di halaman dashboard
export const GetAllBahanBakus = async () => {
  try {
    const response = await useAxios.get("/bahanbakus", {
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

  //  Mendapatkan Bahan Baku by nama Bahan Baku
  export const GetBahanBakuByName = async (nama_bahan) => {
    try {
      const response = await useAxios.get(`/bahanbakus/${nama_bahan}`, {
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
  
  // Membuat Bahan Baku baru
  export const CreateBahanBaku = async (data) => {
    try {
      const response = await useAxios.post("/bahanbakus", data, {
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

// Mengedit Bahan Baku
export const UpdateBahanBaku = async (values) => {
    try {
      const response = await useAxios.put(`/bahanbakus/${values.id}`, values, {
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
  
  // Menghapus Bahan Baku
  export const DeleteBahanBaku = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await useAxios.delete(`/bahanbakus/${id}`, {
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

  
