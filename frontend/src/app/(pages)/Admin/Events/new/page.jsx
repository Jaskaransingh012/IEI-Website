"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Link as LinkIcon,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

const NewEventPage = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'workshop',
    start_datetime: '',
    end_datetime: '',
    venue: '',
    mode: 'online',
    registration_link: '',
    poster_url: '',
    max_participants: '',
    registration_deadline: ''
  });

  const eventTypes = ['workshop', 'conference', 'hackathon', 'seminar', 'webinar', 'meetup', 'other'];
  const modes = ['online', 'offline', 'hybrid'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.description.trim()) return 'Description is required';
    if (!formData.start_datetime) return 'Start date is required';
    if (!formData.end_datetime) return 'End date is required';
    if (new Date(formData.start_datetime) >= new Date(formData.end_datetime)) {
      return 'End date must be after start date';
    }
    if (!formData.venue.trim()) return 'Venue is required';
    if (!formData.max_participants || formData.max_participants < 1) {
      return 'Valid max participants is required';
    }
    if (!formData.registration_deadline) return 'Registration deadline is required';
    if (new Date(formData.registration_deadline) >= new Date(formData.start_datetime)) {
      return 'Registration deadline must be before start date';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/events/upload", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          max_participants: parseInt(formData.max_participants)
        })
      });

      if (!res.ok) {
        throw new Error('Failed to create event');
      }

      setSuccess('Event created successfully!');
      setTimeout(() => {
        router.push('/Admin/Events');
      }, 1500);
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/Admin/Events"
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Create New Event</h1>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-gray-900/20"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
            <button onClick={() => setError('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{success}</p>
            <button onClick={() => setSuccess('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all resize-none"
                  placeholder="Describe your event..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[ 'workshop', 'hackathon', 'seminar', 'competition', 'webinar', 'meetup' ].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.event_type === type
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="event_type"
                        value={type}
                        checked={formData.event_type === type}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-medium capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900">Date & Time</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date & Time *
                  </div>
                </label>
                <input
                  type="datetime-local"
                  name="start_datetime"
                  value={formData.start_datetime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date & Time *
                  </div>
                </label>
                <input
                  type="datetime-local"
                  name="end_datetime"
                  value={formData.end_datetime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Registration Deadline *
                  </div>
                </label>
                <input
                  type="datetime-local"
                  name="registration_deadline"
                  value={formData.registration_deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Location & Mode */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900">Location & Mode</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Mode *
                </label>
                <div className="flex gap-3">
                  {modes.map((mode) => (
                    <label
                      key={mode}
                      className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.mode === mode
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value={mode}
                        checked={formData.mode === mode}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="font-medium capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Venue / Location *
                  </div>
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  placeholder={formData.mode === 'online' ? 'Zoom link or platform' : 'Physical address'}
                />
              </div>
            </div>
          </div>

          {/* Registration & Capacity */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900">Registration & Capacity</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Max Participants *
                  </div>
                </label>
                <input
                  type="number"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  placeholder="e.g., 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Registration Link
                  </div>
                </label>
                <input
                  type="url"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-gray-900">Media</h2>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Poster Image URL
                </div>
              </label>
              <input
                type="url"
                name="poster_url"
                value={formData.poster_url}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all mb-4"
                placeholder="https://..."
              />
              
              {formData.poster_url && (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={formData.poster_url}
                    alt="Event poster preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 items-center justify-center text-gray-400">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Invalid image URL</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Link
              href="/Admin/Events"
              className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg shadow-gray-900/20"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventPage;