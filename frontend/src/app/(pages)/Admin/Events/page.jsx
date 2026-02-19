"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Edit3,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Video,
  Building2
} from 'lucide-react';
import axios from 'axios';

const Page = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Mock data for demonstration - replace with actual API call
  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await axios.get('/api/events');
      console.log(res.data.events)
      
      const mockEvents = [
        {
          _id: '699731a13dfa8c1c0ff0f48d',
          title: 'Advanced React Workshop',
          description: 'Deep dive into React hooks, performance optimization, and modern patterns. Perfect for developers looking to level up their skills.',
          event_type: 'workshop',
          start_datetime: '2026-02-19T15:51:00.000Z',
          end_datetime: '2026-02-20T15:51:00.000Z',
          venue: 'Tech Hub Center, Floor 3',
          mode: 'online',
          registration_link: 'https://events.example.com/react-workshop',
          poster_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
          max_participants: 50,
          registration_deadline: '2026-02-18T15:51:00.000Z',
          created_at: '2026-02-19T15:52:01.281Z',
          updated_at: '2026-02-19T15:52:01.281Z',
          current_participants: 32,
          status: 'upcoming'
        },
        {
          _id: '699731a13dfa8c1c0ff0f48e',
          title: 'Design Systems Summit',
          description: 'Join top designers and developers to discuss scalable design systems, component libraries, and design tokens.',
          event_type: 'conference',
          start_datetime: '2026-03-15T09:00:00.000Z',
          end_datetime: '2026-03-17T18:00:00.000Z',
          venue: 'Grand Convention Center',
          mode: 'offline',
          registration_link: 'https://events.example.com/design-summit',
          poster_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
          max_participants: 200,
          registration_deadline: '2026-03-10T23:59:00.000Z',
          created_at: '2026-02-10T10:00:00.000Z',
          updated_at: '2026-02-10T10:00:00.000Z',
          current_participants: 145,
          status: 'upcoming'
        },
        {
          _id: '699731a13dfa8c1c0ff0f48f',
          title: 'Hackathon: AI for Good',
          description: '48-hour hackathon focused on building AI solutions for social impact. Prizes worth $10,000!',
          event_type: 'hackathon',
          start_datetime: '2026-01-20T08:00:00.000Z',
          end_datetime: '2026-01-22T20:00:00.000Z',
          venue: 'Innovation Lab',
          mode: 'hybrid',
          registration_link: 'https://events.example.com/ai-hackathon',
          poster_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
          max_participants: 100,
          registration_deadline: '2026-01-15T23:59:00.000Z',
          created_at: '2026-01-05T08:00:00.000Z',
          updated_at: '2026-01-05T08:00:00.000Z',
          current_participants: 100,
          status: 'completed'
        }
      ];
      
      setEvents(res.data.events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    setDeleteLoading(id);
    try {
      // await fetch(`/api/events/${id}`, { method: 'DELETE' });
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(events.filter(e => e._id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const start = new Date(event.start_datetime);
    const end = new Date(event.end_datetime);
    
    if (now > end) return { label: 'Completed', color: 'bg-gray-100 text-gray-600', icon: CheckCircle2 };
    if (now >= start && now <= end) return { label: 'Live', color: 'bg-green-100 text-green-700', icon: AlertCircle };
    if (event.current_participants >= event.max_participants) return { label: 'Full', color: 'bg-red-100 text-red-700', icon: XCircle };
    return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700', icon: Clock };
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || event.event_type === filterType;
    const matchesMode = filterMode === 'all' || event.mode === filterMode;
    return matchesSearch && matchesType && matchesMode;
  });

  const eventTypes = ['all', ...new Set(events.map(e => e.event_type))];
  const eventModes = ['all', ...new Set(events.map(e => e.mode))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-12 bg-gray-200 rounded-2xl animate-pulse w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recent Events</h1>
            <p className="text-gray-500 mt-1">Manage and organize your upcoming events</p>
          </div>
          <Link href="/Admin/Events/new">
            <button className="group flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-6 py-3.5 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 active:scale-95">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create New Event
            </button>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer font-medium text-gray-700"
              >
                <option value="all">All Types</option>
                {eventTypes.filter(t => t !== 'all').map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer font-medium text-gray-700"
              >
                <option value="all">All Modes</option>
                {eventModes.filter(m => m !== 'all').map(mode => (
                  <option key={mode} value={mode}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Events', value: events.length, color: 'bg-blue-50 text-blue-600' },
            { label: 'Upcoming', value: events.filter(e => new Date(e.start_datetime) > new Date()).length, color: 'bg-green-50 text-green-600' },
            { label: 'Live Now', value: events.filter(e => {
              const now = new Date();
              return now >= new Date(e.start_datetime) && now <= new Date(e.end_datetime);
            }).length, color: 'bg-purple-50 text-purple-600' },
            { label: 'Completed', value: events.filter(e => new Date(e.end_datetime) < new Date()).length, color: 'bg-gray-100 text-gray-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`inline-flex p-2 rounded-xl ${stat.color} mb-3`}>
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {setSearchQuery(''); setFilterType('all'); setFilterMode('all');}}
              className="text-gray-900 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const status = getEventStatus(event);
              const StatusIcon = status.icon;
              const isFull = event.current_participants >= event.max_participants;
              const registrationProgress = (event.current_participants / event.max_participants) * 100;
              
              return (
                <div 
                  key={event._id} 
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.poster_url} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.color} backdrop-blur-sm bg-opacity-90`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </div>
                    
                    {/* Mode Badge */}
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-700 backdrop-blur-sm">
                      {event.mode === 'online' ? <Video className="w-3.5 h-3.5" /> : 
                       event.mode === 'offline' ? <Building2 className="w-3.5 h-3.5" /> : 
                       <MapPin className="w-3.5 h-3.5" />}
                      {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
                    </div>

                    {/* Event Type */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                        {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-start gap-3 text-sm">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {formatDate(event.start_datetime)}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          to {formatDate(event.end_datetime)}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <p className="text-gray-700 font-medium line-clamp-1">{event.venue}</p>
                    </div>

                    {/* Registration Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">
                            {event.current_participants || 0} / {event.max_participants} registered
                          </span>
                        </div>
                        {isFull && (
                          <span className="text-xs font-semibold text-red-600">Full</span>
                        )}
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-gray-900'}`}
                          style={{ width: `${Math.min(registrationProgress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">
                      <Clock className="w-4 h-4" />
                      <span>Registration closes: {formatDate(event.registration_deadline)}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <a 
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Event
                      </a>
                      
                      <button 
                        onClick={() => router.push(`/Admin/Events/edit/${event._id}`)}
                        className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
                        title="Edit"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      
                      <button 
                        onClick={() => handleDelete(event._id)}
                        disabled={deleteLoading === event._id}
                        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95 disabled:opacity-50"
                        title="Delete"
                      >
                        {deleteLoading === event._id ? (
                          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;