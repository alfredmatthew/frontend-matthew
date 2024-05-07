import {
    TableCellsIcon,
    ClipboardDocumentCheckIcon,
    CommandLineIcon,
  } from "@heroicons/react/24/solid";
  import { TabelPenitip } from "./pages/dashboard/TabelPenitip.jsx";
  import { TabelPengeluaranLain } from "./pages/dashboard/TabelPengeluaranLain.jsx";
  import { TabelHistoriPesanan } from "./pages/dashboard/TabelHistoriPesanan.jsx";

  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes = [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <TableCellsIcon {...icon} />,
          name: "Penitip",
          path: "/penitip",
          element: <TabelPenitip />,
        },
        {
          icon: <ClipboardDocumentCheckIcon {...icon} />,
          name: "Pengeluaran Lain",
          path: "/pengeluaranlain",
          element: <TabelPengeluaranLain />,
        },
        {
          icon: <ClipboardDocumentCheckIcon {...icon} />,
          name: "Histori Pesanan",
          path: "/historipesanan",
          element: <TabelHistoriPesanan />,
        },
      ],
    },
  ];
  
  export default routes;
  