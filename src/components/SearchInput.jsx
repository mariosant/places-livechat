export const SearchInput = (props) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      className="flex-grow w-full h-8 px-2 border rounded outline-none border-gray150 hover:border-blue500 focus:border-blue500"
      {...props}
    />
  );
};
