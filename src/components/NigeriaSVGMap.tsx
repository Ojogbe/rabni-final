import React, { useEffect, useRef, useState } from "react";
// Load the raw SVG markup so we can inline it and bind events
import nigeriaSvg from "@/assets/nigeria.svg?raw";

interface Props {
	selectedState: string;
	onSelect: (stateName: string) => void;
}

interface ViewBox { x: number; y: number; w: number; h: number }

export default function NigeriaSVGMap({ selectedState, onSelect }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [baseVB, setBaseVB] = useState<ViewBox | null>(null);
	const [zoom, setZoom] = useState(1);

	// Map various title/id forms to our canonical names used on the right panel
	const normalizeName = (raw?: string) => {
		if (!raw) return "";
		const name = raw.trim();
		const lower = name.toLowerCase();
		// Heuristic for FCT/Abuja variants
		if (
			lower === "fct" ||
			lower === "f.c.t." ||
			lower === "abuja" ||
			lower === "fct abuja" ||
			lower === "f.c.t abuja" ||
			lower.includes("federal capital") ||
			lower.includes("abuja fct") ||
			lower.includes("abuja")
		) {
			return "FCT Abuja";
		}
		const map: Record<string, string> = {
			"lagos": "Lagos",
			"kano": "Kano",
			"kaduna": "Kaduna",
			"borno": "Borno",
			"rivers": "Rivers",
			"bayelsa": "Bayelsa",
			"oyo": "Oyo",
			"zamfara": "Zamfara",
			"katsina": "Katsina",
		};
		return map[lower] || name;
	};

	useEffect(() => {
		if (!containerRef.current) return;
		containerRef.current.innerHTML = nigeriaSvg;

		const root = containerRef.current;
		const svg = root.querySelector("svg") as SVGSVGElement | null;
		svgRef.current = svg;
		if (svg) {
			svg.setAttribute("width", "100%");
			svg.setAttribute("height", "100%");
			svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
			svg.style.display = "block";

			// Ensure a valid viewBox: compute from shapes if missing
			let vbAttr = svg.getAttribute("viewBox");
			if (!vbAttr) {
				const shapes = Array.from(svg.querySelectorAll<SVGGraphicsElement>("path, polygon, polyline"));
				if (shapes.length) {
					let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
					shapes.forEach((s) => {
						const b = s.getBBox();
						minX = Math.min(minX, b.x);
						minY = Math.min(minY, b.y);
						maxX = Math.max(maxX, b.x + b.width);
						maxY = Math.max(maxY, b.y + b.height);
					});
					const pad = Math.max((maxX - minX), (maxY - minY)) * 0.04;
					const x = minX - pad;
					const y = minY - pad;
					const w = (maxX - minX) + pad * 2;
					const h = (maxY - minY) + pad * 2;
					svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
					vbAttr = `${x} ${y} ${w} ${h}`;
				}
			}
			if (vbAttr) {
				const [x, y, w, h] = vbAttr.split(/\s+/).map(Number);
				if ([x, y, w, h].every((n) => Number.isFinite(n))) setBaseVB({ x, y, w, h });
			}
		}

		const shapes = Array.from(root.querySelectorAll<SVGElement>("path, polygon, polyline"));

		const onShapeClick = (ev: Event) => {
			const el = ev.currentTarget as SVGElement;
			const title = el.getAttribute("title") || el.getAttribute("name") || el.getAttribute("id") || "";
			const stateName = normalizeName(title);
			if (stateName) onSelect(stateName);
		};

		shapes.forEach((el) => {
			el.style.cursor = "pointer";
			el.addEventListener("click", onShapeClick);
			el.addEventListener("mouseenter", () => {
				if (!el.classList.contains("svg-state--selected")) el.style.fill = "#bfdbfe";
			});
			el.addEventListener("mouseleave", () => {
				if (!el.classList.contains("svg-state--selected")) el.style.fill = "";
			});
		});

		return () => {
			shapes.forEach((el) => el.removeEventListener("click", onShapeClick));
		};
	}, [nigeriaSvg, onSelect]);

	// Keep selected highlight in sync
	useEffect(() => {
		if (!containerRef.current) return;
		const root = containerRef.current;
		const shapes = Array.from(root.querySelectorAll<SVGElement>("path, polygon, polyline"));
		shapes.forEach((el) => {
			const title = el.getAttribute("title") || el.getAttribute("name") || el.getAttribute("id") || "";
			const stateName = normalizeName(title);
			const isSelected = stateName === selectedState;
			el.classList.toggle("svg-state--selected", isSelected);
			el.style.fill = isSelected ? "#7f1d1d" : "";
			el.style.stroke = "#4b5563";
			el.style.strokeWidth = "0.6";
		});
	}, [selectedState]);

	// viewBox-based zoom that never crops
	useEffect(() => {
		const svg = svgRef.current;
		if (svg && baseVB) {
			const cx = baseVB.x + baseVB.w / 2;
			const cy = baseVB.y + baseVB.h / 2;
			const w = baseVB.w / zoom;
			const h = baseVB.h / zoom;
			const x = cx - w / 2;
			const y = cy - h / 2;
			svg.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
		}
	}, [zoom, baseVB]);

	const zoomIn = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
	const zoomOut = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
	const reset = () => setZoom(1);

	return (
		<div className="relative w-full h-[360px]" aria-label="Nigeria map" role="img">
			<div ref={containerRef} className="absolute inset-0" style={{ overflow: "hidden" }} />
			<div className="absolute right-2 top-2 flex flex-col gap-2">
				<button onClick={zoomIn} className="px-2 py-1 rounded bg-white/80 border text-sm">+</button>
				<button onClick={zoomOut} className="px-2 py-1 rounded bg-white/80 border text-sm">-</button>
				<button onClick={reset} className="px-2 py-1 rounded bg-white/80 border text-xs">reset</button>
			</div>
		</div>
	);
}
