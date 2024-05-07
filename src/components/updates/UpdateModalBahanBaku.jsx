import React from "react";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";

export function UpdateModalBahanBaku({ showUpdateModal, formData, handleInputChange, updateData, setShowUpdateModal }) {
  return (
    <>
      {showUpdateModal && (
        <Dialog
          size="regular"
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
        >
          <Card>
            <CardBody>
              <Typography variant="h6" color="blue-gray">
                Update Data Bahan Baku
              </Typography>
              <div className="mt-4">
                <label htmlFor="nama_bahan" className="text-sm text-gray-700">Nama Bahan</label>
                <Input
                  type="text"
                  name="nama_bahan"
                  value={formData.nama_bahan}
                  onChange={handleInputChange}
                  placeholder="Nama Bahan"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
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
                  Isi Nama Bahan
                </Typography>
              </div>
              <div className="mt-4">
                <label htmlFor="stok_bahan" className="text-sm text-gray-700">Stok Bahan</label>
                <Input
                  type="text"
                  name="stok_bahan"
                  value={formData.stok_bahan}
                  onChange={handleInputChange}
                  placeholder="Stok Bahan"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
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
                  Isi Stok Bahan
                </Typography>
              </div>
              <div className="mt-4">
                <label htmlFor="satuan" className="text-sm text-gray-700">Satuan</label>
                <Input
                  type="text"
                  name="satuan"
                  value={formData.satuan}
                  onChange={handleInputChange}
                  placeholder="Satuan"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
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
                  Isi Satuan
                </Typography>
              </div>
            </CardBody>
            <div className="flex justify-end px-4 pb-4">
              <Button
                onClick={updateData}
                color="lightBlue"
                buttonType="filled"
                size="lg"
                ripple="light"
              >
                Update Data
              </Button>
              <Button
                onClick={() => setShowUpdateModal(false)}
                color="gray"
                buttonType="outline"
                size="lg"
                ripple="light"
                className="ml-4"
              >
                Batal
              </Button>
            </div>
          </Card>
        </Dialog>
      )}
    </>
  );
}
