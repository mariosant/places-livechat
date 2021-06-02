import useSWR from "swr";
import api from "@/lib/api";
import Points from "./Points.jsx";

const Page = () => {
  const { data: response } = useSWR("/api/getPoints", {
    fetcher: (url) => api.get(url).json(),
  });

  const isFetched = Boolean(response?.data);
  const points = response?.data ?? [];

  return (
    <div className="container m-8">
      <h1 className="mb-4 text-5xl">Points</h1>
      <p className="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        reprehenderit ut voluptatibus, consequatur eius et neque aspernatur!
        Mollitia, eum debitis? In architecto laborum ullam, amet iure eveniet
        nostrum impedit dolore!
      </p>

      {!isFetched && <p>Loading...</p>}
      {isFetched && <Points />}
    </div>
  );
};

export default Page;
