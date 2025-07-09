"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sportsData, membersData, subscriptionsData } from "@/data/mockData";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSports: 0,
    totalMembers: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
  });

  useEffect(() => {
    const activeSubscriptions = subscriptionsData.filter(
      (sub) => sub.status === "active"
    ).length;

    setStats({
      totalSports: sportsData.length,
      totalMembers: membersData.length,
      totalSubscriptions: subscriptionsData.length,
      activeSubscriptions,
    });
  }, []);

  const StatCard = ({
    title,
    value,
    description,
    href,
    color,
  }: {
    title: string;
    value: number;
    description: string;
    href: string;
    color: string;
  }) => (
    <Link href={href} className="block">
      <div
        className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${color}`}
      >
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="ml-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );

  const RecentActivity = () => {
    const recentSubscriptions = subscriptionsData
      .sort(
        (a, b) =>
          new Date(b.lastPayment).getTime() - new Date(a.lastPayment).getTime()
      )
      .slice(0, 5);

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentSubscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {subscription.memberName}
                </p>
                <p className="text-xs text-gray-500">
                  {subscription.sportName} subscription
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${subscription.price}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(subscription.lastPayment).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your Sporting Club Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sports"
          value={stats.totalSports}
          description="Available sports programs"
          href="/sports"
          color="hover:bg-blue-50"
        />
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          description="Registered members"
          href="/members"
          color="hover:bg-green-50"
        />
        <StatCard
          title="Total Subscriptions"
          value={stats.totalSubscriptions}
          description="All subscriptions"
          href="/subscriptions"
          color="hover:bg-yellow-50"
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          description="Currently active"
          href="/subscriptions"
          color="hover:bg-purple-50"
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href="/sports"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Sports</p>
                <p className="text-sm text-gray-500">
                  View and edit sports programs
                </p>
              </div>
            </Link>

            <Link
              href="/members"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-green-600"
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
              <div>
                <p className="font-medium text-gray-900">Manage Members</p>
                <p className="text-sm text-gray-500">
                  View and edit member information
                </p>
              </div>
            </Link>

            <Link
              href="/subscriptions"
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-yellow-600"
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
              <div>
                <p className="font-medium text-gray-900">
                  Manage Subscriptions
                </p>
                <p className="text-sm text-gray-500">
                  View and manage subscriptions
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
