import Points from "./Points.jsx";

const Page = () => {
  return (
    <div className="container m-8">
      <h1 className="mb-4 text-3xl">Places</h1>
      <p className="mb-4">
        Please find your team's places below. Click the "Add new" button to add
        more.
      </p>

      <Points />
    </div>
  );
};

export default Page;
