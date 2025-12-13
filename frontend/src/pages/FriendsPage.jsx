import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { UsersIcon, SearchIcon, MessageSquarePlusIcon } from "lucide-react";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // In your real app, this will call your actual API
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-base-100 min-h-screen">
      <div className="container mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <UsersIcon className="size-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Connections{" "}
              <span className="text-primary">({friends.length})</span>
            </h1>
          </div>
          {friends.length > 0 && (
             <div className="relative w-full sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/50" />
                <input
                    type="text"
                    placeholder="Search friends..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-20">
            <div className="card bg-base-200 max-w-lg mx-auto p-8">
                <MessageSquarePlusIcon className="size-16 mx-auto text-primary/50" />
                <h2 className="mt-6 text-2xl font-bold">Find Your First Connection</h2>
                <p className="mt-2 text-base-content/70">
                    You don't have any friends yet. Go to the homepage to discover and connect with new learners!
                </p>
                <div className="mt-8">
                    <Link to="/home" className="btn btn-primary">
                        Find New Friends
                    </Link>
                </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFriends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
             {filteredFriends.length === 0 && (
                <div className="col-span-full text-center py-12">
                    <p className="text-lg">No friends found matching "{searchTerm}"</p>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
