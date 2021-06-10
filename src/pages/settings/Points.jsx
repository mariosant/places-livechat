import { useState } from "preact/hooks";
import { useQuery, useMutation } from "urql";
import { TrashIcon } from "@heroicons/react/outline";
import {
  points as pointsQuery,
  deletePoint as deletePointQuery,
} from "@/queries.js";
import Form from "./Form.jsx";
import DeleteModal from "./DeleteModal.jsx";

const Points = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(undefined);

  const [{ data }] = useQuery({
    query: pointsQuery,
    context: { additionalTypenames: ["Point"] },
  });
  const [, executeMutation] = useMutation(deletePointQuery);

  const points = data?.points;

  const onDeletePoint = async ({ _id }) => {
    setShowModal(undefined);
    await executeMutation({ _id });
  };

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
          <Form
            className="p-3"
            onSubmit={() => {
              setShowForm(false);
            }}
          />
        </div>
      )}
      {!points && (
        <div className="flex justify-between p-3 border-t group border-gray150">
          Loading places...
        </div>
      )}

      {points && points.length === 0 && (
        <div className="flex justify-between p-3 border-t group border-gray150">
          Seems there are no places added yet. How about adding a few by
          clicking "Add new"?
        </div>
      )}

      {points &&
        points?.map((point) => (
          <div className="flex justify-between p-3 border-t group border-gray150">
            <div>
              <div className="text">{point?.title}</div>
              <div className="text-gray400">{point?.address}</div>
            </div>
            <div className="self-center flex-shrink opacity-0 group-hover:opacity-100">
              <button onClick={() => setShowModal(point)}>
                <TrashIcon className="w-5 h-5 text-red600" />
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
