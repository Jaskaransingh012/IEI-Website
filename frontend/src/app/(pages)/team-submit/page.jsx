"use client";

import { useState } from "react";

export default function TeamSubmit() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    team: "",
    bio: "",
    email: "",
    linkedin: "",
    github: "",
    password: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.TEAM_SUBMIT_PASSWORD)

    if (form.password !== "jaskaran@123") {
      setMessage("Wrong password");
      return;
    }

    if (!imageFile) {
      setMessage("Image is required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 1️⃣ Upload Image FIRST
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      const imageUrl = await new Promise((resolve) => {
        reader.onloadend = async () => {
          const res = await fetch("/api/upload-team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: reader.result })
          });

          const data = await res.json();
          resolve(data.url);
        };
      });

      // 2️⃣ Save full data to DB
      const { password, ...data } = form;

      const res = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, image: imageUrl })
      });

      if (res.ok) {
        setMessage("Submitted Successfully");
        setForm({
          name: "",
          role: "",
          team: "",
          bio: "",
          email: "",
          linkedin: "",
          github: "",
          password: ""
        });
        setImageFile(null);
      } else {
        setMessage("Something went wrong");
      }

    } catch (err) {
      setMessage("Error submitting form");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative">

      {/* Full Screen Loader */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-xl border-2 border-black rounded-2xl p-10 shadow-xl">

        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Team Submission
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />

          <Select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Core">Core</option>
            <option value="Head">Head</option>
            <option value="Executive">Executive</option>
          </Select>

          <Select name="team" value={form.team} onChange={handleChange} required>
            <option value="">Select Team</option>
            <option value="Organization">Organization</option>
            <option value="Web">Web</option>
            <option value="Marketing">Marketing</option>
            <option value="Discipline">Discipline</option>
            <option value="Content">Content</option>
            <option value="Media">Media</option>
          </Select>

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={form.bio}
            onChange={handleChange}
            required
            className="w-full border border-black rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
          />

          <Input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          <Input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} required />
          <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} required />

          {/* Image Upload (No instant upload now) */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Upload Profile Picture *
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-black"
            />
          </div>

          <Input
            type="password"
            name="password"
            placeholder="Access Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p className="text-center text-black text-sm">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}

function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      {...props}
      className="w-full border border-black rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full border border-black rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
    >
      {children}
    </select>
  );
}