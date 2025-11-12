"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  // Denne funktion henter alle produkter fra Supabase databasen
  async function getProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data);
  }

  // useEffect sørger for at koden kun kører én gang, når siden åbnes
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Snowminds Outlet</h1>

      {products.length === 0 && <p>Ingen produkter endnu...</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 hover:shadow transition">
            {p.image_url && (
              <div className="overflow-hidden rounded mb-3">
                <img src={p.image_url} alt={p.title} className="w-full max-w-sm mx-auto" />
              </div>
            )}
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.price} kr</p>
          </div>
        ))}
      </div>
    </main>
  );
}
