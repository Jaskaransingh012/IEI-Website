"use client";

import { useState } from "react";
import axios from "axios";

export default function EventManagerPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_type: "workshop",
    start_datetime: "",
    end_datetime: "",
    venue: "",
    mode: "online",
    registration_link: "",
    poster_url: "",
    max_participants: "",
    registration_deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/events/upload", form);
      alert("Event created successfully!");
      setForm({
        title: "",
        description: "",
        event_type: "workshop",
        start_datetime: "",
        end_datetime: "",
        venue: "",
        mode: "online",
        registration_link: "",
        poster_url: "",
        max_participants: "",
        registration_deadline: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-2xl border-2 border-black rounded-xl p-8 relative">

        {/* Sketchy Inner Border */}
        <div className="absolute inset-2 border border-dashed border-black rounded-lg pointer-events-none"></div>

        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block mb-1 font-semibold">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="Event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="Event description"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block mb-1 font-semibold">Event Type *</label>
            <select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
            >
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="seminar">Seminar</option>
              <option value="competition">Competition</option>
              <option value="webinar">Webinar</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>

          {/* Mode */}
          <div>
            <label className="block mb-1 font-semibold">Mode *</label>
            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Date Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Start Date & Time *</label>
              <input
                type="datetime-local"
                name="start_datetime"
                value={form.start_datetime}
                onChange={handleChange}
                required
                className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">End Date & Time</label>
              <input
                type="datetime-local"
                name="end_datetime"
                value={form.end_datetime}
                onChange={handleChange}
                className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block mb-1 font-semibold">Venue</label>
            <input
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="Auditorium / Online"
            />
          </div>

          {/* Registration Link */}
          <div>
            <label className="block mb-1 font-semibold">Registration Link</label>
            <input
              name="registration_link"
              value={form.registration_link}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="https://..."
            />
          </div>

          {/* Poster URL */}
          <div>
            <label className="block mb-1 font-semibold">Poster URL</label>
            <input
              name="poster_url"
              value={form.poster_url}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="Image link"
            />
          </div>

          {/* Max Participants */}
          <div>
            <label className="block mb-1 font-semibold">Max Participants</label>
            <input
              type="number"
              name="max_participants"
              value={form.max_participants}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
              placeholder="100"
            />
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block mb-1 font-semibold">Registration Deadline</label>
            <input
              type="datetime-local"
              name="registration_deadline"
              value={form.registration_deadline}
              onChange={handleChange}
              className="w-full border-2 border-black px-3 py-2 bg-transparent focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 py-2 border-2 border-black text-lg hover:bg-black hover:text-white transition-all"
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
}
