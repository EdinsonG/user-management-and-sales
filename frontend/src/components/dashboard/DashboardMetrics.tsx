import { useEffect, useState } from "react";
import { UserGroupIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { getUsers } from "../../services/userService";
import { getHouses } from "../../services/houseService";

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalHouses: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Lanzamos ambas peticiones al mismo tiempo
        const [dataUsers, dataHouses] = await Promise.all([
          getUsers(),
          getHouses()
        ]);

        setMetrics({ 
          totalUsers: dataUsers.length, 
          totalHouses: dataHouses.length 
        });
      } catch (err) {
        console.error("Error al cargar métricas", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Metric Item: Usuarios */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserGroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Usuarios</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {loading ? "..." : formatNumber(metrics.totalUsers)}
            </h4>
          </div>
        </div>
      </div>

      {/* Metric Item: Propiedades */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BuildingOffice2Icon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Propiedades</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {loading ? "..." : formatNumber(metrics.totalHouses)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}