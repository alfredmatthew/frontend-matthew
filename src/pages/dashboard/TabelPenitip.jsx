import React, { useState } from "react";
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
import { GetAllPenitips, CreatePenitip, GetPenitipByName, DeletePenitip, UpdatePenitip } from "../../api/apiPenitip";
import { useEffect } from "react";
import { MagnifyingGlassIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { HalamanPagination } from "../../components/cards/paginatinon.jsx";
import { InputModalPenitip } from "../../components/inputs/InputModalPenitip.jsx";
import { UpdateModalPenitip } from "../../components/updates/UpdateModalPenitip.jsx";

export function TabelPenitip() {
  const [penitips, setPenitips] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nama_penitip: "",
    no_telp_penitip: "",
    alamat_penitip: "",
  });

  const [openDialogMap, setOpenDialogMap] = useState({});

  // Function to handle opening and closing dialog for a specific row
  const handleOpenDialogForRow = (id_penitip) => {
    setOpenDialogMap((prevMap) => ({
      ...prevMap,
      [id_penitip]: !prevMap[id_penitip], // Toggle dialog state for this row
    }));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      GetPenitipByName(searchQuery)
        .then((response) => {
          setcurrentPosts(response);
          toast.success("Penitip Found");
        })
        .catch((err) => {
          toast.error("Penitip Not Found");
        });
    } else {
      fetchPenitips();
    }
  };

  const fetchPenitips = () => {
    GetAllPenitips()
      .then((response) => {
        setPenitips(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePenitip = (id) => {
    DeletePenitip(id)
      .then((response) => {
        toast.success(response.message);
        setPenitips(penitips.filter(penitip => penitip.id_penitip !== id));
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
    CreatePenitip(formData)
      .then((response) => {
        toast.success(response.message);
        setShowInputModal(false);
        fetchPenitips(); // Update the list of penitips
      })
      .catch((err) => {
        const errorMessage = Object.values(err.message)[0][0];
        toast.error(errorMessage);
      });
  };

  const updateData = (event) => {
    event.preventDefault();
    UpdatePenitip(formData)
      .then((response) => {
        toast.success(response.message);
        setShowUpdateModal(false);
        fetchPenitips(); // Update the list of penitips
      })
      .catch((err) => {
        const errorMessage = Object.values(err.message)[0][0];
        toast.error(errorMessage);
      });
  };

  const openUpdateModal = (penitip) => {
    setFormData({
      id: penitip.id_penitip,
      nama_penitip: penitip.nama_penitip,
      no_telp_penitip: penitip.no_telp_penitip,
      alamat_penitip: penitip.alamat_penitip,
    });
    setShowUpdateModal(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerpage] = useState(5);
  
  useEffect(() => {
    fetchPenitips();
  }, []);

  
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [currentPosts, setcurrentPosts] = useState([]);

  useEffect(() => {
    const newCurrentPosts = penitips.slice(firstPostIndex, lastPostIndex);
    setcurrentPosts(newCurrentPosts);
  }, [penitips, firstPostIndex, lastPostIndex]);

  return (
    <div className="mt-4 mb-8 flex flex-col gap-12">

      <div className="flex justify-end items-center mb-4">
        <div className="mr-auto md:mr-4 md:w-26">
          <Input
            label="Cari Penitip"
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
            // Reset formData state to empty
            setFormData({
              nama_penitip: "",
              no_telp_penitip: "",
              alamat_penitip: "",
            });
          }}
        >
          Tambah Penitip
        </Button>
      </div>

      <UpdateModalPenitip 
        showUpdateModal={showUpdateModal} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        updateData={updateData} 
        setShowUpdateModal={setShowUpdateModal} 
      />

      <InputModalPenitip 
        showInputModal={showInputModal} 
        formData={formData} 
        handleInputChange={handleInputChange} 
        submitData={submitData} 
        setShowInputModal={setShowInputModal} 
      />

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Tabel Penitip
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama Penitip", "Nomor Telepon", "Alamat", ""].map((data) => (
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
              {(Array.isArray(currentPosts) ? currentPosts : [currentPosts]).map((penitip, index) => {
                const className = `py-3 px-5 ${
                  index === currentPosts.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                
                return (
                  
                  <tr key={penitip.id_penitip}>      

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {penitip.nama_penitip}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {penitip.no_telp_penitip}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[0] max-h-[80px] whitespace-normal`}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {penitip.alamat_penitip}
                      </Typography>
                    </td>

                    <td className={`${className} min-w-[100] max-h-[80px] whitespace-normal`}>
                      <IconButton variant="text" onClick={() => handleOpenDialogForRow(penitip.id_penitip)}>
                        <XCircleIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                      
                      <IconButton variant="text" onClick={() => openUpdateModal(penitip)}>
                        <PencilIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                    </td>

                    {/* Dialog for this row */}
                    {openDialogMap[penitip.id_penitip] && (
                      <Dialog open={openDialogMap[penitip.id_penitip]} handler={() => handleOpenDialogForRow(penitip.id_penitip)}>
                        <DialogHeader>Apakah anda ingin menghapus data?</DialogHeader>
                        <DialogBody>
                          Untuk menghapus data, dapat dilakukan dengan menekan tombol "CONFIRM",
                          Untuk membatalkan penghapusan data, dapat menekan tombol "CANCEL".
                        </DialogBody>
                        <DialogFooter>
                          <Button
                            variant="text"
                            color="red"
                            onClick={() => handleOpenDialogForRow(penitip.id_penitip)}
                            className="mr-1"
                          >
                            <span>Cancel</span>
                          </Button>
                          <Button variant="gradient" color="green" onClick={() => deletePenitip(penitip.id_penitip)}>
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

      <HalamanPagination 
        totalPosts = {penitips.length}
        postsPerPage = {postsPerPage}
        setCurrentPage = {setCurrentPage}
        currentPage = {currentPage}
      />

    </div>
  );
}
