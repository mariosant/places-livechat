import { useState } from "preact/hooks";
import isObject from "lodash/isObject";
import { useQuery } from "@urql/preact";
import useMessagebox from "@/lib/useMessagebox";
import { PoiButton, SearchInput } from "@/components";
import {
  points as pointsQuery,
  availableGroups as availableGroupsQuery,
  organization as organizationQuery,
} from "@/queries.js";

const Page = () => {
  const [selected, setSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupIdQuery, setGroupIdQuery] = useState("");

  const { sendPoint } = useMessagebox();

  const [{ data }] = useQuery({ query: pointsQuery });
  const [{ data: groupsData }] = useQuery({ query: availableGroupsQuery });
  const [{ data: orgData, isFetching }] = useQuery({
    query: organizationQuery,
  });

  const isFetched = Boolean(data);
  const points = data?.points ?? [];
  const groups = groupsData?.availableGroups ?? [];

  const filteredPoints = points
    .filter(
      ({ address, title }) =>
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        address.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(({ group }) => {
      return groupIdQuery === "" ? true : group?._id === groupIdQuery;
    });

  const selectPoint = (_id) => () => {
    if (selected === _id) {
      setSelected(undefined);
    } else {
      setSelected(_id);
      const point = points.find((p) => p._id === _id);

      sendPoint(point);
    }
  };

  const isSelected = (id) => id === selected;

  return (
    <div className="pt-12 text-body">
      <div className="fixed top-0 left-0 right-0 flex items-center w-full p-2 bg-white">
        <div className="w-1/3 mr-2">
          <SearchInput
            placeholder="Search places..."
            onInput={(event) => setSearchQuery(event.target.value)}
          />
        </div>
        <div>
          <span className="font-semibold">LiveChat group:</span>
          {orgData?.organization.proPlan && (
            <select
              onChange={(event) => {
                setGroupIdQuery(event.target.value);
              }}
              className="px-2 bg-white cursor-pointer"
            >
              <option value={undefined}>All groups</option>
              {groups.map((group) => (
                <option value={group._id}>{group.name}</option>
              ))}
            </select>
          )}
          {!orgData?.organization.proPlan && isObject(orgData) && (
            <select
              disabled
              onChange={(event) => {
                setGroupIdQuery(event.target.value);
              }}
              className="px-2 bg-white appearance-none"
            >
              <option value={undefined}>
                Available only to Pro plan subscripbers
              </option>
            </select>
          )}
        </div>
      </div>

      <div className="px-2 pb-2">
        {!isFetched && <span className="text-subtle">Loading...</span>}

        {isFetched && filteredPoints?.length > 0 && (
          <div className="flex flex-wrap w-full gap-2">
            {filteredPoints.map(({ _id, title }) => (
              <PoiButton selected={isSelected(_id)} onClick={selectPoint(_id)}>
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

        {isFetched &&
          filteredPoints.length === 0 &&
          (searchQuery !== "" || groupIdQuery !== "") && (
            <span className="text-subtle">
              No places found. Perhaps make a broader search?
            </span>
          )}
      </div>
    </div>
  );
};

export default Page;
