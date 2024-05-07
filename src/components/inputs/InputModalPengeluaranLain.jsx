import React from "react";
import {
  Typography,
  Button,
  Dialog,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";

export function InputModalPengeluaranLain({ showInputModal, formData, handleInputChange, submitData, setShowInputModal }) {
  return (
    <>
      {showInputModal && (
        <Dialog
          size="regular"
          open={showInputModal}
          onClose={() => setShowInputModal(false)}
        >
          <Card>
            <CardBody>
              <Typography variant="h6" color="blue-gray">
                Tambah Data Pengeluaran Lain
              </Typography>
              <div className="mt-4">
                <label htmlFor="tanggal_pengeluaran" className="text-sm text-gray-700">Tanggal Pengeluaran</label>
                <Input
                  type="date"
                  name="tanggal_pengeluaran"
                  value={formData.tanggal_pengeluaran}
                  onChange={handleInputChange}
                  placeholder="Tanggal Pengeluaran"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="kategori_pengeluaran" className="text-sm text-gray-700">Kategori Pengeluaran</label>
                <Input
                  type="text"
                  name="kategori_pengeluaran"
                  value={formData.kategori_pengeluaran}
                  onChange={handleInputChange}
                  placeholder="Kategori Pengeluaran"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="detail_pengeluaran" className="text-sm text-gray-700">Detail Pengeluaran</label>
                <Input
                  type="text"
                  name="detail_pengeluaran"
                  value={formData.detail_pengeluaran}
                  onChange={handleInputChange}
                  placeholder="Detail Pengeluaran"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="biaya" className="text-sm text-gray-700">Biaya</label>
                <Input
                  type="text"
                  name="biaya"
                  value={formData.biaya}
                  onChange={handleInputChange}
                  placeholder="Biaya"
                  size="regular"
                  color="lightBlue"
                  outline={true}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-lightBlue-500 focus:border-lightBlue-500 w-full"
                />
              </div>
            </CardBody>
            <div className="flex justify-end px-4 pb-4">
              <Button
                onClick={submitData}
                color="lightBlue"
                buttonType="filled"
                size="lg"
                ripple="light"
              >
                Tambah
              </Button>
              <Button
                onClick={() => setShowInputModal(false)}
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
