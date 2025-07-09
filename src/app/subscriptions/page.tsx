"use client";

import { useEffect, useState } from "react";
import {
  subscriptionsData,
  membersData,
  sportsData,
  type Subscription,
} from "@/data/mockData";
import FormSelect from "@/components/forms/FormSelect";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormButton from "@/components/forms/FormButton";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";
import { validateForm, type ValidationRules } from "@/utils/validation";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "",
    sportIds: [] as string[],
    paymentMethod: "Credit Card",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubscriptions(subscriptionsData);
      setLoading(false);
    }, 500);
  }, []);

  const validationRules: ValidationRules = {
    memberId: { required: true },
    sportIds: { required: true, minLength: 1 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        );
      case "paypal":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H18.5v-2.956h-.203c-.681 0-1.352.163-1.844.478-.492.315-.844.825-.844 1.478 0 .653.352 1.163.844 1.478.492.315 1.163.478 1.844.478H18.5v-2.956h.203c.681 0 1.352.163 1.844.478z" />
          </svg>
        );
      case "bank transfer":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        );
    }
  };

  // Get available sports for a member (excluding already subscribed sports)
  const getAvailableSports = (memberId: string) => {
    if (!memberId) return sportsData;

    const memberSubscriptions = subscriptions.filter(
      (sub) => sub.memberId === memberId
    );
    const subscribedSportIds = memberSubscriptions.map((sub) => sub.sportId);

    return sportsData.filter((sport) => !subscribedSportIds.includes(sport.id));
  };

  // Get member's current subscriptions
  const getMemberSubscriptions = (memberId: string) => {
    return subscriptions.filter((sub) => sub.memberId === memberId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const selectedMember = membersData.find((m) => m.id === formData.memberId);
    if (!selectedMember) return;

    const newSubscriptions: Subscription[] = formData.sportIds
      .map((sportId, index) => {
        const sport = sportsData.find((s) => s.id === sportId);
        if (!sport) return null;

        const startDate = new Date().toISOString().split("T")[0];
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);

        return {
          id: (subscriptions.length + index + 1).toString(),
          memberId: formData.memberId,
          memberName: `${selectedMember.firstName} ${selectedMember.lastName}`,
          sportId: sportId,
          sportName: sport.name,
          startDate: startDate,
          endDate: endDate.toISOString().split("T")[0],
          status: "active" as const,
          price: sport.price,
          paymentMethod: formData.paymentMethod,
          lastPayment: startDate,
        };
      })
      .filter(Boolean) as Subscription[];

    // Add to the list immediately
    setSubscriptions((prev) => [...prev, ...newSubscriptions]);

    // Reset form
    setFormData({
      memberId: "",
      sportIds: [],
      paymentMethod: "Credit Card",
    });
    setErrors({});
    setShowForm(false);

    // Show success message
    alert(
      `Successfully subscribed ${selectedMember.firstName} ${selectedMember.lastName} to ${newSubscriptions.length} sport(s)!`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Reset sport selection when member changes
    if (name === "memberId") {
      setFormData((prev) => ({
        ...prev,
        sportIds: [],
      }));
    }
  };

  const handleSportChange = (sportId: string) => {
    setFormData((prev) => ({
      ...prev,
      sportIds: prev.sportIds.includes(sportId)
        ? prev.sportIds.filter((id) => id !== sportId)
        : [...prev.sportIds, sportId],
    }));

    // Clear error when user selects sports
    if (errors.sportIds) {
      setErrors((prev) => ({
        ...prev,
        sportIds: "",
      }));
    }
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    if (filter === "all") return true;
    return subscription.status === filter;
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    expired: subscriptions.filter((s) => s.status === "expired").length,
    cancelled: subscriptions.filter((s) => s.status === "cancelled").length,
    totalRevenue: subscriptions.reduce((sum, s) => sum + s.price, 0),
  };

  const memberOptions = membersData
    .filter((member) => member.status === "active")
    .map((member) => ({
      value: member.id,
      label: `${member.firstName} ${member.lastName} (${member.email})`,
    }));

  const paymentMethodOptions = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "PayPal", label: "PayPal" },
    { value: "Bank Transfer", label: "Bank Transfer" },
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
              Subscriptions
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and view all member subscriptions
            </p>
          </div>
          <FormButton
            variant="primary"
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto"
          >
            {showForm ? "Cancel" : "Add New Subscription"}
          </FormButton>
        </div>

        {/* Add Subscription Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Subscription
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                  id="memberId"
                  name="memberId"
                  label="Select Member"
                  value={formData.memberId}
                  onChange={handleInputChange}
                  options={memberOptions}
                  error={errors.memberId}
                  placeholder="Choose a member..."
                  required
                />

                <FormSelect
                  id="paymentMethod"
                  name="paymentMethod"
                  label="Payment Method"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  options={paymentMethodOptions}
                />
              </div>

              {formData.memberId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Sports *
                  </label>
                  {getAvailableSports(formData.memberId).length === 0 ? (
                    <div className="text-center py-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">
                        This member is already subscribed to all available
                        sports.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getAvailableSports(formData.memberId).map((sport) => (
                        <FormCheckbox
                          key={sport.id}
                          id={`sport-${sport.id}`}
                          name={`sport-${sport.id}`}
                          label={sport.name}
                          checked={formData.sportIds.includes(sport.id)}
                          onChange={() => handleSportChange(sport.id)}
                          description={`$${sport.price}/month`}
                        />
                      ))}
                    </div>
                  )}
                  {errors.sportIds && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sportIds}
                    </p>
                  )}
                </div>
              )}

              {formData.memberId &&
                getMemberSubscriptions(formData.memberId).length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">
                      Current Subscriptions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getMemberSubscriptions(formData.memberId).map((sub) => (
                        <span
                          key={sub.id}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {sub.sportName} (${sub.price}/month)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <FormButton
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      memberId: "",
                      sportIds: [],
                      paymentMethod: "Credit Card",
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
                  disabled={getAvailableSports(formData.memberId).length === 0}
                  className="w-full sm:w-auto"
                >
                  Add Subscription
                  {formData.sportIds.length > 0
                    ? ` (${formData.sportIds.length})`
                    : ""}
                </FormButton>
              </div>
            </form>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total</p>
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {stats.expired}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-600">
                  {stats.cancelled}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
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
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  ${stats.totalRevenue.toLocaleString()}
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
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
              variant={filter === "expired" ? "primary" : "secondary"}
              onClick={() => setFilter("expired")}
              className="text-sm"
            >
              Expired ({stats.expired})
            </FormButton>
            <FormButton
              variant={filter === "cancelled" ? "primary" : "secondary"}
              onClick={() => setFilter("cancelled")}
              className="text-sm"
            >
              Cancelled ({stats.cancelled})
            </FormButton>
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {subscription.memberName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {subscription.memberName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscription.sportName}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          subscription.status
                        )}`}
                      >
                        {subscription.status.charAt(0).toUpperCase() +
                          subscription.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${subscription.price}/month
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-gray-500 mr-2">
                          {getPaymentMethodIcon(subscription.paymentMethod)}
                        </div>
                        <span className="text-sm text-gray-900">
                          {subscription.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>
                          Start:{" "}
                          {new Date(
                            subscription.startDate
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          End:{" "}
                          {new Date(subscription.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <FormButton
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          Edit
                        </FormButton>
                        <FormButton
                          variant="danger"
                          className="text-xs px-2 py-1"
                        >
                          Cancel
                        </FormButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredSubscriptions.length === 0 && (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No subscriptions found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filter criteria or add a new subscription.
            </p>
          </div>
        )}
      </div>
    </ResponsiveContainer>
  );
}
