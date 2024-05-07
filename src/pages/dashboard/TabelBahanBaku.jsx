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
import { GetAllBahanBakus, GetBahanBakuByName, CreateBahanBaku, UpdateBahanBaku, DeleteBahanBaku } from "../../api/apiBahanBaku.jsx";
import { MagnifyingGlassIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { HalamanPagination } from "../../components/cards/paginatinon.jsx";
import { InputModalBahanBaku } from "../../components/inputs/InputModalBahanBaku.jsx";
import { UpdateModalBahanBaku } from "../../components/updates/UpdateModalBahanBaku.jsx";

export function TabelBahanBaku() {
    const [bahanBakus, setBahanBakus] = useState([]);
    const [showInputModal, setShowInputModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [formData, setFormData] = useState({
      id: "",
      nama_bahan: "",
      stok_bahan: "",
      satuan: "",
    });
  
    const [openDialogMap, setOpenDialogMap] = useState({});
  
    const handleOpenDialogForRow = (id_bahan) => {
      setOpenDialogMap((prevMap) => ({
        ...prevMap,
        [id_bahan]: !prevMap[id_bahan],
      }));
    };
  
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
          GetBahanBakuByName(searchQuery)
            .then((response) => {
                setcurrentPosts(response);
                toast.success("Bahan Baku Found");
            })
            .catch((err) => {
              toast.error("Bahan Baku Not Found");
            });
        } else {
          fetchBahanBakus();
        }
      };      
  
    const fetchBahanBakus = () => {
      GetAllBahanBakus()
        .then((response) => {
          setBahanBakus(response);
        })
        .catch((err) => {
          console.error("Error fetching bahan baku:", err);
        });
    };
  
    const deleteBahanBaku = (id) => {
      DeleteBahanBaku(id)
        .then((response) => {
          toast.success(response.message);
          setBahanBakus(bahanBakus.filter(bahan => bahan.id_bahan !== id));
        })
        .catch((err) => {
          toast.error("Bahan Baku Terdapat Dalam Record Transaksi");
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
      CreateBahanBaku(formData)
        .then((response) => {
          toast.success(response.message);
          setShowInputModal(false);
          fetchBahanBakus();
        })
        .catch((err) => {
          const errorMessage = Object.values(err.message)[0][0];
          toast.error(errorMessage);
        });
    };
  
    const updateData = (event) => {
      event.preventDefault();
      UpdateBahanBaku(formData)
        .then((response) => {
          toast.success(response.message);
          setShowUpdateModal(false);
          fetchBahanBakus();
        })
        .catch((err) => {
          const errorMessage = Object.values(err.message)[0][0];
          toast.error(errorMessage);
        });
    };
  
    const openUpdateModal = (bahan) => {
      setFormData({
        id: bahan.id_bahan,
        nama_bahan: bahan.nama_bahan,
        stok_bahan: bahan.stok_bahan,
        satuan: bahan.satuan,
      });
      setShowUpdateModal(true);
    };
  
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    
    useEffect(() => {
      fetchBahanBakus();
    }, []);
  
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [currentPosts, setcurrentPosts] = useState([]);

    useEffect(() => {
        const newCurrentPosts = bahanBakus.slice(firstPostIndex, lastPostIndex);
        setcurrentPosts(newCurrentPosts);
      }, [bahanBakus, firstPostIndex, lastPostIndex])
  
    return (
      <div className="mt-4 mb-8 flex flex-col gap-12">
        <div className="flex justify-end items-center mb-4">
          <div className="mr-auto md:mr-4 md:w-26">
            <Input
              label="Cari Bahan Baku"
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
                nama_bahan: "",
                stok_bahan: "",
                satuan: "",
              });
            }}
          >
            Tambah Bahan Baku
          </Button>
        </div>
  
        <UpdateModalBahanBaku 
          showUpdateModal={showUpdateModal} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          updateData={updateData} 
          setShowUpdateModal={setShowUpdateModal} 
        />
  
        <InputModalBahanBaku 
          showInputModal={showInputModal} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          submitData={submitData} 
          setShowInputModal={setShowInputModal} 
        />
  
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Tabel Bahan Baku
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Nama Bahan", "Stok Bahan", "Satuan", ""].map((header, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {header}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {(Array.isArray(currentPosts) ? currentPosts : [currentPosts]).map((bahan, index) => {
                const className = `py-3 px-5 ${
                  index === currentPosts.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                
                return (
                  
                <tr key={bahan.id_bahan}>
                    <td className="py-3 px-5 border-b border-blue-gray-50 min-w-[0] max-h-[80px] whitespace-normal">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {bahan.nama_bahan}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50 min-w-[0] max-h-[80px] whitespace-normal">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {bahan.stok_bahan}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50 min-w-[0] max-h-[80px] whitespace-normal">
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {bahan.satuan}
                      </Typography>
                    </td>
                    <td className="py-3 px-5 border-b border-blue-gray-50 min-w-[100] max-h-[80px] whitespace-normal">
                      <IconButton variant="text" onClick={() => handleOpenDialogForRow(bahan.id_bahan)}>
                        <XCircleIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                      <IconButton variant="text" onClick={() => openUpdateModal(bahan)}>
                        <PencilIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                    </td>
                    
                    {openDialogMap[bahan.id_bahan] && (
                        <Dialog open={openDialogMap[bahan.id_bahan]} handler={() => handleOpenDialogForRow(bahan.id_bahan)}>
                          <DialogHeader>Apakah anda ingin menghapus data?</DialogHeader>
                          <DialogBody>
                            Untuk menghapus data, dapat dilakukan dengan menekan tombol "CONFIRM",
                            Untuk membatalkan penghapusan data, dapat menekan tombol "CANCEL".
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="text"
                              color="red"
                              onClick={() => handleOpenDialogForRow(bahan.id_bahan)}
                              className="mr-1"
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" onClick={() => deleteBahanBaku(bahan.id_bahan)}>
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
        
        {bahanBakus.length > postsPerPage && (
            <HalamanPagination 
            totalPosts={bahanBakus.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            />
        )}
      </div>
    );
  }