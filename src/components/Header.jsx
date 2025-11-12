"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b py-4 bg-white">
            <nav className="max-w-6xl mx-auto flex justify-between items-center px-4">
                <h1 className="font-bold text-xl">Snowminds Outlet</h1>

                <ul className="flex gap-6">
                    <li>
                        <Link href="/" className="hover:text-gray-600 cursor-pointer">
                            Produkter
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin" className="hover:text-gray-600 cursor-pointer">
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
