
export interface DockDTO  {
    max_people?: number;
    crane_count?: number;
    tool_station?: string;
    kind: "crew" | "cargo" | "service";
    dock_id: string;
    label: string;
    state: "OPEN" | "BLOCKED";
    limit_tons?: number;
}

export interface DockUI {
    readonly id: string;
    name: string;
    status: "available" | "blocked";
    capacityTons: number | null;
}


export interface Passager extends DockUI { kind: "crew"; maxPeople: number | null; }
export interface Cargo extends DockUI { kind: "cargo"; craneCount: number | null; }
export interface Entretien extends DockUI { kind: "service"; toolStation: string | null; }

export type Dock = Passager | Cargo | Entretien


export function DockNever(value: never): never {
  throw new Error(`Cas non traité : ${String(value)}`);
}


export function getDock(dock: Dock): string {
  switch (dock.kind) {
    case "crew": return dock.maxPeople === null ? "Donnée indisponible" : `${dock.maxPeople} personne(s) max`;
    case "cargo": return dock.craneCount === null ? "Donnée indisponible" : `${dock.craneCount} grue(s)`;
    case "service": return dock.toolStation === null ? "Donnée indisponible" : `Station ${dock.toolStation}`;
    default:  return DockNever(dock);
  }
}
