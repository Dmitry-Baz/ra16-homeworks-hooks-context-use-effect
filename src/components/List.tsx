import type { User } from "../types";

interface Props {
  users: User[];
  onSelect: (user: User) => void;
  selectedId: string | null;
}

export default function List({ users, onSelect, selectedId }: Props) {
  return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #eee",
        padding: "0 20px",
      }}
    >
      <h3>Пользователи</h3>
      {users.length === 0 ? (
        <p style={{ color: "#999" }}>Загрузка...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => onSelect(user)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                backgroundColor:
                  selectedId === user.id ? "#e3f2fd" : "transparent",
                borderRadius: "4px",
                marginBottom: "8px",
                borderLeft:
                  selectedId === user.id
                    ? "4px solid #2196f3"
                    : "4px solid transparent",
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
