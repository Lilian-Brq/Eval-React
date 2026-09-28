import { Link, Navigate, NavLink, Route, Routes } from "react-router-dom";
import DocksPage from "./pages/DocksPage";

function DockDetailPage() {
  return <h1>Fiche du quai</h1>;
}

function RequestsPage() {
  return <h1>Demandes d'amarrage</h1>;
}

function NewRequestPage() {
  return <h1>Nouvelle demande d'amarrage</h1>;
}

function NotFoundPage() {
  return (
    <>
      <h1>Page introuvable (404)</h1>
      <p>Cette adresse ne correspond à aucune page de la station.</p>
      <Link to="/docks">Retour aux quais</Link>
    </>
  );
}

function App() {
  return (
    <>
      <header className="header">
        <Link to="/docks">Station Atlas</Link>
        <nav className="nav" aria-label="Navigation principale">
          <NavLink to="/docks">Quais</NavLink>
          <NavLink to="/requests">Demandes</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/docks" replace />} />
          <Route path="/docks" element={<DocksPage />} />
          <Route path="/docks/:dockId" element={<DockDetailPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/new" element={<NewRequestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;