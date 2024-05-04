import React, { useState } from "react";
import {
  Typography,
  Button,
} from "@material-tailwind/react";

export function InputModalPenitip ({ showInputModal, formData, handleInputChange, submitData, setShowInputModal }) {
  return (
    <>
      {showInputModal && (
        <div className="fixed z-40 inset-0 items-center justify-center overflow-auto bg-gray-500 bg-opacity-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"> {/* Added w-full class */}
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      Tambah Data Penitip
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
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
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
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
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
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
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
    </>
  );
};