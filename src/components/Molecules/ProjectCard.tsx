import { sc } from "../../lib/sc";
import { Button } from "../Atoms/Button";
import { ProgressBar } from "../Atoms/ProgressBar";
import {
  useEffect,
  useReducer,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { Badge } from "../Atoms/Badge";
import { getRepoMetrics } from "../../services/getRepoMetrics";

const cardStyle = sc(
  "relative block bg-grid-pattern",
  "p-8 w-full border-[1px] border-gray-300 bg-gray-100",
  // "hover:animate-headShake",
  "hover:nth-child(1)"
);
const triangleBorderStyle = sc(
  "group border border-[1px] border-transparent w-full h-fit relative block",
  // "hover:animate-headShake",
  // "hover:border-gray-700",
  "transition-all duration-200 ease-in-out"
);
const triangleStyle = sc(
  "absolute opacity-0 w-0 h-0 border-transparent",
  "pointer-events-none z-[1000] group-hover:opacity-100 group-hover:animate-flash"
);
const triangleLTStyle = sc(
  triangleStyle,
  "top-0 left-0 border-t-[16px] border-r-[16px] group-hover:border-t-gray-950"
);
const triangleRTStyle = sc(
  triangleStyle,
  "top-0 right-0 border-t-[16px] border-l-[16px] group-hover:border-t-gray-950"
);
const triangleLBStyle = sc(
  triangleStyle,
  "bottom-0 left-0 border-b-[16px] border-r-[16px] group-hover:border-b-gray-950"
);
const triangleRBStyle = sc(
  triangleStyle,
  "bottom-0 right-0 border-b-[16px] border-l-[16px] group-hover:border-b-gray-950"
);

export const ProjectCard = ({
  title = "",
  description = "",
  stack = [],
  progress = 10,
  additionalMetrics = {},
  tags = [],
  repositoryUrl = "",
  className = "",
}: {
  title: ReactNode;
  description: string;
  stack: { [key: string]: ComponentType<any> }[];
  progress?: number;
  additionalMetrics?: { [key: string]: string };
  tags?: string[];
  repositoryUrl?: string;
  className?: string;
}) => {
  const initialState = {
    description: "",
    "⌂ homePage": "",
    ...additionalMetrics,
  };
  const [technical, setTechnical] = useState(true);
  const [metrics, setMetrics]: [typeof initialState, Function] = useReducer(
    (prevState, currentState) => {
      return { ...prevState, ...currentState };
    },
    initialState
  );
  useEffect(() => {
    Promise.all([
      getRepoMetrics("Carlosmgs111", repositoryUrl.split("/").reverse()[0]),
    ]).then((res) => setMetrics({ ...res[0] }));
  }, []);

  console.log(metrics);
  return (
    <div className={sc(triangleBorderStyle, className)}>
      <div className={triangleLTStyle}></div>
      <div className={triangleRTStyle}></div>
      <div className={triangleLBStyle}></div>
      <div className={triangleRBStyle}></div>
      <a
        className={sc(cardStyle, "gap-2 flex gap-6 flex-col relative")}
        href={metrics["⌂ homePage"]}
        target="_blank"
      >
        <div
          className={sc(
            "absolute opacity-0 -top-1 -right-1 bg-gray-900 text-gray-50 w-fit h-fit py-1 px-4 text-[10px]",
            "pointer-events-none z-[1000] flex items-center justify-center",
            "group-hover:border-t-gray-700 group-hover:opacity-100 group-hover:animate-flash"
          )}
        >
          ⬤ Ver en vivo
        </div>
        <section
          className={sc(
            "flex flex-col gap-6 text-gray-950",
            !technical && "opacity-0"
          )}
        >
          <div className="flex items-center justify-between">
            <div></div>
            <ProgressBar className="text-[12px] block" percent={progress} />
          </div>
          <article className="text-[12px] text-gray-950 flex flex-col gap-2">
            <h3 className="text-[16px] font-[500] text-gray-950 uppercase">
              {title}
            </h3>
            <p className="text-[12px] text-gray-800">
              {metrics.description || description}
            </p>
          </article>
          <span className="flex flex-col gap-1 text-[12px] ">
            <h3 className=" font-[500] uppercase">STACK TECNOLÓGICO:</h3>
            <div className="flex flex-wrap items-center gap-1 relative z-[2]">
              {stack.map((icon, index) => {
                const [label, Icon] = Object.entries(icon)[0];
                return (
                  <div key={index} className="group/icon-tooltip">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={sc(
                        "p-1 bg-gray-50 border-[1px] transition-all duration-100 ease-in-out",
                        "border-gray-400 hover:bg-gray-900 w-fit h-fit cursor-default group"
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
                        "z-10 font-[100]"
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
          <div className="text-[12px]">
            <ul>
              {Object.entries(metrics).map(([label, value], index) => {
                if (
                  !value ||
                  label.includes("url") ||
                  label.includes("description")
                )
                  return;
                return (
                  <li
                    className="flex items-center justify-between gap-1"
                    key={index}
                  >
                    <p className="text-gray-800 capitalize">└ {label}:</p>
                    <p className="text-gray-800 font-[200]">
                      {value as string}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section
          className={sc(
            "h-full w-full absolute top-0 left-0 z-[0] transition-all duration-100 ease-in-out",
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
        {tags.length > 0 && (
          <section className="flex flex-wrap gap-2">
            {tags.map((tag, index) => {
              const [label, style] = tag.split(":");
              const [colorStyle, color] = style?.split("=") || [];
              console.log(colorStyle, color);
              const className = sc(
                `border-b-[2px]`,
                colorStyle == "tw" && `border-${color}`,
                colorStyle == "hex" && `border-[${color}]`
              );
              console.log({ className });
              return (
                <Badge key={index} className={className}>
                  {label}
                </Badge>
              );
            })}
          </section>
        )}
        <section className="flex gap-2 w-full h-fit  z-[1]">
          <Button
            onClick={() => window.open(repositoryUrl)}
            className="w-full hover:animate-flash"
            variant="primary"
            size="sm"
          >
            {"[>_]"} Ver Código
          </Button>
          {technical && (
            <Button
              className="w-full whitespace-nowrap hover:animate-flash"
              variant="secondary"
              ghost
              size="sm"
              onClick={() => setTechnical(!technical)}
            >
              [◉°] Ver Capturas
            </Button>
          )}
          {!technical && (
            <Button
              className="w-full whitespace-nowrap hover:animate-flash"
              variant="secondary"
              ghost
              size="sm"
              onClick={() => setTechnical(!technical)}
            >
              ↩ Volver
            </Button>
          )}
          {/* <Button
            onClick={() => console.log("Hola Mundo!")}
            className="w-full hover:animate-flash"
            variant="secondary"
            size="sm"
          >
            (☰) Base de Datos
          </Button> */}
        </section>
      </a>
    </div>
  );
};
