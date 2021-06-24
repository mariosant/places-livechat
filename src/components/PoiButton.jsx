import cn from "@mariosant/cn";

export const PoiButton = ({ selected, children, ...props }) => {
  const dynamicClasses = cn(
    "!inline-block",
    "border",
    "flex",
    "font-semibold",
    "h-8",
    "items-center",
    "max-w-full",
    "overflow-ellipsis",
    "overflow-x-hidden",
    "px-2",
    "rounded",
    "whitespace-nowrap",
    [selected, "border-blue400", "border-gray150"],
    [selected, "bg-blue400", "bg-white"],
    [selected, "hover:bg-blue500", "hover:bg-gray50"],
    [selected, "text-white"]
  );

  return (
    <button className={dynamicClasses} {...props}>
      {children}
    </button>
  );
};
