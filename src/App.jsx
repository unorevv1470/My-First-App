import { useEffect, useState } from "react";
import { supabase } from "./service/supabaseClient";
import "./App.css";

export default function App() {
  const [data, setData] = useState({
    clicks: 0,
    selected_item: "None",
  });

  const [loading, setLoading] = useState(true);

  const ITEMS = [
    "Feature Alpha",
    "Beta Shield",
    "Gamma Cloud",
    "Delta Core",
  ];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("dashboard_stats")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (data) setData(data);
    setLoading(false);
  }

  async function updateData(clicks, item) {
    const updated = {
      clicks,
      selected_item: item,
    };

    setData(updated);

    await supabase
      .from("dashboard_stats")
      .update(updated)
      .eq("id", 1);
  }

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <h2>Internship Dashboard</h2>

        <button
          className="counter"
          onClick={() =>
            updateData(data.clicks + 1, data.selected_item)
          }
        >
          Clicks: {data.clicks}
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>React + Supabase Dashboard</h1>
        <p>Clickable • Responsive • Deployed on Vercel</p>
      </section>

      {/* GRID */}
      <section className="grid">
        {ITEMS.map((item) => {
          const active = data.selected_item === item;

          return (
            <div
              key={item}
              className={`card ${active ? "active" : ""}`}
              onClick={() => updateData(data.clicks + 1, item)}
            >
              <h3>{item}</h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert(item + " selected");
                }}
              >
                Select
              </button>
            </div>
          );
        })}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        Selected: {data.selected_item}
      </footer>

    </div>
  );
}