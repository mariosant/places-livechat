import { useState } from "preact/hooks";
import useSWR from "swr";
import api from "@/lib/api";
import useMessagebox from "@/lib/useMessagebox";
import { PoiButton, SearchInput } from "@/components";

const Page = () => {
  const [selected, setSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const { sendPoint } = useMessagebox();

  const { data: response } = useSWR("/api/getPoints", {
    fetcher: (url) => api.get(url).json(),
  });

  const isFetched = Boolean(response?.data);
  const points = response?.data ?? [];

  const filteredPoints =
    searchQuery !== ""
      ? points.filter(
          ({ address, title }) =>
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            address.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : points;

  const selectPoint =
    ({ title, address }) =>
    () => {
      if (selected?.title === title) {
        setSelected(undefined);
      } else {
        setSelected({ title, address });
        sendPoint({ title, address });
      }
    };

  const isSelected = ({ title }) => title === selected?.title;

  return (
    <div className="pt-12">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full p-2 bg-white">
        <div className="w-1/3">
          <SearchInput
            placeholder="Search by title or address"
            onInput={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="px-2 pb-2">
        {!isFetched && <span className="text-gray400">Loading...</span>}

        {isFetched && filteredPoints?.length > 0 && (
          <div className="flex flex-wrap w-full gap-2">
            {filteredPoints.map(({ title, address }) => (
              <PoiButton
                selected={isSelected({ title, address })}
                onClick={selectPoint({ title, address })}
              >
                {title}
              </PoiButton>
            ))}
          </div>
        )}

        {isFetched && points.length === 0 && searchQuery === "" && (
          <span className="text-gray400">
            There are no points added yet. Go to application options to add
            some.
          </span>
        )}

        {isFetched && points.length === 0 && searchQuery !== "" && (
          <span className="text-gray400">
            No points. Perhaps make a broader search?
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
