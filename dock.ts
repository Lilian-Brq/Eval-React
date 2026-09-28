//import {  } from "../";

export interface DockDTO  {
    maxPeople: number;
    craneCount: number;
    toolStation : string;
    dock_id: string;
    label: string;
    status: "OPEN" | "BLOCKED";
    limit_tons: number;
}

export interface DockUI  {
    readonly id: string;
    name: string;
    status: "available" | "blocked";
    capacityTons: number;
}


export interface passager extends DockUI { kind: "nbr_passager"; maxPeople: number; }
export interface cranecount extends DockUI { kind: "craneCount"; craneCount: number; }
export interface entretient extends DockUI { kind: "entretient_station"; toolStation: string; }

export type MonitoredDock = passager | cranecount | entretient


export function DockNever(value: never): never {
  throw new Error(`Cas non traité : ${String(value)}`);
}


export function getDock(dock: MonitoredDock): string {
  switch (dock.kind) {
    case "nbr_passager": return `${dock.maxPeople} personne max`;
    case "craneCount": return `${dock.craneCount}`;
    case "entretient_station": return `${dock.toolStation}`;
    default:  return DockNever(dock);
  }
}
