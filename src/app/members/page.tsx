"use client";

import { useEffect, useState } from "react";
import { membersData, sportsData, type Member } from "@/data/mockData";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import {
  validateForm,
  COMMON_RULES,
  type ValidationRules,
} from "@/utils/validation";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    membershipType: "basic",
    sports: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMembers(membersData);
      setLoading(false);
    }, 500);
  }, []);

  const validationRules: ValidationRules = {
    firstName: COMMON_RULES.name,
    lastName: COMMON_RULES.name,
    email: COMMON_RULES.email,
    phone: COMMON_RULES.phone,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case "vip":
        return "bg-purple-100 text-purple-800";
      case "premium":
        return "bg-blue-100 text-blue-800";
      case "basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMemberSports = (sportIds: string[]) => {
    return sportIds.map((id) => {
      const sport = sportsData.find((s) => s.id === id);
      return sport?.name || "Unknown Sport";
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newMember: Member = {
      id: (members.length + 1).toString(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      joinDate: new Date().toISOString().split("T")[0], // Today's date
      membershipType: formData.membershipType as "basic" | "premium" | "vip",
      sports: formData.sports,
      status: "active",
      avatar: "/avatars/default.jpg",
    };

    // Add to the list immediately
    setMembers((prev) => [newMember, ...prev]);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      membershipType: "basic",
      sports: [],
    });
    setErrors({});
    setShowForm(false);

    // Show success message
    alert("Member added successfully!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSportChange = (sportId: string) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sportId)
        ? prev.sports.filter((id) => id !== sportId)
        : [...prev.sports, sportId],
    }));
  };

  const filteredMembers = members.filter((member) => {
    if (filter === "all") return true;
    return member.status === filter;
  });

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    inactive: members.filter((m) => m.status === "inactive").length,
    pending: members.filter((m) => m.status === "pending").length,
  };

  const membershipTypeOptions = [
    { value: "basic", label: "Basic" },
    { value: "premium", label: "Premium" },
    { value: "vip", label: "VIP" },
  ];

  if (loading) {
    return (
      <ResponsiveContainer>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Members
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and view all club members
            </p>
          </div>
          <FormButton
            variant="primary"
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto"
          >
            {showForm ? "Cancel" : "Add New Member"}
          </FormButton>
        </div>

        {/* Add Member Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Member
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  placeholder="e.g., John"
                  required
                />

                <FormInput
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  placeholder="e.g., Smith"
                  required
                />

                <FormInput
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="e.g., john.smith@email.com"
                  required
                />

                <FormInput
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  placeholder="e.g., +1 (555) 123-4567"
                  required
                />

                <FormSelect
                  id="membershipType"
                  name="membershipType"
                  label="Membership Type"
                  value={formData.membershipType}
                  onChange={handleInputChange}
                  options={membershipTypeOptions}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sports (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {sportsData.map((sport) => (
                    <FormCheckbox
                      key={sport.id}
                      id={`sport-${sport.id}`}
                      name={`sport-${sport.id}`}
                      label={sport.name}
                      checked={formData.sports.includes(sport.id)}
                      onChange={() => handleSportChange(sport.id)}
                      description={`$${sport.price}/month`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <FormButton
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      membershipType: "basic",
                      sports: [],
                    });
                    setErrors({});
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </FormButton>
                <FormButton
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Add Member
                </FormButton>
              </div>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Total Members
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {stats.inactive}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <FormButton
              variant={filter === "all" ? "primary" : "secondary"}
              onClick={() => setFilter("all")}
              className="text-sm"
            >
              All ({stats.total})
            </FormButton>
            <FormButton
              variant={filter === "active" ? "primary" : "secondary"}
              onClick={() => setFilter("active")}
              className="text-sm"
            >
              Active ({stats.active})
            </FormButton>
            <FormButton
              variant={filter === "inactive" ? "primary" : "secondary"}
              onClick={() => setFilter("inactive")}
              className="text-sm"
            >
              Inactive ({stats.inactive})
            </FormButton>
            <FormButton
              variant={filter === "pending" ? "primary" : "secondary"}
              onClick={() => setFilter("pending")}
              className="text-sm"
            >
              Pending ({stats.pending})
            </FormButton>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                  {member.firstName[0]}
                  {member.lastName[0]}
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-900">{member.phone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Join Date:</span>
                  <span className="text-gray-900">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      member.status
                    )}`}
                  >
                    {member.status.charAt(0).toUpperCase() +
                      member.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Membership:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipTypeColor(
                      member.membershipType
                    )}`}
                  >
                    {member.membershipType.toUpperCase()}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Sports:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {getMemberSports(member.sports).map((sport, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <FormButton variant="primary" className="flex-1 text-sm">
                  View Details
                </FormButton>
                <FormButton variant="secondary" className="flex-1 text-sm">
                  Edit
                </FormButton>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No members found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filter criteria or add a new member.
            </p>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}
