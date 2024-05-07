  import React, { useState, useEffect } from "react";
  import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
  } from "@material-tailwind/react";
  import { GetAllHistoriPemesanan } from "../../api/apiHistoriPemesanan.jsx";
  import { MagnifyingGlassIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
  import { toast } from "react-toastify";
  import { HalamanPagination } from "../../components/cards/paginatinon.jsx";

  export function TabelHistoriPesanan() {
    const [historiPemesanan, setHistoriPemesanan] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [currentTransactions, setCurrentTransactions] = useState([]);
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      if (e.target.value === "") {
        fetchHistoriPemesanan();
      }
    };    
  
    const handleSearch = () => {
      if (searchQuery.trim() !== "") {
        const filteredHistoriPemesanan = historiPemesanan.filter((customer) =>
          customer.nama_customer.toLowerCase() === searchQuery.toLowerCase()
        );
        setHistoriPemesanan(filteredHistoriPemesanan);
    
        // Display toast based on search results
        if (filteredHistoriPemesanan.length > 0) {
          toast.success("Data ditemukan.");
        } else {
          toast.error("Data tidak ditemukan.");
        }
      } else {
        fetchHistoriPemesanan();
      }
    };
    
    
  
    const fetchHistoriPemesanan = async () => {
      try {
        const response = await GetAllHistoriPemesanan();
        setHistoriPemesanan(response);
      } catch (error) {
        console.error("Error fetching histori pemesanan:", error);
      }
    };
  
    useEffect(() => {
      fetchHistoriPemesanan();
    }, []);
  
    useEffect(() => {
      const allTransactions = historiPemesanan.flatMap(
        (customer) => customer.transaction_history
      );
      const indexOfLastTransaction = currentPage * postsPerPage;
      const indexOfFirstTransaction = indexOfLastTransaction - postsPerPage;
      const currentTransactionsSlice = allTransactions.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
      );
      setCurrentTransactions(currentTransactionsSlice);
    }, [historiPemesanan, currentPage, postsPerPage]);
  
    return (
      <div className="mt-4 mb-8 flex flex-col gap-12">
        <div className="flex justify-end items-center mb-4">
          <div className="mr-auto md:mr-4 md:w-26">
            <Input
              label="Cari Pengeluaran"
              icon={<MagnifyingGlassIcon className="h-4 w-4 text-blue-gray-500" />}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel Histori Pemesanan
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID Nota", "Nama Customer", "Tanggal Pesan", "Tanggal Ambil", "Total Harga"].map((data) => (
                    <th
                      key={data}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {data}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {currentTransactions.map((transaction) => {
                // Find the customer associated with the transaction
                const customer = historiPemesanan.find(
                  (customer) =>
                    customer.transaction_history.some(
                      (t) => t.id_nota === transaction.id_nota
                    )
                );

                return (
                  <tr key={transaction.id_nota}>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {transaction.id_nota}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {customer ? customer.nama_customer : ""}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {transaction.tanggal_pesan}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {transaction.tanggal_ambil}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {transaction.total_harga}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            </table>
          </CardBody>
        </Card>
        {historiPemesanan.flatMap(
          (customer) => customer.transaction_history
        ).length > postsPerPage && (
          <HalamanPagination
            totalPosts={historiPemesanan.flatMap(
              (customer) => customer.transaction_history
            ).length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    );
  } 
