import { useState, useEffect } from "react";
import type { UserDetails } from "../types";

interface Props {
  info: { id: string; name: string } | null;
}

export default function Details({ info }: Props) {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!info) {
      setDetails(null);
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const userDetails: UserDetails = {
          id: String(data.id),
          name: data.name,
          avatar: data.avatar,
          city: data.details?.city ?? "Не указано",
          company: data.details?.company ?? "Не указана",
          position: data.details?.position ?? "Не указана",
        };
        setDetails(userDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [info]);

  if (!info) {
    return (
      <div
        style={{
          width: "400px",
          padding: "40px",
          textAlign: "center",
          color: "#999",
        }}
      >
        Выберите пользователя слева
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          width: "400px",
          padding: "40px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "400px",
          padding: "40px",
          backgroundColor: "#ffebee",
          color: "#d32f2f",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "400px",
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {details?.avatar && (
        <img
          src={details.avatar}
          alt={details.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        />
      )}
      <h2>{details?.name}</h2>
      <div style={{ marginTop: "16px" }}>
        <p>
          <strong>City:</strong> {details?.city}
        </p>
        <p>
          <strong>Company:</strong> {details?.company}
        </p>
        <p>
          <strong>Position:</strong> {details?.position}
        </p>
      </div>
    </div>
  );
}
