import Points from "./Points.jsx";

const Page = () => {
  return (
    <div className="container mx-8 my-4 text-body">
      <h1 className="mb-2 text-2xl font-semibold text-heading">Places</h1>
      <p className="mb-4 text-subtle">
        Please find your team's places below. Click the "Add new" button to add
        more.
      </p>

      <Points />
    </div>
  );
};

export default Page;
