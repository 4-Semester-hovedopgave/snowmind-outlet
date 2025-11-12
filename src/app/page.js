"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.log("Fejl:", error);
      } else {
        setProducts(data);
      }
    }
    getData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Snowminds Outlet</h1>
      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            {p.image_url && <img src={p.image_url} alt={p.title} className="w-full max-w-sm mx-auto rounded" />}
            <p>{p.title}</p>
            <p className="text-sm text-gray-600">{p.price} kr</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
