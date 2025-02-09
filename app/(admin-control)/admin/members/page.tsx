//  ADD A NEW MEMBER [ focus on selecting user id ]
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
      const supabase = createClient();
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
    const supabase = createClient();
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
      const supabase = createClient();
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
      </div>
      <table className="min-w-full bg-white  rounded">
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
    </div>
  );
}
