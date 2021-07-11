import { useQuery } from "@urql/preact";
import { useForm } from "react-hook-form";
import { useEffect } from "preact/hooks";
import useKeyPress from "@/lib/useKeypress";
import { ExclamationIcon } from "@heroicons/react/outline";

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

  const [{ data }] = useQuery({
    query: `
    query {
      availableGroups {
        _id
        name
      }
      organization {
        _id
        proPlan
      }
    }
  `,
  });
  const availableGroups = data?.availableGroups;
  const proPlan = data?.organization?.proPlan ?? false;

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

      {proPlan && (
        <div className="mb-4">
          <Label>LiveChat group</Label>
          {availableGroups ? (
            <select
              autocomplete="off"
              placeholder="Some street 11, AB122, City, Country"
              className="w-2/3 p-2 bg-white border rounded appearance-none cursor-pointer border-gray150 focus:border-blue500"
              {...register("groupId")}
            >
              <option value={undefined}>
                None (use this to clear assignment)
              </option>
              {availableGroups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              placeholder="loading LiveChat groups..."
              className="w-2/3 p-2 bg-white border rounded border-gray150"
            />
          )}
        </div>
      )}

      {!proPlan && (
        <div className="mb-4">
          <Label>
            LiveChat group{" "}
            <ExclamationIcon className="inline w-5 h-5 text-subtle" />
          </Label>
          <input
            disabled
            placeholder="This feature is available only to Pro plan subscribers"
            className="w-2/3 p-2 border rounded bg-gray25 border-gray100"
          />
        </div>
      )}
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
