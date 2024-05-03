import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { GetAllPenitips, CreatePenitip, GetPenitipByName, DeletePenitip, UpdatePenitip } from "../../api/apiPenitip";
import { useEffect } from "react";
import { MagnifyingGlassIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

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

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      GetPenitipByName(searchQuery)
        .then((response) => {
          setPenitips(response);
        })
        .catch((err) => {
          toast.dark(JSON.stringify(err.message));
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
        toast.dark(err.message);
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
        toast.dark(JSON.stringify(err.message));
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
        toast.dark(JSON.stringify(err.message));
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

  useEffect(() => {
    fetchPenitips();
  }, []);

  return (
    <div className="mt-4 mb-8 flex flex-col gap-12">

      {/* Backdrop for sidenav */}
      {showInputModal && (
        <div
          className="fixed inset-0 bg-gray-500 opacity-50 z-30"
          onClick={() => setShowInputModal(false)}
        ></div>
      )}


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
      
      {/* Modal for update the data */}
      {showUpdateModal && (
        <div className="fixed z-40 inset-0 items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      Update Data Penitip
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label htmlFor="nama_penitip" className="block text-sm font-medium text-gray-700">
                          Nama Penitip
                        </label>
                        <input
                          type="text"
                          name="nama_penitip"
                          id="nama_penitip"
                          autoComplete="off"
                          value={formData.nama_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        />
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Maksimal 255 Alphabet
                        </Typography>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="no_telp_penitip" className="block text-sm font-medium text-gray-700">
                          Nomor Telepon
                        </label>
                        <input
                          type="text"
                          name="no_telp_penitip"
                          id="no_telp_penitip"
                          autoComplete="off"
                          value={formData.no_telp_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        />
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Isi dengan 10 - 12 Angka
                        </Typography>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="alamat_penitip" className="block text-sm font-medium text-gray-700">
                          Alamat Penitip
                        </label>
                        <textarea
                          name="alamat_penitip"
                          id="alamat_penitip"
                          rows="3"
                          value={formData.alamat_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        ></textarea>
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Isi Alamat Lengkap
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  onClick={updateData}
                  color="lightBlue"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                >
                  Update Data
                </Button>
                <Button
                  onClick={() => setShowUpdateModal(false)}
                  color="gray"
                  buttonType="link"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="mr-4"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new data */}
      {showInputModal && (
        <div className="fixed z-40 inset-0 items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"> {/* Added w-full class */}
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 mb-4"
                      id="modal-title"
                    >
                      Tambah Data Penitip
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="nama_penitip"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Penitip
                        </label>
                        <input
                          type="text"
                          name="nama_penitip"
                          id="nama_penitip"
                          autoComplete="off"
                          value={formData.nama_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        />
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Maksimal 255 Alphabet
                        </Typography>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="no_telp_penitip"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nomor Telepon
                        </label>
                        <input
                          type="text"
                          name="no_telp_penitip"
                          id="no_telp_penitip"
                          autoComplete="off"
                          value={formData.no_telp_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        />
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Isi dengan 10 - 12 Angka
                        </Typography>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="alamat_penitip"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Alamat Penitip
                        </label>
                        <textarea
                          name="alamat_penitip"
                          id="alamat_penitip"
                          rows="3"
                          value={formData.alamat_penitip}
                          onChange={handleInputChange}
                          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-lightBlue-500 focus:border-lightBlue-500 sm:text-sm"
                        ></textarea>
                        <Typography
                          variant="small"
                          color="gray"
                          className="mt-2 flex items-center gap-1 font-normal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Isi Alamat Lengkap
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  onClick={submitData}
                  color="lightBlue"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                >
                  Tambah
                </Button>
                <Button
                  onClick={() => setShowInputModal(false)}
                  color="gray"
                  buttonType="link"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="mr-4"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}


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
              {(Array.isArray(penitips) ? penitips : [penitips]).map((penitip, index) => {
                const className = `py-3 px-5 ${
                  index === penitips.length - 1
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
                      <IconButton variant="text" onClick={() => deletePenitip(penitip.id_penitip)}>
                        <XCircleIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>

                      <IconButton variant="text" onClick={() => openUpdateModal(penitip)}>
                        <PencilIcon className="h-4 w-4 text-blue-gray-500" />
                      </IconButton>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
