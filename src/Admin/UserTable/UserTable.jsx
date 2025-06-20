import React from 'react';

const UserTable = () => {
  const users = [
    { id: 1, username: 'siddhartha', email: 'siddhartha@example.com' },
    { id: 2, username: 'john_doe', email: 'john@example.com' },
    { id: 3, username: 'jane_smith', email: 'jane@example.com' },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 font-[Montserrat]">
      <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Registered Users</h2>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-[#2c2c2c] text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-700">#</th>
                <th className="px-6 py-4 border-b border-gray-700">Username</th>
                <th className="px-6 py-4 border-b border-gray-700">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#292929] transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-200">{index + 1}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
