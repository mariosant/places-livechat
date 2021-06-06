import { useForm } from "react-hook-form";
import { mutate } from "swr";
import api from "@/lib/api";

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
      className="w-2/3 p-2 border rounded border-gray200 focus:border-blue700"
      {...props}
    />
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded ${
        props.disabled ? "bg-gray300" : "bg-blue700"
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

const Form = ({ onSubmit: onSubmitCallback, currentData, ...props }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (point) => {
    await api.post("/api/createPoint", {
      json: point,
    });

    mutate("/api/getPoints", { data: [point, ...currentData] });
    onSubmitCallback(point);
  };

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <Label>Title</Label>
        <Input
          autocomplete="off"
          type="text"
          placeholder="Section A store"
          {...register("title", {
            required: "Title is required",
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
          {...register("address", {
            required: "Address is required",
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
