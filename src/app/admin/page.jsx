"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [access, setAccess] = useState(false);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    // inputs til ny / redigeret vare
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    // adgangskode
    function checkPassword() {
        if (password === "snowminds123") {
            setAccess(true);
            loadProducts();
        } else {
            setMessage("Forkert adgangskode");
        }
    }

    // henter varer
    async function loadProducts() {
        const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
        setProducts(data || []);
    }

    // tilføj eller rediger
    async function saveProduct() {
        if (!title || !price || !image) {
            setMessage("Udfyld alle felter");
            return;
        }

        if (editId) {
            // rediger eksisterende
            await supabase
                .from("products")
                .update({ title, price, image_url: image })
                .eq("id", editId);
            setMessage("Vare opdateret");
        } else {
            // tilføj ny
            await supabase
                .from("products")
                .insert([{ title, price, image_url: image }]);
            setMessage("Vare tilføjet");
        }

        // nulstil form
        setTitle("");
        setPrice("");
        setImage("");
        setEditId(null);
        loadProducts();
    }

    // slet
    async function deleteProduct(id) {
        await supabase.from("products").delete().eq("id", id);
        setMessage("Vare slettet");
        loadProducts();
    }

    // udfyld form når man trykker "Rediger"
    function startEdit(p) {
        setTitle(p.title);
        setPrice(p.price);
        setImage(p.image_url);
        setEditId(p.id);
    }

    return (
        <main className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Admin – Snowminds Outlet</h1>

            {/*Betyder at for at dette virker skal der indtastet en kode*/}
            {!access ? (
                <div>
                    <div className="mb-2 text-sm text-gray-600 space-y-1">
                        <p>Skriv adgangskoden for at få adgang</p>
                        <p>Koden er: <span className="font-semibold">snowminds123</span></p>
                    </div>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded w-full mb-3"
                        placeholder="Adgangskode"
                    />
                    <button
                        onClick={checkPassword}
                        className="bg-black text-white px-4 py-2 rounded w-full cursor-pointer"
                    >
                        Log ind
                    </button>
                    {message && <p className="mt-3">{message}</p>}
                </div>
            ) : (
                <div>
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-3">
                            {editId ? "Rediger vare" : "Tilføj ny vare"}
                        </h2>

                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titel"
                            className="border p-2 w-full mb-2 rounded"
                        />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Pris"
                            className="border p-2 w-full mb-2 rounded"
                        />
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Billede-URL"
                            className="border p-2 w-full mb-2 rounded"
                        />

                        <button
                            onClick={saveProduct}
                            className="bg-black text-white px-4 py-2 rounded w-full cursor-pointer"
                        >
                            {editId ? "Gem ændringer" : "Tilføj vare"}
                        </button>

                        {message && <p className="mt-3 text-sm">{message}</p>}
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">Eksisterende varer</h2>
                        {products.length === 0 && <p>Ingen varer endnu...</p>}

                        <div className="space-y-4">
                            {products.map((p) => (
                                <div key={p.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{p.title}</p>
                                            <p className="text-sm text-gray-600">{p.price} kr</p>
                                        </div>
                                        <div className="flex gap-2 ">
                                            <button
                                                onClick={() => startEdit(p)}
                                                className="border px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                Rediger
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(p.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                            >
                                                Slet
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
}
