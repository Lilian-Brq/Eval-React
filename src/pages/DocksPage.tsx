import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Dock } from "../dock";
import { fetchDocks } from "../services/dockService";

type StatusFilter = "all" | "available" | "blocked";

export default function DocksPage() {
  const [docks, setDocks] = useState<Dock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    const controller = new AbortController();
    fetchDocks(controller.signal)
      .then((data) => {
        setDocks(data);
        setLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setLoading(false);
      });
    return () => controller.abort();
  }, [reloadKey]);

  function retry() {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  }

  function reset() {
    setSearch("");
    setFilter("all");
  }

  const visible = docks.filter(
    (d) =>
      d.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (filter === "all" || d.status === filter)
  );

  return (
    <>
      <h1>Quais d'amarrage</h1>
      <p>Consultez la disponibilité des quais de la station Atlas.</p>

      {loading && <p role="status">Chargement des quais…</p>}

      {error && (
        <div role="alert">
          <p>Impossible de charger les quais : {error}</p>
          <button type="button" onClick={retry}>Réessayer</button>
        </div>
      )}

      {!loading && !error && docks.length === 0 && (
        <p>Aucun quai disponible dans le manifeste.</p>
      )}

      {!loading && !error && docks.length > 0 && (
        <>
          <p>{visible.length} quai(s) affiché(s)</p>

          <div className="controls">
            <label>
              Recherche par nom
              <input value={search} onChange={(e) => setSearch(e.target.value)} />
            </label>
            <label>
              Statut
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as StatusFilter)}
              >
                <option value="all">Tous</option>
                <option value="available">Disponible</option>
                <option value="blocked">Bloqué</option>
              </select>
            </label>
            <button type="button" onClick={reset}>Réinitialiser</button>
          </div>

          {visible.length === 0 ? (
            <div>
              <p>Aucun quai ne correspond à votre recherche.</p>
              <button type="button" onClick={reset}>Réinitialiser les filtres</button>
            </div>
          ) : (
            <div className="grid">
              {visible.map((d) => (
                <Link key={d.id} to={`/docks/${d.id}`} className="card">
                  <h2>{d.name}</h2>
                  <p>Identifiant : {d.id}</p>
                  <p>Type : {d.kind}</p>
                  <p>
                    Statut :{" "}
                    <span className={`badge badge-${d.status}`}>
                      {d.status === "available" ? "Disponible" : "Bloqué"}
                    </span>
                  </p>
                  <p>
                    Capacité :{" "}
                    {d.capacityTons === null ? "non renseignée" : `${d.capacityTons} t`}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}