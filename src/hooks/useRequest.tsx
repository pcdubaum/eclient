"use client";

import { useState } from "react";

interface RequestOptions extends RequestInit {
  body?: Record<string, any>;
}

export function useRequest<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request(url: string, options: RequestOptions = {}): Promise<T | null> {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro na requisição");
      }

      return data as T;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { request, loading, error };
}
