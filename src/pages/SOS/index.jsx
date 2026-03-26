/**
 * @file index.jsx (SOS Page)
 * @description Critical page for emergency alerts and help lines.
 * 
 * WHY THIS FILE EXISTS:
 * Ensures passenger safety by providing quick access to emergency services.
 * 
 * WHAT PROBLEM IT SOLVES:
 * - Emergency UI cards for instant dial.
 * - Incident reporting form to submit exact location details to authorities via `sosService`.
 * 
 * WHAT WILL BREAK IF REMOVED:
 * The app will fail to provide safety requirements mandated for railway apps.
 */

import { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PhoneCall, ShieldAlert, HeartPulse, CheckCircle } from 'lucide-react';
import { sosService } from '../../services/sosService';

export default function SOS() {
  const [formData, setFormData] = useState({ trainNo: '', coach: '', type: 'Medical', desc: '' });
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await sosService.submitEmergency(formData);
      setSuccessStatus(resp.refId);
    } finally {
      setLoading(false);
    }
  };

  const emergencyContacts = [
    { title: 'Railway Police (RPF)', number: '139', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Medical Emergency', number: '108', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Women Helpline', number: '1091', icon: PhoneCall, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' }
  ];

  return (
    <SectionWrapper 
      title="SOS Emergency" 
      description="Report severe issues or contact help lines immediately."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {emergencyContacts.map((contact, idx) => (
          <Card key={idx} className="border-slate-100 hover:-translate-y-1 transition-transform cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${contact.bg} border border-slate-100`}>
                  <contact.icon size={28} className={contact.color} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{contact.title}</h3>
                  <p className="text-2xl font-black text-slate-900 tracking-wider font-mono mt-1">{contact.number}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-red-100 shadow-md shadow-red-500/5">
        <CardHeader className="bg-red-50/50 border-red-100">
          <CardTitle className="text-red-800 flex items-center gap-2">
            <ShieldAlert size={20} className="text-red-600" />
            Report an Incident
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {successStatus ? (
            <div className="text-center py-10">
              <CheckCircle size={64} className="mx-auto text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Emergency Reported</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-6">Authorities have been notified and help is on the way. Your reference ID is <span className="font-mono font-bold">{successStatus}</span>.</p>
              <Button onClick={() => setSuccessStatus(null)} variant="secondary">Report Another Incident</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Train Number" placeholder="e.g. 12952" value={formData.trainNo} onChange={e => setFormData(f => ({...f, trainNo: e.target.value}))} />
                <Input label="Coach & Seat" placeholder="e.g. B4, Seat 45" value={formData.coach} onChange={e => setFormData(f => ({...f, coach: e.target.value}))} />
              </div>
              
              <div className="flex flex-col space-y-2 w-full">
                <label className="text-sm font-semibold text-slate-700">Emergency Type</label>
                <select 
                  className="w-full px-4 py-3 bg-[#f5f7fb] border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 hover:border-slate-300 transition-all font-medium"
                  value={formData.type}
                  onChange={e => setFormData(f => ({...f, type: e.target.value}))}
                >
                  <option>Medical Emergency</option>
                  <option>Security / Harassment</option>
                  <option>Fire / Technical Issue</option>
                  <option>Cleanliness Issue</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 w-full">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-[#f5f7fb] border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 hover:border-slate-300 transition-all placeholder:text-slate-400"
                  placeholder="Provide precise details of the situation..."
                  value={formData.desc}
                  onChange={e => setFormData(f => ({...f, desc: e.target.value}))}
                />
              </div>

              <Button variant="danger" className="w-full md:w-auto px-10 py-3 text-lg" onClick={handleSubmit} isLoading={loading}>
                Submit Emergency Alert
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
