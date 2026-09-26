import React, { useState } from 'react';
import { X, Edit3, Save, Sparkles } from 'lucide-react';
import { CeremonyDetails } from '../types';

interface EditCeremonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: CeremonyDetails;
  onSave: (updated: CeremonyDetails) => void;
}

export const EditCeremonyModal: React.FC<EditCeremonyModalProps> = ({
  isOpen,
  onClose,
  details,
  onSave,
}) => {
  const [formData, setFormData] = useState<CeremonyDetails>(details);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="edit-ceremony-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#FAF7F2] text-[#2B2317] rounded-3xl border border-[#C5A059] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#271E14] text-[#FFF7EB] border-b border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit3 className="w-5 h-5 text-[#F5D88A]" />
            <h2 className="font-cinzel text-lg font-bold text-[#FFE6AD]">
              Personalize Invitation Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DEC8A2] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <p className="text-[11px] text-[#7C5A23] leading-relaxed">
            Customize the names of your sister, fiancé, parents, ceremony date, and venue to match your engagement ceremony.
          </p>

          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Sister&apos;s Name (Bride) *
              </label>
              <input
                type="text"
                required
                value={formData.brideName}
                onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Bride&apos;s Parents&apos; Names
              </label>
              <input
                type="text"
                value={formData.brideParents}
                onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Fiancé&apos;s Name (Groom) *
              </label>
              <input
                type="text"
                required
                value={formData.groomName}
                onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Groom&apos;s Parents&apos; Names
              </label>
              <input
                type="text"
                value={formData.groomParents}
                onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
          </div>

          {/* Monogram & Ceremony Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Wax Seal Monogram (e.g. &quot;P &amp; A&quot;)
              </label>
              <input
                type="text"
                value={formData.monogram}
                onChange={(e) => setFormData({ ...formData, monogram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
            <div>
              <label className="block font-cinzel font-semibold text-[#5C451D] mb-1">
                Ceremony Title
              </label>
              <input
                type="text"
                value={formData.ceremonyType}
                onChange={(e) => setFormData({ ...formData, ceremonyType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
              />
            </div>
          </div>

          {/* Date Settings for Scratch Card */}
          <div className="p-3 rounded-2xl bg-[#F4EFE6] border border-[#D4AF37]/40 space-y-2">
            <span className="font-cinzel font-semibold text-[#7C5A23] uppercase text-[10px] block">
              Scratch Card Date
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-[#695239]">Day (e.g. 13)</label>
                <input
                  type="text"
                  value={formData.eventDate.day}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventDate: { ...formData.eventDate, day: e.target.value },
                    })
                  }
                  className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#D4AF37]/40 text-xs text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#695239]">Month (e.g. NOVEMBER)</label>
                <input
                  type="text"
                  value={formData.eventDate.month}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventDate: { ...formData.eventDate, month: e.target.value },
                    })
                  }
                  className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#D4AF37]/40 text-xs text-center font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#695239]">Year (e.g. 2026)</label>
                <input
                  type="text"
                  value={formData.eventDate.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventDate: { ...formData.eventDate, year: e.target.value },
                    })
                  }
                  className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#D4AF37]/40 text-xs text-center font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-[#695239] mt-1">Commencing Time</label>
              <input
                type="text"
                value={formData.eventDate.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDate: { ...formData.eventDate, time: e.target.value },
                  })
                }
                className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#D4AF37]/40 text-xs"
              />
            </div>
          </div>

          {/* Venue Info */}
          <div className="space-y-2">
            <label className="block font-cinzel font-semibold text-[#5C451D]">
              Venue &amp; Location
            </label>
            <input
              type="text"
              placeholder="Venue Name"
              value={formData.venue.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: { ...formData.venue, name: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
            />
            <input
              type="text"
              placeholder="Address / Street"
              value={formData.venue.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: { ...formData.venue, address: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
            />
            <input
              type="text"
              placeholder="City, State"
              value={formData.venue.cityState}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: { ...formData.venue, cityState: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
            />
            <input
              type="url"
              placeholder="Google Maps Location Link"
              value={formData.venue.mapUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  venue: { ...formData.venue, mapUrl: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4AF37]/50 text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-[#D4AF37]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-cinzel text-[#7C5A23] hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#C5A059] text-white font-cinzel font-semibold text-xs hover:bg-[#A8823B] flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
