import { sc } from "../../lib/sc";
import { Button } from "../Atoms/Button";
import { ProgressBar } from "../Atoms/ProgressBar";
import { useState, type ComponentType, type ReactNode } from "react";

const cardStyle = sc(
  "relative block bg-squared-dotted-pattern bg-dotted-pattern w-[388px] aspect-[1.618/1] p-4",
  // "hover:animate-headShake",
  "hover:nth-child(1) border-t-blue-900"
);
const triangleBorderStyle = sc(
  "group border border-[1px] border-transparent w-fit h-fit relative block",
  // "hover:animate-headShake",
  // "hover:border-gray-700",
  " transition-all duration-200 ease-in-out"
);

const triangleStyle = sc(
  "absolute opacity-0 top-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px]",
  "pointer-events-none border-t-gray-900 border-l-transparent z-[1000]",
  "group-hover:border-t-gray-700 group-hover:opacity-100 group-hover:animate-flash"
);

export const ProjectCard = ({
  title = "",
  description = "",
  stack = [],
  progress = 10,
}: {
  title: ReactNode;
  description: string;
  stack: { [key: string]: ComponentType<any> }[];
  progress?: number;
}) => {
  const [technical, setTechnical] = useState(true);
  return (
    <div className={triangleBorderStyle}>
      <div className={triangleStyle}></div>
      <a
        className={sc(cardStyle, "gap-2 flex flex-col relative")}
        href="https://www.google.com"
        target="_blank"
      >
        <section
          className={sc(
            "flex flex-col gap-2 text-gray-950",
            !technical && "opacity-0"
          )}
        >
          <div className="text-[12px] bg-gray-50 p-2 block">
            Progreso: <ProgressBar percent={progress} />
          </div>
          <article className="bg-gray-50 p-2 text-[12px] text-gray-950 flex flex-col gap-2">
            <h3 className="text-[16px] font-[500] bg-gray-50 text-gray-950">
              {title}
            </h3>
            {description}
          </article>
          <span className="flex flex-col gap-1 text-[12px] bg-white p-2">
            <h3 className=" font-[500] ">Stack Tecnológico:</h3>
            <div className="flex items-center gap-1 relative z-[2]">
              {stack.map((icon, index) => {
                const [label, Icon] = Object.entries(icon)[0];
                return (
                  <div key={index} className="group/icon-tooltip">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={sc(
                        "p-1 bg-gray-50 border-[1px] border-dashed transition-all duration-100 ease-in-out",
                        "border-gray-900 hover:bg-gray-900 w-fit h-fit cursor-default group"
                      )}
                    >
                      <Icon className="w-6 h-6 group-hover/icon-tooltip:fill-gray-50 transition-all duration-100 ease-in-out fill-gray-950" />
                    </div>
                    <span
                      className={sc(
                        "absolute -bottom-[26px] left-4 text-gray-50",
                        "whitespace-nowrap ",
                        "hidden group-hover/icon-tooltip:block group-hover/icon-tooltip:opacity-100 group-hover/icon-tooltip:animate-flash",
                        "pointer-events-none",
                        "z-10"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="bg-gray-800 h-6 w-full text-white flex items-center ">
              ::
            </div>
          </span>
          <div className="bg-gray-50 p-2 text-[12px]">
            Metricas:
            <ul>
              <li>└ Lineas de codigo: 254</li>
              <li>└ Componentes: 12</li>
              <li>└ Estado: Activo</li>
            </ul>
          </div>
        </section>
        <section
          className={sc(
            "h-full w-full absolute top-0 left-0 z-[0]",
            technical && "opacity-0 -z-[1]"
          )}
        >
          <img
            className="w-full h-1/2 object-cover"
            src="https://i.pinimg.com/736x/05/8d/e8/058de8d8d2a048390a52f03deddfb3d0.jpg"
            alt=""
          />
          <img
            className="w-full h-1/2 object-cover"
            src="https://i.pinimg.com/736x/05/8d/e8/058de8d8d2a048390a52f03deddfb3d0.jpg"
            alt=""
          />
        </section>
        <div className="flex p-2 gap-2 w-full h-fit bg-gray-50 z-[1]">
          <Button
            onClick={() => console.log("Hola Mundo!")}
            className="w-full hover:animate-flash"
            variant="primary"
            size="sm"
          >
            {"[>_]"} Ver Código
          </Button>
          <Button
            className="w-full whitespace-nowrap hover:animate-flash"
            variant="secondary"
            ghost
            size="sm"
            onClick={() => setTechnical(!technical)}
          >
            {technical ? "[◉°] Ver Capturas" : "↩ Volver"}
          </Button>
        </div>
      </a>
    </div>
  );
};
