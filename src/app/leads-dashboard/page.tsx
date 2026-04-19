'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';

import { firebaseDB } from '@/services/Firebase.service';

// ─── Types ────────────────────────────────────────────────────────────────────
type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'rejected';

interface Lead {
  id: string;
  email: string;
  message: string;
  contactNo: string | null;
  submittedAt: { seconds: number } | null;
  status: LeadStatus;
  ipAddress: string | null;
  location: {
    city?: string;
    country?: string;
    region?: string;
  } | null;
  adminNote?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; bg: string; dot: string }
> = {
  new: { label: 'New', color: '#2563eb', bg: '#eff6ff', dot: '#3b82f6' },
  contacted: {
    label: 'Contacted',
    color: '#7c3aed',
    bg: '#f5f3ff',
    dot: '#8b5cf6',
  },
  qualified: {
    label: 'Qualified',
    color: '#059669',
    bg: '#ecfdf5',
    dot: '#10b981',
  },
  closed: { label: 'Closed', color: '#d97706', bg: '#fffbeb', dot: '#f59e0b' },
  rejected: {
    label: 'Rejected',
    color: '#dc2626',
    bg: '#fef2f2',
    dot: '#ef4444',
  },
};

const STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return '—';
  const d = new Date(ts.seconds * 1000);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(ts: { seconds: number } | null) {
  if (!ts) return '';
  const d = new Date(ts.seconds * 1000);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function timeAgo(ts: { seconds: number } | null) {
  if (!ts) return '—';
  const diff = Math.floor((Date.now() - ts.seconds * 1000) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub?: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '20px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        borderTop: `3px solid ${accent}`,
        minWidth: 140,
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: '#6b7280',
          fontWeight: 500,
          marginBottom: 6,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#111827',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: cfg.bg,
        color: cfg.color,
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: cfg.dot,
          display: 'inline-block',
        }}
      />
      {cfg.label}
    </span>
  );
}

