import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { createPoint as createPointQuery } from "@/queries.js";

const Label = ({ children, ...props }) => {
  return (
    <label className="block font-semibold" {...props}>
      {children}
    </label>
  );
};

const Input = (props) => {
  return (
    <input
      className="w-2/3 p-2 border rounded border-gray150 focus:border-blue500"
      {...props}
    />
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      className={`px-5 py-2 text-white font-semibold rounded hover:bg-blue600 ${
        props.disabled ? "bg-gray300" : "bg-blue500"
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

const Form = ({ onSubmit: onSubmitCallback, ...props }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [_, mutate] = useMutation(createPointQuery);

  const onSubmit = async ({ title, address }) => {
    onSubmitCallback();
    await mutate({ title, address });
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label>Title</Label>
        <Input
          autofocus
          autocomplete="off"
          type="text"
          placeholder="Section A store"
          maxLength="100"
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
        <Input
          autocomplete="off"
          type="text"
          placeholder="Some street 11, AB122, City, Country"
          maxLength="200"
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default Form;
