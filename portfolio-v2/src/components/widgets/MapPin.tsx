"use client";

import { useEffect, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import { profile } from "@/data/profile";

const { geo } = profile;

// View presets — start zoomed out at the NY-state level, toggle in to campus.
// Campus/Ithaca/Region all recenter on the pin so zooming stays anchored to the
// exact point; only NY keeps its own framing of the whole state.
const PIN = [geo.lat, geo.lng] as [number, number];
const VIEWS = [
  { id: "campus", label: "Campus", center: PIN, zoom: 16 },
  { id: "ithaca", label: "Ithaca", center: PIN, zoom: 12 },
  { id: "region", label: "Region", center: PIN, zoom: 8 },
  { id: "ny", label: "NY", center: [42.9, -75.8] as [number, number], zoom: 5 },
] as const;

const INITIAL = VIEWS[3]; // open zoomed out to the whole of NY state

// Clean, light grayscale basemap for context. State polygons are drawn on top
// (gray fill + bold black outline) so boundaries read clearly at any zoom.
const BASEMAP = {
  url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

// Canonical Leaflet US-states GeoJSON (used in their choropleth tutorial).
const STATES_GEOJSON =
  "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";

function fmt(value: number, pos: string, neg: string) {
  return `${Math.abs(value).toFixed(2)}°${value >= 0 ? pos : neg}`;
}

export function MapPin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const [view, setView] = useState<string>(INITIAL.id);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletNS.Map | null = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      map = L.map(containerRef.current, {
        center: INITIAL.center,
        zoom: INITIAL.zoom,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });
      mapRef.current = map;
      map.attributionControl.setPosition("bottomleft");

      L.tileLayer(BASEMAP.url, {
        subdomains: "abcd",
        maxZoom: 19,
        attribution: BASEMAP.attribution,
      }).addTo(map);

      // Gray state fills with bold black outlines for legibility. Non-interactive
      // so it never swallows pan/zoom gestures. Basemap alone is fine if it fails.
      try {
        const res = await fetch(STATES_GEOJSON);
        if (res.ok && !cancelled && map) {
          const data = await res.json();
          L.geoJSON(data, {
            interactive: false,
            style: () => ({
              color: "#0a0d12",
              weight: 1.4,
              opacity: 0.85,
              fillColor: "#8b929c",
              fillOpacity: 0.32,
            }),
          }).addTo(map);
        }
      } catch {
        /* keep the basemap if the boundary overlay can't be fetched */
      }

      const icon = L.divIcon({
        className: "",
        html: `<span class="map-pin"><span class="map-pin__ring"></span><span class="map-pin__dot"></span></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      L.marker([geo.lat, geo.lng], { icon })
        .addTo(map)
        .bindTooltip(geo.place, {
          direction: "top",
          offset: [0, -6],
          className: "map-tip",
        });

      setTimeout(() => map?.invalidateSize(), 120);
    })();

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  const goTo = (v: (typeof VIEWS)[number]) => {
    setView(v.id);
    mapRef.current?.flyTo(v.center, v.zoom, { duration: 0.8 });
  };

  return (
    <div className="glass flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Based in</span>
        <span className="status-live flex items-center gap-1.5 font-mono text-[10px] text-emerald-300/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          LIVE
        </span>
      </div>

      {/* Real interactive map — pan + scroll-zoom, opens at the NY level. */}
      <div className="relative my-4 h-40 overflow-hidden rounded-md border border-line">
        <div
          ref={containerRef}
          className="map-canvas h-full w-full"
          data-theme="light"
          role="application"
          aria-label="Interactive map of New York State, marking Cornell University in Ithaca"
        />

        {/* View toggles (top-right) */}
        <div className="absolute right-1.5 top-1.5 z-[500] flex gap-1 rounded-md border border-line bg-bg/80 p-0.5 backdrop-blur-sm">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => goTo(v)}
              className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide transition-colors ${
                view === v.id
                  ? "bg-accent/20 text-accent"
                  : "text-fg/45 hover:text-fg/80"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-fg/85">{geo.place}</p>
          <p className="mt-0.5 font-mono text-[11px] text-fg/40">
            {fmt(geo.lat, "N", "S")} {fmt(geo.lng, "E", "W")}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30">
          {geo.label}
        </span>
      </div>
    </div>
  );
}
