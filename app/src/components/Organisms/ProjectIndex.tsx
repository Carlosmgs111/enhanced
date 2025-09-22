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
import { sc } from "../../lib/sc";
import Masonry from "react-masonry-css";

export const ProjectIndex = () => {
  const projects = [
    <ProjectCard
      className="mb-4"
      title={
        <div className="flex items-center gap-2 text-[16px] font-[500] text-gray-950">
          <img className="w-3 h-3" src={"/ideai.svg"} alt="" /> ide•ai
        </div>
      }
      description="Crea markmaps con IA, rápido y fácil. Sube tu archivo pdf o ingresa un prompt."
      progress={10}
      tags={[
        "Frontend:tw=red-500",
        "Backend:tw=blue-500",
        "UI/UX:tw=yellow-500",
        "API:tw=orange-500",
        "Deploy:tw=purple-500",
      ]}
      repositoryUrl="https://github.com/Carlosmgs111/ideai.app"
      stack={[
        { TypeScript: TSIcon },
        { Vite: ViteIcon },
        { React: ReactIcon },
        { Express: ExpressIcon },
      ]}
      additionalMetrics={{}}
    />,
    <ProjectCard
      className="mb-4"
      title="Maria Fernanda Florez Contreras CV"
      description="Curriculum vitae de Maria Fernanda Florez Contreras como atencion al pasajero en cabina vuelo pasajero."
      progress={84}
      tags={["Frontend", "Backend", "UI/UX", "API", "Deploy"]}
      repositoryUrl="https://github.com/Carlosmgs111/landing.cv.mffc"
      stack={[
        { TypeScript: TSIcon },
        { NextJS: NextJSIcon },
        { React: ReactIcon },
        { "CSS Modules": CSSModulesIcon },
      ]}
      additionalMetrics={{}}
    />,
    <ProjectCard
      className="mb-4"
      title="Campaña 4 Negrita"
      description="Web para la recaudación de fondos para la iniciativa 4Negrita mediante la organización de rifas."
      progress={68}
      repositoryUrl="https://github.com/Carlosmgs111/4negrita"
      stack={[
        { TypeScript: TSIcon },
        { Astro: AstroIcon },
        { React: ReactIcon },
        { Tailwind: TailwindIcon },
        { Supabase: SupabaseIcon },
      ]}
      additionalMetrics={{}}
    />,
    <ProjectCard
      className="mb-4"
      title={
        <div className="flex items-center gap-2 text-[16px] font-[500] text-gray-950">
          <img className="w-3 h-3" src={"/ideai.svg"} alt="" /> ide•ai
        </div>
      }
      description="Crea markmaps con IA, rápido y fácil. Sube tu archivo pdf o ingresa un prompt."
      progress={10}
      tags={[
        "Frontend:tw=red-500",
        "Backend:tw=blue-500",
        "UI/UX:tw=yellow-500",
        "API:tw=orange-500",
        "Deploy:tw=purple-500",
      ]}
      repositoryUrl="https://github.com/Carlosmgs111/ideai.app"
      stack={[
        { TypeScript: TSIcon },
        { Vite: ViteIcon },
        { React: ReactIcon },
        { Express: ExpressIcon },
      ]}
      additionalMetrics={{}}
    />,
    <ProjectCard
      className="mb-4"
      title="Maria Fernanda Florez Contreras CV"
      description="Curriculum vitae de Maria Fernanda Florez Contreras como atencion al pasajero en cabina vuelo pasajero."
      progress={84}
      tags={["Frontend", "Backend", "UI/UX", "API", "Deploy"]}
      repositoryUrl="https://github.com/Carlosmgs111/landing.cv.mffc"
      stack={[
        { TypeScript: TSIcon },
        { NextJS: NextJSIcon },
        { React: ReactIcon },
        { "CSS Modules": CSSModulesIcon },
      ]}
      additionalMetrics={{}}
    />,
    <ProjectCard
      className="mb-4"
      title="Campaña 4 Negrita"
      description="Web para la recaudación de fondos para la iniciativa 4Negrita mediante la organización de rifas."
      progress={68}
      repositoryUrl="https://github.com/Carlosmgs111/4negrita"
      stack={[
        { TypeScript: TSIcon },
        { Astro: AstroIcon },
        { React: ReactIcon },
        { Tailwind: TailwindIcon },
        { Supabase: SupabaseIcon },
      ]}
      additionalMetrics={{}}
    />,
  ];
  return (
    <Masonry
      breakpointCols={{
        default: projects.length < 2 ? projects.length : 2,
        1024: 1,
      }}
      className={sc("flex max-w-[1024px] gap-4")}
    >
      {projects}
    </Masonry>
  );
};
