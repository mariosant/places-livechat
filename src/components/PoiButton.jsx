import cn from "@mariosant/cn";

export const PoiButton = ({ selected, children, ...props }) => {
  const className = cn(
    "flex",
    "items-center",
    "h-8",
    "px-2",
    "rounded",
    "font-semibold",
    "border",
    [selected, "border-blue500", "border-gray150"],
    [selected, "bg-blue500", "bg-white"],
    [selected, "hover:bg-blue600", "hover:bg-gray50"],
    [selected, "text-white"]
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
