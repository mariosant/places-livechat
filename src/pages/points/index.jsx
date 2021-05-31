import { useState } from "preact/hooks";
import useSWR from "swr";
import api from "@/lib/api";
import useWidget from "@/lib/useWidget";
import { PoiButton, SearchInput } from "@/components";

const Page = () => {
  const [selected, setSelected] = useState(undefined);
  const { sendPoint } = useWidget();

  const { data: response } = useSWR("/api/getPoints", {
    fetcher: (url) => api.get(url).json(),
  });

  const pois = response?.data ?? [];

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
          <SearchInput />
        </div>
      </div>

      <div className="px-2 pb-2">
        {pois.length > 0 && (
          <div className="flex flex-wrap w-full gap-2">
            {pois.map(({ title, address }) => (
              <PoiButton
                selected={isSelected({ title, address })}
                onClick={selectPoint({ title, address })}
              >
                {title}
              </PoiButton>
            ))}
          </div>
        )}
        {pois.length === 0 && (
          <span className="text-gray400">
            There are no points yet. Click on the menu button to add some.
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
