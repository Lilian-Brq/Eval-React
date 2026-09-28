import type { Dock } from "../dock";
import { parseDockDTO, toDock } from "./dockAdapter";

export async function fetchDocks(signal?: AbortSignal): Promise<Dock[]> {
    const response = await fetch("/api/docks.json", { signal });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Réponse inexploitable");
    }
    const docks: Dock[] = [];
    for (const item of data) {
        const dto = parseDockDTO(item);
        if (dto !== null) {
            docks.push(toDock(dto));
        }
    }
    return docks;
}