"use client";

import {
useEffect,
useState,
} from "react";

export default function EditProfile() {
const [bio, setBio] =
useState("");

const [
profileImage,
setProfileImage,
] = useState("");

const [
  bannerImage,
  setBannerImage,
] = useState("");

const [location, setLocation] =
useState("");

const [headline, setHeadline] =
useState("");

const [careerGoal, setCareerGoal] =
useState("");

const [interests, setInterests] =
useState("");

const [skills, setSkills] =
useState("");

const [
experienceLevel,
setExperienceLevel,
] = useState("");

const [faithBased, setFaithBased] =
useState(false);

const [linkedinUrl, setLinkedinUrl] =
useState("");

const [githubUrl, setGithubUrl] =
useState("");

const [portfolioUrl, setPortfolioUrl] =
useState("");

const [
availabilityStatus,
setAvailabilityStatus,
] = useState("Open");

const [loading, setLoading] =
useState(false);

useEffect(() => {
async function loadProfile() {
const storedUser =
localStorage.getItem(
"connectsphere_user"
);


  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

console.log(
  "Saving profile image:",
  profileImage
);

  const response =
    await fetch(
      "/api/profile",
            {
              
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    );

  const data =
    await response.json();

  if (!data?.profile) return;

  setBio(
    data.profile.bio || ""
  );

  setLocation(
    data.profile.location || ""
  );

  setHeadline(
    data.profile.headline || ""
  );

  setCareerGoal(
    data.profile.careerGoal || ""
  );

  setInterests(
    data.profile.interests || ""
  );

  setSkills(
    data.profile.skills || ""
  );

  setExperienceLevel(
    data.profile
      .experienceLevel || ""
  );

  setFaithBased(
    data.profile
      .faithBased || false
  );

  setLinkedinUrl(
    data.profile
      .linkedinUrl || ""
  );

  setGithubUrl(
    data.profile
      .githubUrl || ""
  );

  setPortfolioUrl(
    data.profile
      .portfolioUrl || ""
  );

  setProfileImage(
    data.profile
      .profileImage || ""
  );

  setBannerImage(
  data.profile
    .bannerImage || ""
);

  setAvailabilityStatus(
    data.profile
      .availabilityStatus ||
      "Open"
  );
}

loadProfile();


}, []
);


async function saveProfile() {
  const storedUser =
    localStorage.getItem(
      "connectsphere_user"
    );

  if (!storedUser) return;

  const user =
    JSON.parse(storedUser);

  setLoading(true);

  try {
    const response =
      await fetch(
        "/api/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user.id,

            bio,
            location,
            headline,

            careerGoal,
            interests,
            skills,

            experienceLevel,

            faithBased,

            linkedinUrl,
            githubUrl,
            portfolioUrl,

            profileImage,
            bannerImage,

            availabilityStatus,
          }),
        }
      );

    const data =
      await response.json();

    if (data.success) {

  console.log(
    "PROFILE SAVED",
    data.profile
  );

  localStorage.setItem(
        "connectsphere_user",
        JSON.stringify({
          ...user,
          profile: data.profile,
        })
      );

      alert(
        "Profile updated successfully"
      );

      window.location.reload();
    } else {
      alert(
        data.error ||
          "Failed to update profile"
      );
    }
  } catch (error) {
    console.error(error);

    alert(
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
}
return (
  <div className="mt-8 rounded-3xl border border-border bg-zinc-950 p-6">

    <h2 className="text-2xl font-bold">
      Edit Profile
    </h2>

    <div className="mt-5 space-y-4">

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) =>
          setBio(e.target.value)
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Headline"
        value={headline}
        onChange={(e) =>
          setHeadline(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Career Goal"
        value={careerGoal}
        onChange={(e) =>
          setCareerGoal(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Interests"
        value={interests}
        onChange={(e) =>
          setInterests(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Skills"
        value={skills}
        onChange={(e) =>
          setSkills(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <select
        value={experienceLevel}
        onChange={(e) =>
          setExperienceLevel(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      >
        <option value="">
          Select Experience Level
        </option>

        <option value="Beginner">
          Beginner
        </option>

        <option value="Intermediate">
          Intermediate
        </option>

        <option value="Advanced">
          Advanced
        </option>

        <option value="Expert">
          Expert
        </option>
      </select>

      <select
        value={
          availabilityStatus
        }
        onChange={(e) =>
          setAvailabilityStatus(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      >
        <option value="Open">
          Open
        </option>

        <option value="Busy">
          Busy
        </option>

        <option value="Unavailable">
          Unavailable
        </option>
      </select>

      <input
        placeholder="LinkedIn URL"
        value={linkedinUrl}
        onChange={(e) =>
          setLinkedinUrl(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) =>
          setGithubUrl(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <input
        placeholder="Portfolio URL"
        value={portfolioUrl}
        onChange={(e) =>
          setPortfolioUrl(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-700 bg-card p-4"
      />

      <div>
  <label className="mb-2 block text-sm text-muted-foreground">
    Profile Image
  </label>

  <div>
  <label className="mb-2 block text-sm text-muted-foreground">
    Banner Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        async () => {
          const response =
            await fetch(
              "/api/upload",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  image:
                    reader.result,
                }),
              }
            );

          const data =
            await response.json();

          if (data.success) {
            setBannerImage(
              data.url
            );

            alert(
              "Banner uploaded successfully"
            );
          }
        };

      reader.readAsDataURL(
        file
      );
    }}
    className="w-full rounded-xl border border-zinc-700 bg-card p-4"
  />
</div>

  <input
  key={profileImage}
  type="file"
    accept="image/*"
    onChange={async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        async () => {
          const response =
            await fetch(
              "/api/upload",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  image:
                    reader.result,
                }),
              }
            );

          const data =
            await response.json();

      if (data.success) {

  console.log(
    "NEW IMAGE URL:",
    data.url
  );

  setProfileImage(
    data.url
  );

  alert(
    "Image uploaded successfully"
  );

}

 
        };

      reader.readAsDataURL(
        file
      );
    }}
    className="w-full rounded-xl border border-zinc-700 bg-card p-4"
  />

  
</div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={faithBased}
          onChange={() =>
            setFaithBased(
              !faithBased
            )
          }
        />

        <span>
          Faith Based Content
        </span>
      </label>

       
      <button
        onClick={saveProfile}
        disabled={loading}
        className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-black"
      >

        
        {loading
          ? "Saving..."
          : "Save Profile"}
      </button>

    </div>

  </div>
);
}