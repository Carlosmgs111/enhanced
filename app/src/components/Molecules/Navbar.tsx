import { Navlink } from "../Atoms/Navlink";
export const Navbar = () => {
  return (
    <nav className="flex flex-col bg-gray-100 w-[200px] border-r-[1px] border-gray-300">
      <div className="flex flex-col items-center justify-between w-full">
        <a
          href="/"
          className="text-[12px] text-gray-500 font-[500] w-full p-4 hover:animate-flash"
        >
          <h1 className="text-[18px] font-[500] text-gray-950 w-full">
            nan<i className="text-[14px] not-italic">⏻</i>
          </h1>
          <h2 className="text-[10px] text-gray-500 font-[500] w-full">
            nanoarchitecture
          </h2>
        </a>
      </div>
      <div className="w-full border-t-[1px] border-gray-300 group">
        <label className="p-4 text-[10px] font-[500] text-gray-500 w-full uppercase block bg-gray-200 group-hover:text-gray-900 group-hover:animate-flash">
          main
        </label>
        <ul className="flex flex-col text-[12px]">
          <Navlink link="/projects">▣ Proyectos</Navlink>
        </ul>
      </div>

      <div className="w-full border-t-[1px] border-gray-300 group">
        <label className="p-4 text-[10px] font-[500] text-gray-500 w-full uppercase block bg-gray-200 group-hover:text-gray-900 group-hover:animate-flash">
          UI-Design
        </label>
        <ul className="flex flex-col text-[12px]">
          <Navlink link="/UI-design/dot-grid">Grid Editor</Navlink>
          <Navlink link="/UI-design/konva">Konva</Navlink>
          <Navlink link="/UI-design/components">Componentes</Navlink>
          <Navlink link="/UI-design/masonry">Masonry</Navlink>
        </ul>
      </div>
    </nav>
  );
};
