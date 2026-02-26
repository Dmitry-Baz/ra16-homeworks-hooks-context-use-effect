import { useState, useEffect } from "react";
import List from "./components/List";
import Details from "./components/Details";
import type { User } from "./types";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки списка");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Загрузка списка...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#d32f2f", textAlign: "center", padding: "40px" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "40px",
        gap: "40px",
      }}
    >
      <List
        users={users}
        onSelect={(user) =>
          setSelectedUser((prev) =>
            prev?.id === user.id ? prev : { id: user.id, name: user.name }
          )
        }
        selectedId={selectedUser?.id || null}
      />
      <Details info={selectedUser} />
    </div>
  );
}
