import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { GetAllPengeluaranLain, CreatePengeluaranLain, DeletePengeluaranLain, UpdatePengeluaranLain, GetPengeluaranLainByDate } from "../../api/apiPengeluaranLain";
import { MagnifyingGlassIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { HalamanPagination } from "../../components/cards/paginatinon.jsx";
import { InputModalPengeluaranLain } from "../../components/inputs/InputModalPengeluaranLain.jsx";
import { UpdateModalPengeluaranLain } from "../../components/updates/UpdateModalPengeluaranLain.jsx";

export function TabelPengeluaranLain() {
  const [pengeluarans, setPengeluarans] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    id_pengeluaran: "",
    tanggal_pengeluaran: "",
    kategori_pengeluaran: "",
    detail_pengeluaran: "",
    biaya: "",
  });

  const [openDialogMap, setOpenDialogMap] = useState({});

  const handleOpenDialogForRow = (id_pengeluaran) => {
    setOpenDialogMap((prevMap) => ({
      ...prevMap,
      [id_pengeluaran]: !prevMap[id_pengeluaran],
    }));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
        GetPengeluaranLainByDate(searchQuery)
          .then((response) => {
            setcurrentPosts(response);
            toast.success("Pengeluaran Lain Found");
          })
          .catch((err) => {
            toast.error("Pengeluaran Lain Not Found");
          });
      } else {
        fetchPengeluarans();
      }
  };

  const fetchPengeluarans = () => {
    GetAllPengeluaranLain()
      .then((response) => {
        setPengeluarans(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePengeluaran = (id) => {
    DeletePengeluaranLain(id)
      .then((response) => {
        toast.success(response.message);
        setPengeluarans(pengeluarans.filter(pengeluaran => pengeluaran.id_pengeluaran !== id));
      })
      .catch((err) => {
        const errorMessage = Object.values(err.message)[0][0];
        toast.error(errorMessage);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitData = (event) => {
    event.preventDefault();
    CreatePengeluaranLain(formData)
      .then((response) => {
        toast.success(response.message);
        setShowInputModal(false);
        fetchPengeluarans();
      })
      .catch((err) => {
        const errorMessage = Object.values(err.message)[0][0];
        toast.error(errorMessage);
      });
  };

  const updateData = (event) => {
    event.preventDefault();
    console.log(formData)
    UpdatePengeluaranLain(formData)
      .then((response) => {
        toast.success(response.message);
        setShowUpdateModal(false);
        fetchPengeluarans();
      })
      .catch((err) => {
        const errorMessage = Object.values(err.message)[0][0];
        toast.error(errorMessage);
      });
  };

  const openUpdateModal = (pengeluaran) => {
    setFormData({
      id_pengeluaran: pengeluaran.id_pengeluaran,
      tanggal_pengeluaran: pengeluaran.tanggal_pengeluaran,
      kategori_pengeluaran: pengeluaran.kategori_pengeluaran,
      detail_pengeluaran: pengeluaran.detail_pengeluaran,
      biaya: pengeluaran.biaya,
    });
    setShowUpdateModal(true);
  };
  
  useEffect(() => {
    fetchPengeluarans();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerpage] = useState(5);
  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [currentPosts, setcurrentPosts] = useState([]);

  useEffect(() => {
    const newCurrentPosts = pengeluarans.slice(firstPostIndex, lastPostIndex);
    setcurrentPosts(newCurrentPosts);
    console.log(pengeluarans)
  }, [pengeluarans, firstPostIndex, lastPostIndex]);

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

        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={() => {
            setShowInputModal(true);

            setFormData({
              tanggal_pengeluaran: "",
              kategori_pengeluaran: "",
              detail_pengeluaran: "",
              biaya: "",
            });
          }}
        >
          Tambah Pengeluaran
        </Button>
      </div>

      <UpdateModalPengeluaranLain
        showUpdateModal={showUpdateModal}
        formData={formData}
        handleInputChange={handleInputChange}
        updateData={updateData}
        setShowUpdateModal={setShowUpdateModal}
      />

      <InputModalPengeluaranLain
        showInputModal={showInputModal}
        formData={formData}
        handleInputChange={handleInputChange}
        submitData={submitData}
        setShowInputModal={setShowInputModal}
      />

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel Pengeluaran Lain
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Tanggal", "Kategori", "Detail", "Biaya", ""].map((data) => (
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
              {(Array.isArray(currentPosts) ? currentPosts : [currentPosts]).map((pengeluaran, index) => {
                const className = `py-3 px-5 ${
                  index === currentPosts.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                
                return (
                  <tr key={pengeluaran.id_pengeluaran}>      
                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pengeluaran.tanggal_pengeluaran}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pengeluaran.kategori_pengeluaran}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pengeluaran.detail_pengeluaran}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pengeluaran.biaya}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[100] max-h-[80px] whitespace-normal`}>
                      <IconButton variant="text" onClick={() => handleOpenDialogForRow(pengeluaran.id_pengeluaran)}>
                        <XCircleIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                      
                      <IconButton variant="text" onClick={() => openUpdateModal(pengeluaran)}>
                        <PencilIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                    </td>

                    {openDialogMap[pengeluaran.id_pengeluaran] && (
                      <Dialog open={openDialogMap[pengeluaran.id_pengeluaran]} handler={() => handleOpenDialogForRow(pengeluaran.id_pengeluaran)}>
                        <DialogHeader>Apakah anda ingin menghapus data?</DialogHeader>
                        <DialogBody>
                          Untuk menghapus data, dapat dilakukan dengan menekan tombol "CONFIRM",
                          Untuk membatalkan penghapusan data, dapat menekan tombol "CANCEL".
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={() => handleOpenDialogForRow(pengeluaran.id_pengeluaran)}
                            className="mr-1"
                          >
                            <span>Cancel</span>
                          </Button>
                          <Button variant="gradient" color="green" onClick={() => deletePengeluaran(pengeluaran.id_pengeluaran)}>
                            <span>Confirm</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>
                    )}

                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {pengeluarans.length > postsPerPage && (
        <HalamanPagination 
          totalPosts = {pengeluarans.length}
          postsPerPage = {postsPerPage}
          setCurrentPage = {setCurrentPage}
          currentPage = {currentPage}
        />
      )}

    </div>
  );
}
