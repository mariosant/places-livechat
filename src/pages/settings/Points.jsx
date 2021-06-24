import { useState } from "preact/hooks";
import { useQuery, useMutation } from "urql";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import {
  points as pointsQuery,
  deletePoint as deletePointQuery,
} from "@/queries.js";
import Form from "./Form.jsx";
import DeleteModal from "./DeleteModal.jsx";

const queryContext = { additionalTypenames: ["Point"] };

const Points = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(undefined);

  const [{ data }] = useQuery({
    query: pointsQuery,
    context: queryContext,
  });
  const [, executeMutation] = useMutation(deletePointQuery);

  const points = data?.points;

  const onDeletePoint = async ({ _id }) => {
    setShowModal(undefined);
    await executeMutation({ _id });
  };

  return (
    <div className="border rounded-large border-gray100">
      <div className="flex items-center justify-between p-3">
        <span className="font-semibold">Places</span>

        {!showForm && (
          <button
            className="flex items-center px-2 py-1 font-semibold text-white border rounded border-blue400 bg-blue400 hover:bg-blue500"
            onClick={() => setShowForm((v) => !v)}
          >
            <PlusIcon className="inline w-5 h-5" /> Add new
          </button>
        )}

        {showForm && (
          <button
            className="flex items-center px-2 py-1 font-semibold border rounded text-blue400 border-blue400 hover:bg-blue50"
            onClick={() => setShowForm((v) => !v)}
          >
            Cancel
          </button>
        )}
      </div>
      {showForm && (
        <div className="border-t border-gray100">
          <Form
            className="p-3"
            onSubmit={() => {
              setShowForm(false);
            }}
          />
        </div>
      )}
      {!points && (
        <div className="flex justify-between p-3 border-t text-subtle group border-gray100">
          Loading places...
        </div>
      )}

      {points && points.length === 0 && (
        <div className="flex justify-between p-3 border-t text-subtle group border-gray100">
          Seems there are no places added yet. How about adding a few by
          clicking "Add new"?
        </div>
      )}

      {points &&
        points?.map((point) => (
          <div className="grid grid-cols-10 grid-rows-2 p-3 border-t group border-gray100">
            <div className="col-span-9 row-span-1 row-start-1 overflow-x-hidden text whitespace-nowrap overflow-ellipsis">
              {point?.title}
            </div>
            <div className="col-span-9 row-span-1 row-start-2 overflow-x-hidden whitespace-nowrap overflow-ellipsis text-gray200 text">
              {point?.address}
            </div>
            <div className="flex self-center justify-end flex-shrink col-span-1 row-span-2 row-start-1 opacity-0 group-hover:opacity-100">
              <button onClick={() => setShowModal(point)}>
                <TrashIcon className="w-5 h-5 text-red300 hover:text-red500" />
              </button>
            </div>
          </div>
        ))}

      <DeleteModal
        open={Boolean(showModal)}
        pointName={showModal?.title}
        onClose={() => setShowModal(undefined)}
        onConfirm={() => onDeletePoint(showModal)}
      />
    </div>
  );
};

export default Points;
