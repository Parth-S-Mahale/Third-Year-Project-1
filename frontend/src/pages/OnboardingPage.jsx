import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api.js";
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  Handshake,
  LoaderIcon,
} from "lucide-react";
import { SKILLS } from "../constants/index.js";
import MultiSkillSelector from "../components/MultiSkills.jsx"
import { useNavigate } from "react-router";

const OnboardingPage = () => {
  // tanstack query
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    gainedSkills: authUser?.gainedSkills || [],
    learningSkills: authUser?.learningSkills || [],
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randAvatar });
    toast.success("Random profile picture generated");
  };

  const handleSkillChange = (skillType, action, skill) => {
    setFormState((prevState) => {
      const currentSkills = prevState[skillType];
      let newSkills;
      if (action === "add") {
        newSkills = currentSkills.includes(skill)
          ? currentSkills
          : [...currentSkills, skill];
      } else {
        newSkills = currentSkills.filter((s) => s !== skill);
      }

      return { ...prevState, [skillType]: newSkills };
    });
  };

  

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your learning goals"
              ></textarea>
            </div>

            {/* SKILLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* GAINED SKILLS */}
              <MultiSkillSelector
                label="Skills you have"
                selectedSkills={formState.gainedSkills}
                allSkills={SKILLS}
                onSkillAdd={(skill) =>
                  handleSkillChange("gainedSkills", "add", skill)
                }
                onSkillRemove={(skill) =>
                  handleSkillChange("gainedSkills", "remove", skill)
                }
              />
              {/* LEARNING SKILLS */}
              <MultiSkillSelector
                label="Skills you want to learn"
                selectedSkills={formState.learningSkills}
                allSkills={SKILLS}
                onSkillAdd={(skill) =>
                  handleSkillChange("learningSkills", "add", skill)
                }
                onSkillRemove={(skill) =>
                  handleSkillChange("learningSkills", "remove", skill)
                }
              />
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => navigate("/home")}
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <Handshake className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
