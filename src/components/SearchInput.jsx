const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const SearchInput = (props) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="flex-grow w-full h-8 px-2 border rounded outline-none border-gray200"
      {...props}
    />
  );
};
