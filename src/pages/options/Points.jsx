import { useState } from "preact/hooks";
import useSWR from "swr";
import api from "@/lib/api";
import { TrashIcon } from "@heroicons/react/outline";
import Form from "./Form.jsx";

const Points = () => {
  const [showForm, setShowForm] = useState(false);

  const {
    data: { data: points },
  } = useSWR("/api/getPoints", {
    fetcher: (url) => api.get(url).json(),
  });

  return (
    <div className="border rounded-large border-gray150">
      <div className="flex justify-between p-3">
        <span className="font-semibold">Points</span>
        <button className="text-blue700" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Add new"}
        </button>
      </div>
      {showForm && (
        <div className="border-t border-gray150">
          <Form className="p-3" />
        </div>
      )}
      {points.map((point) => (
        <div className="flex justify-between p-3 border-t group border-gray150">
          <div>
            <div className="text">{point.title}</div>
            <div className="text-gray400">{point.address}</div>
          </div>
          <div className="opacity-0 hiddes group-hover:opacity-100">
            <button>
              <TrashIcon className="w-5 h-5 text-red600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Points;
