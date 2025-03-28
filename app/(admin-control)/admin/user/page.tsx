"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null); // Track the logged-in user's role

  // Fetch the logged-in user's role
  useEffect(() => {
    async function fetchCurrentUserRole() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (data) {
          setCurrentUserRole(data.role);
        }
      }
    }

    fetchCurrentUserRole();
  }, []);

  // Fetch users based on the logged-in user's role
  useEffect(() => {
    async function fetchUsers() {
      const supabase = createClient();
      let query = supabase.from("users").select("id, name, email, role, image");

      // If the current user is a team member, only fetch users with the "user" role
      if (currentUserRole === "team") {
        query = query.eq("role", "user");
      }

      // Admins can see all users except other admins
      if (currentUserRole === "admin") {
        query = query.neq("role", "admin");
      }

      const { data, error } = await query.returns<User[]>();

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
    }

    if (currentUserRole) {
      fetchUsers();
    }
  }, [currentUserRole]);

  // Handle search by name
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle role filter
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole ? user.role === selectedRole : true)
    );
  });

  // Handle delete user
  const handleDelete = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      console.error("Error deleting user:", error);
    } else {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  // Handle edit role
  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  // Save updated role
  const handleSaveRole = async () => {
    if (selectedUser) {
      const supabase = createClient();
      const { error } = await supabase
        .from("users")
        .update({ role: newRole })
        .eq("id", selectedUser.id);

      if (error) {
        console.error("Error updating role:", error);
      } else {
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...user, role: newRole } : user
          )
        );
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded p-2"
        />
        {/* Only show role filter dropdown for admins */}
        {currentUserRole === "admin" && (
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="border rounded p-2"
          >
            <option value="">All Roles</option>
            <option value="team">Team</option>
            <option value="user">User</option>
          </select>
        )}
      </div>
      <table className="min-w-full bg-white rounded">
        <thead>
          <tr>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Email</th>
            <th className="py-2 border-b">Role</th>
            <th className="py-2 border-b">Image</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100"
            >
              <td className="py-2 border-b">{user.name}</td>
              <td className="py-2 border-b">{user.email}</td>
              <td className="py-2 border-b">{user.role}</td>
              <td className="py-2 border-b">
                <img
                  src={`${
                    user.role === "user"
                      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/emo/${user.image}`
                      : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile/${user.image}`
                  }`}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="py-2 border-b">
                {/* Only admins can edit roles */}
                {currentUserRole === "admin" && (
                  <Button
                    onClick={() => handleEditRole(user)}
                    className="mr-2 bg-blue-500 text-white rounded p-2"
                  >
                    Edit Role
                  </Button>
                )}
                {/* Team members can only delete users with the "user" role */}
                {(currentUserRole === "admin" ||
                  (currentUserRole === "team" && user.role === "user")) && (
                  <Button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white rounded p-2"
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Role Modal */}
      {isModalOpen && selectedUser && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            Edit Role for {selectedUser.name}
          </h2>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="border rounded p-2 mb-4"
          >
            <option value="team">Team</option>
            <option value="user">User</option>
          </select>
          <Button
            onClick={handleSaveRole}
            className="bg-green-500 text-white rounded p-2"
          >
            Save
          </Button>
        </Modal>
      )}
    </div>
  );
}
