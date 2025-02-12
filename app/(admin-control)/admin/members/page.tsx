"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type domain_type =
  | "Web Dev"
  | "Video Editing"
  | "Socials"
  | "App Dev"
  | "Cloud & AI"
  | "Graphics"
  | "Marketing"
  | "Management";

interface Member {
  id: string;
  name: string;
  domain: domain_type;
  role: string;
  user_id: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<domain_type | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    name: "",
    domain: "" as domain_type,
    role: "",
    user_id: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("members")
        .select("id, name, domain, role, user_id")
        .returns<Member[]>();
      if (error) {
        console.error("Error fetching members:", error);
      } else {
        setMembers(data || []);
      }
    }

    async function fetchUsers() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("users")
        .select("id, name, role")
        .eq("role", "team")
        .returns<User[]>();
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data || []);
      }
    }

    fetchMembers();
    fetchUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomain(e.target.value as domain_type);
  };

  const filteredMembers = members.filter((member) => {
    return (
      member &&
      member.name &&
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDomain ? member.domain === selectedDomain : true)
    );
  });

  const handleDelete = async (id: string) => {
    setIsDeleteModalOpen(true);
    setMemberToDelete(id);
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      setIsLoading(true);
      const supabase = createClient();
      const { error } = await supabase
        .from("members")
        .delete()
        .eq("id", memberToDelete);
      if (error) {
        console.error("Error deleting member:", error);
      } else {
        setMembers(members.filter((member) => member.id !== memberToDelete));
      }
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
      setIsLoading(false);
    }
  };

  const handleEditRole = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleRoleChange = async (newRole: string) => {
    if (selectedMember) {
      setIsLoading(true);
      const supabase = createClient();
      const { error } = await supabase
        .from("members")
        .update({ role: newRole })
        .eq("id", selectedMember.id);
      if (error) {
        console.error("Error updating role:", error);
      } else {
        setMembers(
          members.map((member) =>
            member.id === selectedMember.id
              ? { ...member, role: newRole }
              : member
          )
        );
        setIsModalOpen(false);
      }
      setIsLoading(false);
    }
  };

  const handleAddMember = async () => {
    setIsLoading(true);
    try {
      const selectedUser = users.find((user) => user.id === newMember.user_id);
      if (
        !selectedUser ||
        (selectedUser.role !== "team" && selectedUser.role !== "admin")
      ) {
        console.error("Invalid user_id: User must have role 'team' or 'admin'");
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("members")
        .insert([newMember])
        .single();
      if (error) {
        console.error("Error adding member:", error);
      } else {
        setMembers([...members, data]);
        setIsAddModalOpen(false);
        setNewMember({
          name: "",
          domain: "" as domain_type,
          role: "",
          user_id: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAddMemberForm = () => {
    setNewMember({
      name: "",
      domain: "" as domain_type,
      role: "",
      user_id: "",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded p-2"
        />
        <select
          value={selectedDomain}
          onChange={handleDomainChange}
          className="border rounded p-2"
        >
          <option value="">All Domains</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Video Editing">Video Editing</option>
          <option value="Socials">Socials</option>
          <option value="App Dev">App Dev</option>
          <option value="Cloud & AI">Cloud & AI</option>
          <option value="Graphics">Graphics</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
        </select>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white rounded p-2"
        >
          Add Member
        </Button>
      </div>
      <table className="min-w-full bg-white rounded">
        <thead>
          <tr>
            <th className="py-2 border-b">Name</th>
            <th className="py-2 border-b">Domain</th>
            <th className="py-2 border-b">Role</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr
              key={member.id}
              className="hover:bg-gray-100"
            >
              <td className="py-2 border-b">{member.name}</td>
              <td className="py-2 border-b">{member.domain}</td>
              <td className="py-2 border-b">{member.role}</td>
              <td className="py-2 border-b">
                <Button
                  onClick={() => handleEditRole(member)}
                  className="mr-2 bg-blue-500 text-white rounded p-2"
                >
                  Edit Role
                </Button>
                <Button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white rounded p-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedMember && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            Edit Role for {selectedMember.name}
          </h2>
          <Input
            type="text"
            defaultValue={selectedMember.role}
            onBlur={(e) => handleRoleChange(e.target.value)}
            className="border rounded p-2 mb-4"
          />
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-green-500 text-white rounded p-2"
          >
            Save
          </Button>
        </Modal>
      )}
      {isAddModalOpen && (
        <Modal onClose={resetAddMemberForm}>
          <h2 className="text-xl font-bold mb-4">Add New Member</h2>
          <Input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
            className="border rounded p-2 mb-4"
          />
          <select
            value={newMember.domain}
            onChange={(e) =>
              setNewMember({
                ...newMember,
                domain: e.target.value as domain_type,
              })
            }
            className="border rounded p-2 mb-4"
          >
            <option value="">Select Domain</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Socials">Socials</option>
            <option value="App Dev">App Dev</option>
            <option value="Cloud & AI">Cloud & AI</option>
            <option value="Graphics">Graphics</option>
            <option value="Marketing">Marketing</option>
            <option value="Management">Management</option>
          </select>
          <select
            value={newMember.user_id}
            onChange={(e) =>
              setNewMember({ ...newMember, user_id: e.target.value })
            }
            className="border rounded p-2 mb-4"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) =>
              setNewMember({ ...newMember, role: e.target.value })
            }
            className="border rounded p-2 mb-4"
          />
          <Button
            onClick={handleAddMember}
            className="bg-green-500 text-white rounded p-2"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Member"}
          </Button>
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this member?</p>
          <div className="flex gap-4 mt-4">
            <Button
              onClick={confirmDelete}
              className="bg-red-500 text-white rounded p-2"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-500 text-white rounded p-2"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
