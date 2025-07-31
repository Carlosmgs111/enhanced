import { useEffect, useRef, useState } from "react";
import { matrixIsLocked as matrixIsLockedStore } from "../../stores/matrixState";
import { useStore } from "@nanostores/react";

const CELL_SIZE = 15;
const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#f0f0f0";

const useExtremeGrid = (width: number, height: number) => {
  const matrixIsLocked = useStore(matrixIsLockedStore);
  const isMouseDown = useRef(false);
  const totalCells = width * height;
  const grid = useRef(new Uint8Array(totalCells));
  const cells = useRef<HTMLDivElement[]>([]);
  const animationId = useRef<number | null>(null);
  const frameCount = useRef(0);
  const opCount = useRef(0);
  const lastTime = useRef(performance.now());

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [stats, setStats] = useState({
    fps: 0,
    opsPerSecond: 0,
    nsPerOp: 0,
    throughput: 0,
    memory: Math.round(totalCells / 1024),
  });

  const initializeGrid = () => {
    const element = gridRef.current;
    if (!element) return;

    element.style.gridTemplateColumns = `repeat(${width}, ${CELL_SIZE}px)`;
    const fragment = document.createDocumentFragment();
    cells.current = new Array(totalCells);
    grid.current = new Uint8Array(totalCells);

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = INACTIVE_COLOR;
      cell.style.width = `${CELL_SIZE}px`;
      cell.style.height = `${CELL_SIZE}px`;
      cell.style.cursor = "pointer";
      cell.onclick = () => toggleByIndex(i);
      cell.onmouseenter = () => {
        if (isMouseDown.current) toggleByIndex(i);
      };
      matrixIsLockedStore.subscribe((value) => {
        if (value) {
          cell.style.cursor = "not-allowed";
          cell.style.backgroundColor = "#ccc";
          cell.style.border = "1px solid #ccc";
        } else {
          cell.style.cursor = "pointer";
          cell.style.backgroundColor = INACTIVE_COLOR;
          cell.style.border = "1px dotted #ccc";
        }
      });
      fragment.appendChild(cell);
      cells.current[i] = cell;
    }

    element.innerHTML = "";
    element.appendChild(fragment);
  };

  const toggleByIndex = (index: number) => {
    const newValue = grid.current[index] ^ 1;
    grid.current[index] = newValue;
    cells.current[index].style.backgroundColor = newValue
      ? ACTIVE_COLOR
      : INACTIVE_COLOR;
    opCount.current++;
  };

  const fillPattern = () => {
    for (let i = 0; i < totalCells; i++) {
      const x = i % width;
      const y = Math.floor(i / width);
      const value = (x + y) & 1;
      grid.current[i] = value;
      cells.current[i].style.backgroundColor = value
        ? ACTIVE_COLOR
        : INACTIVE_COLOR;
    }
    opCount.current += totalCells;
  };

  const clear = () => {
    grid.current.fill(0);
    for (let i = 0; i < totalCells; i++) {
      cells.current[i].style.backgroundColor = INACTIVE_COLOR;
    }
    opCount.current += totalCells;
  };

  const benchmark = (operations = 200000) => {
    const start = performance.now();
    for (let i = 0; i < operations; i++) {
      const idx = Math.floor(Math.random() * totalCells);
      toggleByIndex(idx);
    }
    const end = performance.now();
    const duration = end - start;
    return {
      duration: duration.toFixed(2),
      opsPerSecond: Math.round((operations / duration) * 1000).toLocaleString(),
      nsPerOp: Math.round((duration * 1000000) / operations),
    };
  };

  const animateTurbo = () => {
    const batchSize = Math.min(500, Math.floor(totalCells / 10));
    for (let i = 0; i < batchSize; i++) {
      const idx = Math.floor(Math.random() * totalCells);
      toggleByIndex(idx);
    }
    frameCount.current++;
    animationId.current = requestAnimationFrame(animateTurbo);
  };

  const startTurbo = () => {
    if (!animationId.current) animateTurbo();
  };

  const stopTurbo = () => {
    if (animationId.current) cancelAnimationFrame(animationId.current);
    animationId.current = null;
  };

  useEffect(() => {
    initializeGrid();
    // fillPattern();

    // const interval = setInterval(() => {
    //   const now = performance.now();
    //   const delta = now - lastTime.current;
    //   if (delta >= 1000) {
    //     const fps = Math.round((frameCount.current * 1000) / delta);
    //     const opsPerSecond = Math.round((opCount.current * 1000) / delta);
    //     const nsPerOp = opCount.current > 0 ? Math.round((delta * 1000000) / opCount.current) : 0;
    //     const mbPerSecond = Math.round((opCount.current * 4) / (1024 * 1024));

    //     setStats({
    //       fps,
    //       opsPerSecond,
    //       nsPerOp,
    //       throughput: mbPerSecond,
    //       memory: Math.round(totalCells / 1024),
    //     });

    //     frameCount.current = 0;
    //     opCount.current = 0;
    //     lastTime.current = now;
    //   }
    // }, 0);

    // return () => clearInterval(interval);
  }, [width, height]);
  useEffect(() => {
    const handleMouseDown = () => {
      isMouseDown.current = true;
    };
    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return {
    gridRef,
    clear,
    startTurbo,
    stopTurbo,
    benchmark,
    stats,
  };
};

export default function GridApp() {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(60);
  const [benchmarkResult, setBenchmarkResult] = useState(null);

  const {
    gridRef,
    clear,
    startTurbo,
    stopTurbo,
    benchmark,
    stats,
  }: ReturnType<typeof useExtremeGrid> = useExtremeGrid(width, height);

  return (
    <div className="p-4 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-xl mb-4">Rejilla Máximo Rendimiento - React</h1>

      <div className="flex gap-2 flex-wrap mb-4">
        <label>
          Ancho:{" "}
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(+e.target.value)}
            className="border p-1 w-16 text-sm"
          />
        </label>
        <label>
          Alto:{" "}
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="border p-1 w-16 text-sm"
          />
        </label>
        <button
          onClick={() => location.reload()}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Crear
        </button>
        <button
          onClick={clear}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Limpiar
        </button>
        <button
          onClick={() => setBenchmarkResult(benchmark())}
          className="bg-orange-600 text-white px-3 py-1 rounded"
        >
          Benchmark
        </button>
        <button
          onClick={startTurbo}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Turbo
        </button>
        <button
          onClick={stopTurbo}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Parar
        </button>
      </div>

      <div className="inline-block border-2 border-black bg-white rounded p-2">
        <div ref={gridRef} className="grid gap-[1px]" />
      </div>

      <div className="mt-4 bg-blue-100 p-3 rounded text-xs font-mono grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <span>FPS: {stats.fps}</span>
        <span>Ops/seg: {stats.opsPerSecond.toLocaleString()}</span>
        <span>Eficiencia: {stats.nsPerOp} ns/op</span>
        <span>Throughput: {stats.throughput} MB/s</span>
        <span>Memoria: {stats.memory} KB</span>
        <span>Celdas: {width * height}</span>
        {benchmarkResult && (
          <span className="col-span-full">
            Benchmark: {benchmarkResult?.opsPerSecond} ops/seg,{" "}
            {benchmarkResult?.nsPerOp}ns/op en {benchmarkResult?.duration}ms
          </span>
        )}
      </div>

      <div className="mt-3 p-2 bg-gray-200 border-l-4 border-green-600 text-xs">
        <strong>Optimizaciones activas:</strong> Array unidimensional con
        TypedArray, índices precalculados, acceso directo a memoria, batch DOM,
        eliminación de clases CSS, toggle con XOR.
      </div>
    </div>
  );
}
