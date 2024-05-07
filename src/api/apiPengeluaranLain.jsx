import useAxios from ".";

// Mendapatkan semua Pengeluaran Lain untuk ditaruh di halaman dashboard
export const GetAllPengeluaranLain = async () => {
  try {
    const response = await useAxios.get("/pengeluaranlains", {
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

  // Mendapatkan Pengeluaran Lain by tanggal
  export const GetPengeluaranLainByDate = async (tanggal_pengeluaran) => {
    try {
      const response = await useAxios.get(`/pengeluaranlains/${tanggal_pengeluaran}`, {
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
  
  // Membuat Pengeluaran Lain baru
  export const CreatePengeluaranLain = async (data) => {
    try {
      const response = await useAxios.post("/pengeluaranlains", data, {
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

// Mengedit Pengeluaran Lain
export const UpdatePengeluaranLain = async (values) => {
    try {
      const response = await useAxios.put(`/pengeluaranlains/${values.id_pengeluaran}`, values, {
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
  
  // Menghapus Pengeluaran Lain
  export const DeletePengeluaranLain = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await useAxios.delete(`/pengeluaranlains/${id}`, {
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

  
