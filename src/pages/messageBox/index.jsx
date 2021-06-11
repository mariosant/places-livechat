import { useState } from "preact/hooks";
import { useQuery } from "urql";
import useMessagebox from "@/lib/useMessagebox";
import { PoiButton, SearchInput } from "@/components";
import { points as pointsQuery } from "@/queries.js";

const Page = () => {
  const [selected, setSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const { sendPoint } = useMessagebox();

  const [{ data }] = useQuery({ query: pointsQuery });

  const isFetched = Boolean(data);
  const points = data?.points ?? [];

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
    <div className="pt-12 text-body">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full p-2 bg-white">
        <div className="w-1/3">
          <SearchInput
            placeholder="Search places..."
            onInput={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="px-2 pb-2">
        {!isFetched && <span className="text-subtle">Loading...</span>}

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
          <p className="text-subtle">
            There are no places added yet.
            <br />
            Go to LiveChat Settings &gt; Integrations &amp; Apps &gt; Places, to
            add some.
          </p>
        )}

        {isFetched && points.length === 0 && searchQuery !== "" && (
          <span className="text-subtle">
            No places found. Perhaps make a broader search?
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
