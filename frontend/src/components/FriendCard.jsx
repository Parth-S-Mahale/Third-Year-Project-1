import React, { useState } from "react";
import { Link } from "react-router-dom"; // Updated for modern react-router
import { capitialize } from "../lib/utils";

// --- Bio Component with "View More" Logic ---
const ExpandableBio = ({ bio, charLimit = 80 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // If there's no bio or it's within the limit, just display it
    if (!bio || bio.length <= charLimit) {
        return <p className="text-sm opacity-70 mb-4 h-12">{bio}</p>;
    }

    // Toggle function
    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="text-sm opacity-70 mb-4">
            <p style={{ minHeight: '3rem' }}> {/* Prevents layout shift */}
                {isExpanded ? bio : `${bio.substring(0, charLimit)}...`}
            </p>
            <button
                onClick={toggleIsExpanded}
                className="link link-primary text-xs font-semibold"
            >
                {isExpanded ? "View Less" : "View More"}
            </button>
        </div>
    );
};


const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="card-body p-4 flex flex-col">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
                <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>
        
        {/* SKILLS */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <strong className="text-xs w-full opacity-70">SKILLS:</strong>
          {friend.gainedSkills.map((skill) => (
            <span key={skill} className="badge badge-secondary badge-sm">
              {capitialize(skill)}
            </span>
          ))}
        </div>
        
        {/* LEARNING */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <strong className="text-xs w-full opacity-70">LEARNING:</strong>
          {friend.learningSkills.map((skill) => (
            <span
              key={skill}
              className="badge badge-primary badge-outline badge-sm"
            >
              {capitialize(skill)}
            </span>
          ))}
        </div>

        {/* --- EXPANDABLE BIO SECTION --- */}
        <ExpandableBio bio={friend.bio} />
        
        {/* This div makes the button stick to the bottom */}
        <div className="mt-auto">
            <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full mt-2">
                Message
            </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

