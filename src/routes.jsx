import {
    TableCellsIcon,
    ClipboardDocumentCheckIcon,
    CommandLineIcon,
    CakeIcon,
    ChatBubbleLeftRightIcon,
    ArrowPathRoundedSquareIcon,
  } from "@heroicons/react/24/solid";
  import { TabelPenitip } from "./pages/dashboard/TabelPenitip.jsx";
  import { TabelPengeluaranLain } from "./pages/dashboard/TabelPengeluaranLain.jsx";
  import { TabelHistoriPesanan } from "./pages/dashboard/TabelHistoriPesanan.jsx";
  import { TabelBahanBaku } from "./pages/dashboard/TabelBahanBaku.jsx";
  import { ForgotPassword } from "./pages/auth/ForgotPassword.jsx";
  import { ChangePassword } from "./pages/auth/ChangePassword.jsx";

  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  const DashboardWithToken = () => {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }

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
          icon: <CommandLineIcon {...icon} />,
          name: "Histori Pesanan",
          path: "/historipesanan",
          element: <TabelHistoriPesanan />,
        },
        {
          icon: <CakeIcon {...icon} />,
          name: "Bahan Baku",
          path: "/bahanbaku",
          element: <TabelBahanBaku />,
        },
        {
          icon: <ChatBubbleLeftRightIcon {...icon} />,
          name: "Forgot Password",
          path: "/forgotpassword",
          element: <ForgotPassword />,
        },
        {
          icon: <ArrowPathRoundedSquareIcon {...icon} />,
          name: "Change Password",
          path: "/changepassword/:token",
          element: <ChangePassword />,
        },
      ],
    },
  ];
  
  export default routes;
  