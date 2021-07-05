import { useState } from "preact/hooks";
import { useQuery, useMutation } from "@urql/preact";
import Router, { Link, route } from "preact-router";
import { TrashIcon, PlusIcon } from "@heroicons/react/outline";
import {
  points as pointsQuery,
  deletePoint as deletePointQuery,
  createPoint as createPointQuery,
  updatePoint as updatePointQuery,
} from "@/queries.js";
import Form from "./Form.jsx";
import DeleteModal from "./DeleteModal.jsx";

const queryContext = { additionalTypenames: ["Point"] };

const Points = () => {
  const [showModal, setShowModal] = useState(undefined);

  const [{ data }] = useQuery({
    query: pointsQuery,
    context: queryContext,
  });
  const [, deletePoint] = useMutation(deletePointQuery);
  const [, createPoint] = useMutation(createPointQuery);
  const [, updatePoint] = useMutation(updatePointQuery);

  const points = data?.points;

  const onCreatePoint = async (point) => {
    route("/settings");
    await createPoint(point);
  };

  const onDeletePoint = async ({ _id }) => {
    setShowModal(false);
    await deletePoint({ _id });
  };

  return (
    <div className="border rounded-large border-gray100">
      <div className="flex items-center justify-between px-3 min-h-[48px]">
        <span className="font-semibold">Places</span>

        <Link
          path="/settings"
          className="flex items-center px-2 py-1 font-semibold text-white border rounded border-blue400 bg-blue400 hover:bg-blue500"
          href="/settings/places/new"
        >
          <PlusIcon className="inline w-5 h-5" /> Add new
        </Link>
      </div>

      <Router>
        <div className="border-t border-gray100" path="/settings/places/new">
          <Form
            className="p-3"
            onSubmit={onCreatePoint}
            onCancel={() => route("/settings")}
          />
        </div>
      </Router>

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
          <Router>
            <div
              path={`/settings/places/${point._id}/edit`}
              className="p-3 border-t group border-gray100"
            >
              <Form
                point={point}
                onSubmit={async ({ title, address, groupId }) => {
                  route("/settings");

                  await updatePoint({
                    point: { _id: point._id, title, address, groupId },
                  });
                }}
                onCancel={(event) => {
                  event.stopPropagation();
                  route("/settings");
                }}
              />
            </div>
            <div
              default
              onClick={() => route(`/settings/places/${point._id}/edit`)}
              className="grid grid-cols-10 p-3 border-t cursor-pointer hover:bg-gray25 group border-gray100"
            >
              <div className="col-span-9 row-span-1 row-start-1 overflow-x-hidden text whitespace-nowrap overflow-ellipsis">
                {point?.title}
              </div>
              <div className="col-span-9 row-span-1 row-start-2 overflow-x-hidden whitespace-nowrap overflow-ellipsis text-gray200 text">
                {point?.address}
              </div>

              {point?.group && (
                <div className="flex col-span-9 row-span-1 row-start-3 mt-2 overflow-x-hidden align-baseline whitespace-nowrap overflow-ellipsis text-body text">
                  <div
                    className="flex h-6 px-2 align-middle rounded bg-yellow100"
                    title={`Assigned to group ${point.group.name}`}
                  >
                    {point?.group?.name}
                  </div>
                </div>
              )}

              <div
                path="/settings"
                className="flex self-center justify-end flex-shrink col-span-1 row-span-2 row-start-1 opacity-0 group-hover:opacity-100"
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowModal(point);
                  }}
                  title="Delete"
                >
                  <TrashIcon className="w-5 h-5 opacity-50 text-red500 hover:opacity-100" />
                </button>
              </div>
            </div>
          </Router>
        ))}

      <DeleteModal
        open={Boolean(showModal)}
        pointName={showModal?.title}
        onClose={() => {
          route("/settings");
          setShowModal(undefined);
        }}
        onConfirm={() => {
          route("/settings");
          onDeletePoint(showModal);
        }}
      />
    </div>
  );
};

export default Points;
