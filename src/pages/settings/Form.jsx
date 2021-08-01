import { useForm } from "react-hook-form";
import { useEffect } from "preact/hooks";
import useKeyPress from "@/lib/useKeypress";

const Label = ({ children, ...props }) => {
  return (
    <label className="block font-semibold" {...props}>
      {children}
    </label>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      className={`px-5 py-2 text-white font-semibold rounded hover:bg-blue500 ${
        props.disabled ? "bg-gray300" : "bg-blue400"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

const Error = ({ children, ...props }) => {
  return (
    <div className="text-sm text-red600" {...props}>
      {children}
    </div>
  );
};

const Form = ({ onCancel, point, onSubmit: onSubmitCallback, ...props }) => {
  useKeyPress("Escape", {
    onKeyUp: (event) => {
      if (onCancel) {
        onCancel(event);
      }
    },
  });

  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: point?.title,
      address: point?.address,
      groupId: point?.group?._id,
    },
  });

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmit = async ({ title, address, groupId }) => {
    onSubmitCallback({ title, address, groupId });
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label>Title</Label>
        <input
          autofocus
          autocomplete="off"
          placeholder="Section A store"
          maxLength="100"
          className="w-2/3 p-2 border rounded border-gray150 focus:border-blue500"
          {...register("title", {
            required: "Title is required",
            pattern: { value: /[\S]/g, message: "Title cannot be blank" },
            maxLength: {
              value: 100,
              message: "This is too long, it can be up to 100 characters.",
            },
          })}
        />
        {<Error>{errors?.title?.message}</Error>}
      </div>

      <div className="mb-4">
        <Label>Address</Label>
        <input
          autocomplete="off"
          placeholder="Some street 11, AB122, City, Country"
          maxLength="200"
          className="w-2/3 p-2 border rounded border-gray150 focus:border-blue500"
          {...register("address", {
            required: "Address is required",
            pattern: { value: /[\S]/g, message: "Address cannot be blank" },
            maxLength: {
              value: 200,
              message: "This is too long, it can be up to 200 characters.",
            },
          })}
        />
        {<Error>{errors?.address?.message}</Error>}
      </div>

      <div className="flex">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>

        {onCancel && (
          <button
            onClick={onCancel}
            type="button"
            className="block ml-4 text-subtle hover:text-body"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