function Modal({
  lead,
  onClose,
  onSave,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (id: string, status: LeadStatus, note: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [note, setNote] = useState(lead.adminNote || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(lead.id, status, note);
    setSaving(false);
    onClose();
  }

  async function handleDelete() {
    setDeleting(true);
    await onDelete(lead.id);
    setDeleting(false);
    onClose();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            padding: '20px 24px',
            color: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.75,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                Lead Details
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{lead.email}</div>
              {lead.contactNo && (
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>
                  {lead.contactNo}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: 8,
                width: 32,
                height: 32,
                cursor: 'pointer',
                color: '#fff',
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 12,
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            <span>
              📅 {formatDate(lead.submittedAt)} · {formatTime(lead.submittedAt)}
            </span>
            {lead.location?.city && (
              <span>
                📍 {lead.location.city}, {lead.location.country}
              </span>
            )}
            {lead.ipAddress && <span>🌐 {lead.ipAddress}</span>}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Message */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Message
            </div>
            <div
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                padding: '12px 14px',
                fontSize: 14,
                color: '#374151',
                lineHeight: 1.6,
              }}
            >
              {lead.message}
            </div>
          </div>

          {/* Status */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Update Status
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                const active = status === s;
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: active
                        ? `2px solid ${cfg.color}`
                        : '2px solid #e5e7eb',
                      background: active ? cfg.bg : '#fff',
                      color: active ? cfg.color : '#6b7280',
                      transition: 'all 0.15s',
                    }}
                  >
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6b7280',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Admin Note
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a private note about this lead..."
              rows={3}
              className='bg-gray-50 text-black'
              style={{
                width: '100%',
                resize: 'none',
                border: '1.5px solid #e5e7eb',
                borderRadius: 10,
                padding: '10px 12px',
                fontSize: 14,
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 4,
            }}
          >
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1.5px solid #fecaca',
                  borderRadius: 10,
                  padding: '9px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                🗑 Delete Lead
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span
                  style={{ fontSize: 13, color: '#dc2626', fontWeight: 500 }}
                >
                  Are you sure?
                </span>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  style={{
                    background: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '7px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {deleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: 8,
                    padding: '7px 14px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 22px',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59,130,246,0.35)',
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  async function fetchLeads() {
    const leadsRef = collection(firebaseDB, 'Portfolio-leads');
    const q = query(leadsRef, orderBy('submittedAt', 'desc'));
    const snap = await getDocs(q);
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Lead);
    setLeads(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchLeads();
  }, []);

  async function handleSave(id: string, status: LeadStatus, adminNote: string) {
    const ref = doc(firebaseDB, 'Portfolio-leads', id);
    await updateDoc(ref, { status, adminNote });
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, adminNote } : l))
    );
  }

  async function handleDelete(id: string) {
    await deleteDoc(doc(firebaseDB, 'Portfolio-leads', id));
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  // Stats
  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const qualified = leads.filter((l) => l.status === 'qualified').length;
  const closed = leads.filter((l) => l.status === 'closed').length;

  // Filter + Search
  const filtered = leads.filter((l) => {
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    const matchSearch =
      !search ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.message.toLowerCase().includes(search.toLowerCase()) ||
      l.contactNo?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div
      className="bg-gray-50"
      style={{
        minHeight: '100vh',
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      }}
    >
      {/* Top Nav */}
      <div
        className="mx-auto max-w-6xl rounded-2xl px-2 pt-3 shadow-md lg:px-0"
        style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 32px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 10,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            A
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>
            Portfolio Admin
          </span>
          <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 4 }}>
            / Leads
          </span>
        </div>
        <button
          onClick={fetchLeads}
          style={{
            background: '#f1f5f9',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '7px 14px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            color: '#374151',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ↻ Refresh
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#111827',
              margin: 0,
            }}
          >
            Leads Dashboard
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            All contact form submissions from your portfolio
          </p>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 28,
            flexWrap: 'wrap',
          }}
        >
          <StatCard
            label="Total Leads"
            value={total}
            sub="All time"
            accent="#3b82f6"
          />
          <StatCard
            label="New"
            value={newLeads}
            sub="Awaiting action"
            accent="#6366f1"
          />
          <StatCard
            label="Qualified"
            value={qualified}
            sub="High intent"
            accent="#10b981"
          />
          <StatCard
            label="Closed"
            value={closed}
            sub="Converted"
            accent="#f59e0b"
          />
        </div>

        {/* Filters + Search */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            padding: '16px 20px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <span
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                fontSize: 15,
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email, message, phone..."
              style={{
                width: '100%',
                border: '1.5px solid #e5e7eb',
                borderRadius: 10,
                padding: '9px 12px 9px 36px',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              className="bg-gray-50 text-black"
            />
          </div>

          {/* Status filter pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['all', ...STATUSES] as const).map((s) => {
              const active = filterStatus === s;
              const cfg = s !== 'all' ? STATUS_CONFIG[s] : null;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: active
                      ? `2px solid ${cfg?.color ?? '#1e40af'}`
                      : '2px solid #e5e7eb',
                    background: active ? (cfg?.bg ?? '#eff6ff') : '#fff',
                    color: active ? (cfg?.color ?? '#1e40af') : '#6b7280',
                    transition: 'all 0.15s',
                  }}
                >
                  {s === 'all'
                    ? `All (${total})`
                    : `${STATUS_CONFIG[s].label} (${leads.filter((l) => l.status === s).length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            overflow: 'hidden',
          }}
        >
          {loading ? (
            <div
              style={{
                padding: 64,
                textAlign: 'center',
                color: '#9ca3af',
                fontSize: 15,
              }}
            >
              Loading leads...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 64, textAlign: 'center', color: '#9ca3af' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                No leads found
              </div>
              <div style={{ fontSize: 13, marginTop: 4 }}>
                Try adjusting your filters
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: '#f9fafb',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    {[
                      '#',
                      'Contact',
                      'Message',
                      'Location',
                      'Status',
                      'Submitted',
                      'Actions',
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '13px 16px',
                          textAlign: 'left',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#6b7280',
                          textTransform: 'uppercase',
                          letterSpacing: 0.6,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr
                      key={lead.id}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        transition: 'background 0.1s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = '#f9fafb')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'transparent')
                      }
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* # */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9ca3af',
                          fontWeight: 600,
                          minWidth: 40,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </td>

                      {/* Contact */}
                      <td style={{ padding: '14px 16px', minWidth: 200 }}>
                        <div style={{ fontWeight: 600, color: '#111827' }}>
                          {lead.email}
                        </div>
                        {lead.contactNo && (
                          <div
                            style={{
                              fontSize: 12,
                              color: '#6b7280',
                              marginTop: 2,
                            }}
                          >
                            {lead.contactNo}
                          </div>
                        )}
                      </td>

                      {/* Message */}
                      <td style={{ padding: '14px 16px', maxWidth: 260 }}>
                        <div
                          style={{
                            color: '#374151',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: 1.5,
                          }}
                        >
                          {lead.message}
                        </div>
                        {lead.adminNote && (
                          <div
                            style={{
                              fontSize: 11,
                              color: '#7c3aed',
                              marginTop: 4,
                              fontStyle: 'italic',
                            }}
                          >
                            📝{' '}
                            {lead.adminNote.length > 50
                              ? lead.adminNote.slice(0, 50) + '...'
                              : lead.adminNote}
                          </div>
                        )}
                      </td>

                      {/* Location */}
                      <td style={{ padding: '14px 16px', minWidth: 130 }}>
                        {lead.location?.city ? (
                          <div>
                            <div style={{ fontWeight: 500, color: '#374151' }}>
                              {lead.location.city}
                            </div>
                            <div style={{ fontSize: 12, color: '#9ca3af' }}>
                              {lead.location.country}
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: '#d1d5db' }}>—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        <StatusBadge status={lead.status} />
                      </td>

                      {/* Submitted */}
                      <td style={{ padding: '14px 16px', minWidth: 110 }}>
                        <div style={{ fontWeight: 500, color: '#374151' }}>
                          {formatDate(lead.submittedAt)}
                        </div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>
                          {timeAgo(lead.submittedAt)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td
                        style={{ padding: '14px 16px' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            style={{
                              background: '#eff6ff',
                              color: '#2563eb',
                              border: 'none',
                              borderRadius: 7,
                              padding: '6px 12px',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm('Delete this lead?'))
                                await handleDelete(lead.id);
                            }}
                            style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              border: 'none',
                              borderRadius: 7,
                              padding: '6px 10px',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!loading && filtered.length > 0 && (
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #f3f4f6',
                fontSize: 13,
                color: '#9ca3af',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>
                Showing{' '}
                <strong style={{ color: '#374151' }}>{filtered.length}</strong>{' '}
                of <strong style={{ color: '#374151' }}>{total}</strong> leads
              </span>
              <span>Click any row to view details & take action</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedLead && (
        <Modal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
