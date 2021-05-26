import { MainMenu, PoiButton, SearchInput } from "@/components";

const Page = () => {
  return (
    <div className="pt-12">
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between w-full p-2 bg-white">
        <div className="w-1/3">
          <SearchInput />
        </div>
        <MainMenu />
      </div>

      <div className="px-2 pb-2">
        <div className="flex flex-wrap w-full gap-2">
          <PoiButton>Aute elit anim irure</PoiButton>
          <PoiButton>Commodo sit nisi proident tempor velit est.</PoiButton>
          <PoiButton>
            Sunt consectetur occaecat eu nulla ad cillum esse aliquip anim
            commodo.
          </PoiButton>
          <PoiButton>
            Eu id esse exercitation aute deserunt dolore voluptate.
          </PoiButton>
          <PoiButton>
            Nisi deserunt qui do incididunt nostrud cupidatat cupidatat
            adipisicing deserunt duis nostrud veniam non voluptate.
          </PoiButton>
          <PoiButton>Eu mollit cillum tempor velit dolor.</PoiButton>
          <PoiButton>Id occaecat sit laborum magna.</PoiButton>
          <PoiButton>Aliqua aute et enim ad nulla eu.</PoiButton>
          <PoiButton>
            Elit elit ullamco eu ex occaecat sunt eu eiusmod duis sunt ipsum
            ipsum fugiat.
          </PoiButton>
        </div>
        <span className="text-gray400">
          There are no points yet. Click on the menu button to add some.
        </span>
      </div>
    </div>
  );
};

export default Page;
