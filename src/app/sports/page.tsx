"use client";

import { useEffect, useState } from "react";
import { sportsData, type Sport } from "@/data/mockData";
import FormInput from "@/components/forms/FormInput";
import FormButton from "@/components/forms/FormButton";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import {
  validateForm,
  COMMON_RULES,
  type ValidationRules,
} from "@/utils/validation";

export default function SportsPage() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructor: "",
    schedule: "",
    price: "",
    capacity: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSports(sportsData);
      setLoading(false);
    }, 500);
  }, []);

  const validationRules: ValidationRules = {
    name: COMMON_RULES.name,
    description: COMMON_RULES.description,
    instructor: { required: true, minLength: 2, maxLength: 100 },
    schedule: { required: true, minLength: 5, maxLength: 200 },
    price: COMMON_RULES.price,
    capacity: COMMON_RULES.capacity,
  };

  const getAvailabilityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const getAvailabilityText = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "Almost Full";
    if (percentage >= 75) return "Limited Spots";
    return "Available";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newSport: Sport = {
      id: (sports.length + 1).toString(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      image: "/images/default-sport.jpg",
      capacity: parseInt(formData.capacity),
      currentMembers: 0,
      instructor: formData.instructor.trim(),
      schedule: formData.schedule.trim(),
      price: parseFloat(formData.price),
    };

    // Add to the list immediately
    setSports((prev) => [newSport, ...prev]);

    // Reset form
    setFormData({
      name: "",
      description: "",
      instructor: "",
      schedule: "",
      price: "",
      capacity: "",
    });
    setErrors({});
    setShowForm(false);

    // Show success message
    alert("Sport added successfully!");
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
              Sports Programs
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and view all available sports programs
            </p>
          </div>
          <FormButton
            variant="primary"
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto"
          >
            {showForm ? "Cancel" : "Add New Sport"}
          </FormButton>
        </div>

        {/* Add Sport Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Sport
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  name="name"
                  label="Sport Name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="e.g., Tennis, Swimming"
                  required
                />

                <FormInput
                  id="instructor"
                  name="instructor"
                  label="Instructor"
                  type="text"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  error={errors.instructor}
                  placeholder="e.g., Coach Sarah Johnson"
                  required
                />

                <FormInput
                  id="price"
                  name="price"
                  label="Price per Month"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  error={errors.price}
                  placeholder="e.g., 120"
                  required
                />

                <FormInput
                  id="capacity"
                  name="capacity"
                  label="Capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  error={errors.capacity}
                  placeholder="e.g., 20"
                  required
                />
              </div>

              <FormInput
                id="schedule"
                name="schedule"
                label="Schedule"
                type="text"
                value={formData.schedule}
                onChange={handleInputChange}
                error={errors.schedule}
                placeholder="e.g., Mon, Wed, Fri 6:00 PM - 8:00 PM"
                required
              />

              <FormInput
                id="description"
                name="description"
                label="Description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Describe the sport program, benefits, and what participants can expect..."
                required
              />

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <FormButton
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: "",
                      description: "",
                      instructor: "",
                      schedule: "",
                      price: "",
                      capacity: "",
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
                  Add Sport
                </FormButton>
              </div>
            </form>
          </div>
        )}

        {/* Sports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sports.map((sport) => (
            <div
              key={sport.id}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {sport.name}
                </h3>
                <span className="text-lg font-bold text-blue-600">
                  ${sport.price}/month
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {sport.description}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Instructor:</span>
                  <span className="text-gray-900 font-medium">
                    {sport.instructor}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Schedule:</span>
                  <span className="text-gray-900 font-medium">
                    {sport.schedule}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="text-gray-900 font-medium">
                    {sport.currentMembers}/{sport.capacity}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span
                    className={`font-medium ${getAvailabilityColor(
                      sport.currentMembers,
                      sport.capacity
                    )}`}
                  >
                    {getAvailabilityText(sport.currentMembers, sport.capacity)}
                  </span>
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

        {sports.length === 0 && (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No sports found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new sport program.
            </p>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}
