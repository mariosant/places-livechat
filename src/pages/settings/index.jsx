import useAuth from "@/lib/useAuth.js";
import { useQuery } from "@urql/preact";
import { me as meQuery } from "@/queries.js";
import Points from "./Points.jsx";

const Page = () => {
  const [{ data }] = useQuery({ query: meQuery });

  console.log(data);

  return (
    <div className="flex flex-col mx-8 my-4 text-body">
      <div className="flex-grow">
        <h1 className="mb-2 text-2xl font-semibold text-heading">Places</h1>
        <p className="mb-4">
          Please find your team's places below. Click the "Add new" button to
          add more.
        </p>

        <div className="mb-4">
          <Points />
        </div>
      </div>

      <details className="appearance-none">
        <summary className="mb-2 cursor-pointer">
          Submit a csv/excel file for bulk upload.
        </summary>
        <div className="p-4 border border-gray100 rounded-large">
          <p className="mb-2">
            If you have too many places to add manually, you can create a
            csv/excel file that contains the data. The file should contain both
            the name and the address of each place.
          </p>
          <p className="mb-2">
            The file can be submitted to{" "}
            <a
              href="mailto:mariosant@sent.com"
              target="_blank"
              className="font-semibold cursor-pointer hover:underline"
            >
              mariosant@sent.com
            </a>{" "}
            and it will be imported to your account for free. Please make sure
            the following information is included as well.
          </p>
          <ul>
            <li>User ID: {data?.me?.userId}</li>
            <li>Organization: {data?.me?.organization}</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default Page;
