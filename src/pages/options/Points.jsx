import useSWR from "swr";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import api from "@/lib/api";
import Form from "./Form.jsx";

const Points = () => {
  const {
    data: { data: points },
  } = useSWR("/api/getPoints", {
    fetcher: (url) => api.get(url).json(),
  });

  return (
    <div className="border rounded-large border-gray150">
      <div className="flex justify-between p-3">
        <span className="font-semibold">Points</span>
        <button className="text-blue700">Add new</button>
      </div>
      {points.map((point) => (
        <div className="flex justify-between p-3 border-t group border-gray150">
          <div>
            <div className="text">{point.title}</div>
            <div className="text-gray400">{point.address}</div>
          </div>
          <div className="opacity-0 hiddes group-hover:opacity-100">
            <button>
              <PencilIcon className="w-5 h-5 mr-1" />
            </button>
            <button>
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Points;
