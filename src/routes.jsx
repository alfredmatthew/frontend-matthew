import {
    TableCellsIcon,
  } from "@heroicons/react/24/solid";
  import { TabelPenitip } from "./pages/dashboard/TabelPenitip.jsx";

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
          path: "/tabelpenitip",
          element: <TabelPenitip />,
        },
      ],
    },
  ];
  
  export default routes;
  