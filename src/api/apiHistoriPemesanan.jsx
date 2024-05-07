import useAxios from ".";

// Mendapatkan semua Pengeluaran Lain untuk ditaruh di halaman dashboard
export const GetAllHistoriPemesanan = async () => {
  try {
    const response = await useAxios.get(`/customers/historipembelian`, {
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