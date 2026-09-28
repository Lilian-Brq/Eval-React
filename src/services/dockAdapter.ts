import type { Dock, DockDTO, DockUI } from "../dock";
import { DockNever } from "../dock";


function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isPositiveNumber( v: unknown ) : v is number {
    return typeof v === "number" && v > 0 && Number.isFinite(v);

}

export function parseDockDTO(raw: unknown): DockDTO | null {
    if (!isRecord(raw)) return null;
    if (typeof raw.dock_id !== "string" || typeof raw.label !== "string" )
        return null;

    if (!(raw.kind === "crew" || raw.kind === "cargo" || raw.kind === "service" ))
        return null;

    if (!(raw.state === "OPEN" || raw.state === "BLOCKED" ))
        return null;

    return {
        dock_id: raw.dock_id,
        label: raw.label,
        kind: raw.kind,
        state: raw.state,
        limit_tons: isPositiveNumber(raw.limit_tons) ? raw.limit_tons : undefined,
        max_people: isPositiveNumber(raw.max_people) ? raw.max_people : undefined,
        crane_count: isPositiveNumber(raw.crane_count) ? raw.crane_count : undefined,
        tool_station: typeof raw.tool_station === "string" 
                && raw.tool_station.trim() !== "" ? raw.tool_station : undefined,
    }
}

export function toDock(dto: DockDTO): Dock {
  const base: DockUI = {
    id: dto.dock_id,
    name: dto.label,
    status: dto.state === "OPEN" ? "available" : "blocked" ,
    capacityTons: dto.limit_tons ?? null,
  };

  switch (dto.kind) {
    case "crew":
      return { ...base, kind: "crew", maxPeople: dto.max_people ?? null };
    case "cargo":
        return { ...base, kind: "cargo",craneCount: dto.crane_count ?? null};
    case "service":
        return { ...base, kind: "service", toolStation: dto.tool_station ?? null};
    default:
      return DockNever(dto.kind);
  }
}