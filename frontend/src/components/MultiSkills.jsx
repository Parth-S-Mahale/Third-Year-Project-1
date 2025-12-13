// A new reusable component for selecting multiple skills.
import {X} from "lucide-react"

const MultiSkillSelector = ({
  label,
  selectedSkills,
  allSkills,
  onSkillAdd,
  onSkillRemove,
}) => {
  const handleSelect = (e) => {
    const skill = e.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      onSkillAdd(skill);
    }
    e.target.value = ""; // Reset dropdown after selection
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        className="select select-bordered w-full"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          Choose a skill to add...
        </option>
        {allSkills
          .filter((skill) => !selectedSkills.includes(skill.toLowerCase()))
          .map((skill) => (
            <option key={skill} value={skill.toLowerCase()}>
              {skill}
            </option>
          ))}
      </select>

      <div className="flex flex-wrap gap-2 mt-3 min-h-[40px] rounded-lg bg-base-100 p-2">
        {selectedSkills.map((skill) => (
          <div key={skill} className="badge badge-primary gap-2 text-sm">
            <span className="capitalize">{skill}</span>
            <button
              type="button"
              onClick={() => onSkillRemove(skill)}
              className="rounded-full hover:bg-black/20"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
        {selectedSkills.length === 0 && (
          <span className="text-sm text-base-content/60 px-2">
            Selected skills will appear here
          </span>
        )}
      </div>
    </div>
  );
};

export default MultiSkillSelector;
