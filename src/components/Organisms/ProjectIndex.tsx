import { ProjectCard } from "../Molecules/ProjectCard";
import { ReactIcon } from "../Icons/ReactIcon";
import { TSIcon } from "../Icons/TSIcon";
import { ViteIcon } from "../Icons/ViteIcon";
import { NextJSIcon } from "../Icons/NextJSIcon";
import { CSSModulesIcon } from "../Icons/CSSModulesIcon";
import { ExpressIcon } from "../Icons/ExpressIcon";
import { AstroIcon } from "../Icons/AstroIcon";
import { TailwindIcon } from "../Icons/TailwindIcon";
import { SupabaseIcon } from "../Icons/SupabaseIcon";

export const ProjectIndex = () => {
  return (
    <div className="flex gap-4">
      <ProjectCard
        title={
          <div className="flex items-center gap-2 text-[16px] font-[500] text-gray-950">
            <img className="w-3 h-3" src={"/ideai.svg"} alt="" /> ide•ai
          </div>
        }
        description="Crea markmaps con IA, rápido y fácil. Sube tu archivo pdf o ingresa un prompt."
        progress={10}
        stack={[
          { Vite: ViteIcon },
          { React: ReactIcon },
          { TypeScript: TSIcon },
          { Express: ExpressIcon },
        ]}
      />
      <ProjectCard
        title={"MFFC CV"}
        description="Curriculum vitae de Maria Fernanda Florez Contreras"
        progress={84}
        stack={[
          { NextJS: NextJSIcon },
          { React: ReactIcon },
          { TypeScript: TSIcon },
          { "CSS Modules": CSSModulesIcon },
        ]}
      />
      <ProjectCard
        title={"4Negrita"}
        description="Web para la recaudación de fondos para la iniciativa 4Negrita mediante la organización de rifas."
        progress={68}
        stack={[
          { Astro: AstroIcon },
          { React: ReactIcon },
          { TypeScript: TSIcon },
          { Tailwind: TailwindIcon },
          { Supabase: SupabaseIcon },
        ]}
      />
    </div>
  );
};
