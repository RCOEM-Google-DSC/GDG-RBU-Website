// MEMBERS TABLE:
// - Return name, domain, role, user_id
// - Search bar to search by name
// - Dropdown to filter by domain
// - List all members with name, domain, role
// - Delete button to remove member
// - Dropdown to edit user domain
// - Modal to edit user role with input field
// - Edit button to change member role (text of the role)
// - View button to see member details
// - Add member button (consider implementation)
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface Member {
  id: string;
  name: string;
  domain: string;
  role: string;
  user_id: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("members")
        .select("id, name, domain, role, user_id")
        .returns<Member[]>();
      if (error) {
        console.error("Error fetching members:", error);
      } else {
        console.log("Fetched members:", data);
        setMembers(data || []);
      }
    }
    fetchMembers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search term:", e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected domain:", e.target.value);
    setSelectedDomain(e.target.value);
  };

  const filteredMembers = members.filter((member) => {
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDomain ? member.domain === selectedDomain : true)
    );
  });

  const handleDelete = async (id: string) => {
    console.log("Deleting member with ID:", id);
    const supabase = await createClient();
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      console.error("Error deleting member:", error);
    } else {
      console.log("Member deleted successfully");
      setMembers(members.filter((member) => member.id !== id));
    }
  };

  const handleEditRole = (member: Member) => {
    console.log("Editing role for member:", member);
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleRoleChange = async (newRole: string) => {
    if (selectedMember) {
      console.log(
        "Updating role for member:",
        selectedMember.id,
        "to:",
        newRole
      );
      const supabase = await createClient();
      const { error } = await supabase
        .from("members")
        .update({ role: newRole })
        .eq("id", selectedMember.id);
      if (error) {
        console.error("Error updating role:", error);
      } else {
        console.log("Role updated successfully");
        setMembers(
          members.map((member) =>
            member.id === selectedMember.id
              ? { ...member, role: newRole }
              : member
          )
        );
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={selectedDomain}
          onChange={handleDomainChange}
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
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Domain</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td className="py-2">{member.name}</td>
              <td className="py-2">{member.domain}</td>
              <td className="py-2">{member.role}</td>
              <td className="py-2">
                <Button onClick={() => handleEditRole(member)}>
                  Edit Role
                </Button>
                <Button onClick={() => handleDelete(member.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedMember && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Edit Role for {selectedMember.name}</h2>
          <Input
            type="text"
            defaultValue={selectedMember.role}
            onBlur={(e) => handleRoleChange(e.target.value)}
          />
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </div>
  );
}
