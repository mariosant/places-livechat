import { Dialog } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/solid";

const ConfirmButton = ({ children, ...props }) => (
  <button
    className="p-2 font-semibold text-white rounded bg-red500 hover:bg-red600"
    {...props}
  >
    {children}
  </button>
);

const CancelButton = ({ children, ...props }) => (
  <button className="p-2 text-gray200 hover:text-gray300" {...props}>
    {children}
  </button>
);

const DeleteModal = ({ onClose, onConfirm, pointName, ...props }) => {
  return (
    <Dialog
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={onClose}
      {...props}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="z-20 flex flex-col items-center max-w-sm p-4 mx-auto text-center bg-white rounded-large">
          <TrashIcon className="w-16 h-16 mb-6 text-heading" />

          <Dialog.Title className="mb-4 text-xl font-semibold text-heading">
            Are you sure to delete that?
          </Dialog.Title>

          <p className="mb-4 text-body">
            Are you sure you want to delete point <strong>{pointName}</strong>?
            Deleting points is <strong>an irreversible action</strong>.
          </p>

          <div className="flex justify-between w-1/2 m-auto">
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <ConfirmButton onClick={onConfirm}>Delete point</ConfirmButton>
          </div>
        </div>

        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      </div>
    </Dialog>
  );
};

export default DeleteModal;
