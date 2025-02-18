import { User } from "@prisma/client";

const KEYS = ["firstName", "lastName", "visits"] as const;
const HEADERS = ["First name", "Last name", "Total visits"];

export const CheckedInUserTable: React.FC<{
  users: Pick<User, "firstName" | "lastName" | "visits" | "id">[];
}> = ({ users }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {HEADERS.map((column) => {
            return (
              <th key={column} className="py-1 border-b-[1px] border-blue-800">
                {column}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              {KEYS.map((column) => {
                return (
                  <td key={column} className="py-1 text-center">
                    {user[column]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
