import React, { useState } from 'react';
import {
  X,
  Users,
  CheckCircle2,
  XCircle,
  Utensils,
  Download,
  Copy,
  Plus,
  Search,
  Check,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { RSVPRecord } from '../types';

interface RSVPTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RSVPRecord[];
  onDeleteRSVP: (id: string) => void;
  onAddManualRSVP: (record: Omit<RSVPRecord, 'id' | 'submittedAt'>) => void;
}

export const RSVPTrackerModal: React.FC<RSVPTrackerModalProps> = ({
  isOpen,
  onClose,
  rsvps,
  onDeleteRSVP,
  onAddManualRSVP,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'declined'>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual Add Form State
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualAttendance, setManualAttendance] = useState<'attending' | 'declined'>('attending');
  const [manualCount, setManualCount] = useState(1);
  const [manualDietary, setManualDietary] = useState<RSVPRecord['dietaryPreference']>('Pure Vegetarian');
  const [manualMessage, setManualMessage] = useState('');

  if (!isOpen) return null;

  // Analytics
  const attendingList = rsvps.filter((r) => r.attendance === 'attending');
  const declinedList = rsvps.filter((r) => r.attendance === 'declined');
  const totalHeadcount = attendingList.reduce((sum, r) => sum + (r.guestCount || 1), 0);

  // Dietary counts
  const dietaryCounts = attendingList.reduce(
    (acc, curr) => {
      const pref = curr.dietaryPreference || 'No Restrictions';
      acc[pref] = (acc[pref] || 0) + curr.guestCount;
      return acc;
    },
    {} as Record<string, number>
  );

  // Filtered responses
  const filteredRSVPs = rsvps.filter((item) => {
    const matchesQuery =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);

    const matchesStatus =
      filterStatus === 'all' ? true : item.attendance === filterStatus;

    return matchesQuery && matchesStatus;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Attendance',
      'Headcount',
      'Accompanying Guests',
      'Email',
      'Phone',
      'Dietary Preference',
      'Message',
      'Submitted At',
    ];

    const rows = rsvps.map((r) => [
      `"${r.fullName.replace(/"/g, '""')}"`,
      r.attendance,
      r.guestCount,
      `"${(r.guestNames || '').replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.dietaryPreference}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `engagement_rsvp_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Summary for Family WhatsApp
  const handleCopySummary = () => {
    const text = `⚜️ *Engagement Ceremony RSVP Summary* ⚜️\n` +
      `• Total RSVPs: ${rsvps.length}\n` +
      `• Confirmed Attending Parties: ${attendingList.length}\n` +
      `• Total Guests Attending: ${totalHeadcount}\n` +
      `• Declined: ${declinedList.length}\n\n` +
      `🍽️ *Dietary Breakdown:*\n` +
      Object.entries(dietaryCounts)
        .map(([k, v]) => `  - ${k}: ${v} guests`)
        .join('\n') +
      `\n\nAttending Guest List:\n` +
      attendingList
        .map((g, i) => `${i + 1}. ${g.fullName} (${g.guestCount} pax) - ${g.dietaryPreference}`)
        .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    onAddManualRSVP({
      fullName: manualName.trim(),
      email: manualEmail.trim() || 'phone-rsvp@family.internal',
      phone: manualPhone.trim() || 'Confirmed via call',
      attendance: manualAttendance,
      guestCount: manualAttendance === 'attending' ? manualCount : 0,
      guestNames: '',
      dietaryPreference: manualDietary,
      message: manualMessage.trim() || 'RSVP added manually by host family',
    });

    // Reset
    setManualName('');
    setManualPhone('');
    setManualEmail('');
    setShowAddForm(false);
  };

  return (
    <div
      id="rsvp-tracker-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] text-[#2B2317] rounded-3xl border border-[#C5A059] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#271E14] text-[#FFF7EB] border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B2C1C] border border-[#C5A059] flex items-center justify-center text-[#F5D88A]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFE6AD]">
                  RSVP Tracking Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/30 text-[#FFE7B3] text-[10px] font-cinzel font-semibold">
                  Host View
                </span>
              </div>
              <p className="text-xs text-[#DEC8A2]">
                Real-time guest tracking &amp; banquet catering counts for the engagement ceremony
              </p>
            </div>
          </div>

          <button
            id="close-rsvp-tracker-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#DEC8A2] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Key Metric Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Headcount */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-sm flex flex-col">
              <span className="text-[10px] font-cinzel font-semibold uppercase tracking-widest text-[#8C6D32]">
                Total Guests Attending
              </span>
              <span className="text-3xl font-cinzel font-bold text-[#2C1F10] mt-1">
                {totalHeadcount}
              </span>
              <span className="text-[11px] text-[#7C5A23] mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {attendingList.length} confirmed parties
              </span>
            </div>

            {/* Total RSVPs */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-sm flex flex-col">
              <span className="text-[10px] font-cinzel font-semibold uppercase tracking-widest text-[#8C6D32]">
                Total Responses
              </span>
              <span className="text-3xl font-cinzel font-bold text-[#2C1F10] mt-1">
                {rsvps.length}
              </span>
              <span className="text-[11px] text-[#7C5A23] mt-0.5">
                From invited guests
              </span>
            </div>

            {/* Declined */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/35 shadow-sm flex flex-col">
              <span className="text-[10px] font-cinzel font-semibold uppercase tracking-widest text-[#8C6D32]">
                Declined
              </span>
              <span className="text-3xl font-cinzel font-bold text-[#63513C] mt-1">
                {declinedList.length}
              </span>
              <span className="text-[11px] text-[#8C755E] mt-0.5 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                Sending warm wishes
              </span>
            </div>

            {/* Catering Breakdown */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5EFE6] to-[#EAE0D0] border border-[#D4AF37]/50 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-cinzel font-semibold uppercase tracking-widest text-[#8C6D32]">
                <Utensils className="w-3.5 h-3.5" />
                <span>Catering Prep</span>
              </div>
              <div className="space-y-0.5 mt-2 text-xs font-medium text-[#42311C]">
                <div className="flex justify-between">
                  <span>Pure Veg (Shakahari):</span>
                  <span className="font-bold">{dietaryCounts['Pure Vegetarian'] || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jain Veg:</span>
                  <span className="font-bold">{dietaryCounts['Jain Vegetarian'] || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard / Vegan:</span>
                  <span className="font-bold">
                    {(dietaryCounts['Vegetarian'] || 0) + (dietaryCounts['Vegan'] || 0) + (dietaryCounts['No Restrictions'] || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Search & Filter */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C6D32] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guest by name, email, phone..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D4AF37]/40 text-xs focus:ring-2 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'attending' | 'declined')}
                className="px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#332617] font-cinzel focus:outline-none"
              >
                <option value="all">All Guests</option>
                <option value="attending">Attending</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#C5A059] text-[#7C5A23] hover:bg-[#F3ECE0] text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Close Form' : 'Add Guest'}</span>
              </button>

              <button
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#C5A059] text-[#7C5A23] hover:bg-[#F3ECE0] text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy for WhatsApp</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-[#C5A059] text-white hover:bg-[#A8823B] text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Add Manual Guest Form Dropdown */}
          {showAddForm && (
            <form
              onSubmit={handleCreateManual}
              className="p-4 rounded-2xl bg-white border-2 border-[#C5A059]/60 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#E8DFD0] pb-2">
                <span className="font-cinzel text-xs font-bold text-[#7C5A23] uppercase">
                  Add Guest Entry (Host Override / Phone RSVP)
                </span>
                <span className="text-[10px] text-[#A6874E]">Direct Host Entry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Guest Full Name *"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                />
                <input
                  type="text"
                  placeholder="Phone or Notes"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={manualAttendance}
                  onChange={(e) => setManualAttendance(e.target.value as 'attending' | 'declined')}
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                >
                  <option value="attending">Joyfully Accepts</option>
                  <option value="declined">Declined</option>
                </select>

                <input
                  type="number"
                  min="1"
                  max="10"
                  value={manualCount}
                  onChange={(e) => setManualCount(Number(e.target.value))}
                  placeholder="Headcount"
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                />

                <select
                  value={manualDietary}
                  onChange={(e) => setManualDietary(e.target.value as RSVPRecord['dietaryPreference'])}
                  className="px-3 py-2 rounded-lg border border-[#D4AF37]/40 text-xs"
                >
                  <option value="Pure Vegetarian">Pure Vegetarian</option>
                  <option value="Jain Vegetarian">Jain Vegetarian</option>
                  <option value="Vegetarian">Standard Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="No Restrictions">No Restrictions</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-[#7C5A23] font-cinzel hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#C5A059] text-white text-xs font-cinzel font-semibold hover:bg-[#A8823B]"
                >
                  Save Guest RSVP
                </button>
              </div>
            </form>
          )}

          {/* Guest List Records Table */}
          <div className="rounded-2xl border border-[#D4AF37]/40 overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6EFE6] border-b border-[#D4AF37]/30 text-[#6B5539] font-cinzel uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Guest Name</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center">Headcount</th>
                    <th className="py-3 px-3">Dietary</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-4">Blessing Message</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DC] text-[#332617]">
                  {filteredRSVPs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-[#8C755E] italic">
                        No RSVP records found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredRSVPs.map((guest) => (
                      <tr key={guest.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                        {/* Name */}
                        <td className="py-3 px-4 font-semibold text-[#24190C]">
                          <div>{guest.fullName}</div>
                          {guest.guestNames && (
                            <div className="text-[10px] text-[#8C755E] font-normal">
                              Plus: {guest.guestNames}
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3">
                          {guest.attendance === 'attending' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3" />
                              Attending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                              <XCircle className="w-3 h-3" />
                              Declined
                            </span>
                          )}
                        </td>

                        {/* Headcount */}
                        <td className="py-3 px-3 text-center font-bold">
                          {guest.attendance === 'attending' ? guest.guestCount : '—'}
                        </td>

                        {/* Dietary */}
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-[#F4EDE2] text-[#695239] text-[10px] font-medium border border-[#D4AF37]/30">
                            {guest.dietaryPreference}
                          </span>
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-3 text-[11px] text-[#5C4830]">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#A6874E]" />
                            <span>{guest.email}</span>
                          </div>
                          {guest.phone && (
                            <div className="flex items-center gap-1 text-[10px] text-[#8C755E] mt-0.5">
                              <Phone className="w-2.5 h-2.5 text-[#A6874E]" />
                              <span>{guest.phone}</span>
                            </div>
                          )}
                        </td>

                        {/* Message */}
                        <td className="py-3 px-4 max-w-[200px] truncate text-[11px] text-[#5C4830] italic" title={guest.message}>
                          {guest.message ? `"${guest.message}"` : <span className="text-[#B3A08E]">—</span>}
                        </td>

                        {/* Action */}
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => onDeleteRSVP(guest.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove RSVP Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#D4AF37]/30 flex items-center justify-between text-xs text-[#7C5A23]">
          <span className="font-cinzel text-[11px]">
            Showing {filteredRSVPs.length} of {rsvps.length} total entries
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2C1F10] text-[#FFF6E3] font-cinzel font-semibold text-xs hover:bg-[#42311C] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
