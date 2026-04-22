/**
 * @file index.jsx (Seat Exchange Page)
 * @description P2P seat swap board — train-based, search-first, theme-aware, animated.
 * Both passengers must be on the same train, so train number is required first.
 */

import { useState, useEffect } from 'react';
import {
  User, RefreshCcw, AlertTriangle, ArrowRightLeft,
  Clock, Info, Search, Train, CheckCircle2, XCircle,
  MessageSquare, Send, ChevronDown, ChevronUp
} from 'lucide-react';

import { seatService } from '../../services/seatService';
import { useAuth } from '../../context/AuthContext';

export default function SeatExchange() {
  const { user } = useAuth();
  const [trainNumber, setTrainNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  /* ── Messaging state ── */
  const [selectedReq, setSelectedReq] = useState(null);
  const [msgText, setMsgText] = useState('');
  const [isSending, setIsSending] = useState(false);

  /* ── Form state ── */
  const [myPnr, setMyPnr] = useState('');
  const [mySeat, setMySeat] = useState('');
  const [myCurrentBerth, setMyCurrentBerth] = useState('Lower Berth');
  const [myTarget, setMyTarget] = useState('Upper Berth');
  const [postSuccess, setPostSuccess] = useState(false);

  const [allRequests, setAllRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [expandedReq, setExpandedReq] = useState(null); // For viewing messages in 'my' tab
  const [reqMessages, setReqMessages] = useState({}); // { requestId: [messages] }

  // Filter requests by train number when searched
  const requests = hasSearched
    ? allRequests.filter(req => req.trainNumber === trainNumber)
    : [];

  const handleSearch = async () => {
    if (!trainNumber.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    setPostSuccess(false);
    
    setFetchLoading(true);
    try {
      const data = await seatService.getRequests(trainNumber);
      setAllRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const fetchMyRequests = async () => {
    if (!user) return;
    try {
      const data = await seatService.getMyRequests();
      setMyRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'my') fetchMyRequests();
  }, [activeTab, user]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to post a swap request');
      return;
    }
    if (!myPnr || !mySeat) return;
    
    try {
      const coachValue = mySeat.split('|')[0]?.trim() || 'Unknown';
      await seatService.submitRequest({
        trainNumber,
        journeyDate: new Date().toISOString().split('T')[0],
        coach: coachValue,
        currentSeat: `${mySeat.trim()} (${myCurrentBerth})`,
        wantedSeat: myTarget
      });
      
      setPostSuccess(true);
      setMyPnr('');
      setMySeat('');
      setMyCurrentBerth('Lower Berth');
      handleSearch();
      setTimeout(() => setPostSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to post swap request', err);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedReq || !msgText.trim()) return;
    setIsSending(true);
    try {
      await seatService.sendMessage(selectedReq._id, msgText);
      setSelectedReq(null);
      setMsgText('');
      alert('Message sent successfully! The passenger will see it in their inbox.');
    } catch (err) {
      console.error(err);
      alert('Failed to send message.');
    } finally {
      setIsSending(false);
    }
  };

  const loadMessages = async (reqId) => {
    try {
      const data = await seatService.getMessages(reqId);
      setReqMessages(prev => ({ ...prev, [reqId]: data }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (expandedReq) loadMessages(expandedReq);
  }, [expandedReq]);

  return (
    <div className="w-full pb-16 min-h-screen">
      
      {/* ═══ Hero Header ═══ */}
      <section className="bp-container pt-[52px] mb-[52px] anim-fade-up anim-delay-1">
        <h1 className="text-[clamp(40px,6vw,68px)] font-bold font-playfair text-ink leading-[1.08] tracking-[-1.5px] mb-3">
          P2P <span className="italic text-red">Seat</span> Exchange
        </h1>
        <p className="font-sora text-[15px] text-ink-3 leading-[1.7] max-w-[600px]">
          Find co-passengers on the same train and negotiate seat swaps instantly. Connect directly, with privacy.
        </p>
      </section>

      {/* ═══ Search Card — Train Number ═══ */}
      <section className="bp-container mb-[52px] anim-fade-up anim-delay-2">
        <div className="bg-white border border-border rounded-[20px] shadow-[0_4px_16px_rgba(26,20,16,0.08)] overflow-hidden">
          <div className="p-[28px] md:p-[36px]">
            <div className="flex flex-col sm:flex-row items-end gap-5">
              <div className="flex-1 w-full">
                <label className="bp-label mb-[20px] block">Train Number</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[8px] flex items-center justify-center shrink-0 bg-red-soft">
                    <Train size={24} className="text-red" />
                  </div>
                  <input
                    className="bp-input flex-1 h-[52px]"
                    type="text"
                    placeholder="e.g. 12952"
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <button
                className="bp-btn bp-btn--primary h-[52px] px-8 w-full sm:w-auto shrink-0"
                onClick={handleSearch}
                disabled={!trainNumber.trim() || isSearching}
              >
                {isSearching ? 'Searching…' : 'FIND SWAPS'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Results — ONLY shown after search ═══ */}
      {hasSearched && (
        <section className="bp-container space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ═══ Feed column ═══ */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-[20px] shadow-[0_4px_16px_rgba(26,20,16,0.08)] overflow-hidden anim-fade-up">

                {/* Tab bar */}
                <div className="flex border-b border-border">
                  {['feed', 'my'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex-1 py-[14px] px-[22px] font-sora text-[14px] font-medium transition-colors duration-250 flex items-center justify-center gap-2"
                      style={{
                        color: activeTab === tab ? 'var(--red)' : 'var(--ink-3)',
                        borderBottom: activeTab === tab ? '2px solid var(--red)' : '2px solid transparent',
                      }}
                    >
                      {tab === 'feed' ? <ArrowRightLeft size={15}/> : <User size={15}/>}
                      {tab === 'feed' ? 'Active Requests' : 'My Postings'}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="p-[32px] md:p-[36px] bg-auto">
                  {activeTab === 'feed' ? (
                    requests.length > 0 ? (
                      requests.map((req, idx) => (
                        <div
                          key={req._id}
                          className="bp-card bp-card--hoverable relative overflow-hidden mb-[14px] p-[26px] flex flex-col sm:flex-row items-center justify-between gap-5 group anim-fade-up"
                          style={{ animationDelay: `${Math.min(idx * 0.1, 0.4)}s` }}
                        >
                          {/* 3px left red accent line */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-border transition-colors duration-250 group-hover:bg-red" />
                          
                          <div className="flex-1 min-w-0 pl-2">
                            <div className="flex flex-col mb-1:gap-1">
                              <span className="font-sora text-[15px] font-semibold text-ink mb-1">
                                {req.user?.name || 'Passenger'}
                              </span>
                              <span className="font-sora text-[13px] text-ink-4 flex items-center gap-1.5">
                                <Clock size={12}/> Coach {req.coach} • {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                              <div>
                                <span className="font-sora text-[12.5px] uppercase font-semibold text-ink-3 tracking-[0.5px]">Has</span>
                                <div className="font-playfair text-[22px] font-bold text-ink tracking-[-0.5px]">
                                  {req.currentSeat}
                                </div>
                              </div>
                              <ArrowRightLeft size={16} className="text-border-2 mx-1" />
                              <div>
                                <span className="font-sora text-[12.5px] uppercase font-semibold text-ink-3 tracking-[0.5px]">Needs</span>
                                <div className="font-playfair text-[22px] font-bold text-red tracking-[-0.5px]">
                                  {req.wantedSeat}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 w-full sm:w-auto">
                            {user?._id !== req.user?._id ? (
                              <button
                                className="bp-btn w-full px-6 py-3 border border-border text-ink bg-paper hover:bg-white hover:border-red transition-all shadow-sm"
                                onClick={() => {
                                  if (!user) return alert('Please login to connect');
                                  setSelectedReq(req);
                                }}
                              >
                                Connect
                              </button>
                            ) : (
                              <div className="px-4 py-2 font-sora text-[12.5px] font-semibold uppercase tracking-[0.8px] text-ink-4 border border-dashed border-border-2 rounded-[8px] text-center w-full">
                                Yours
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center">
                        <Info size={32} className="text-ink-4 mb-3" />
                        <h3 className="font-playfair text-[20px] font-bold text-ink mb-2">No Swap Requests</h3>
                        <p className="font-sora text-[15px] text-ink-3 leading-[1.6]">
                          No one has posted a seat swap request for Train {trainNumber} yet.
                        </p>
                      </div>
                    )
                  ) : (
                    /* ═══ My Postings View ═══ */
                    myRequests.length > 0 ? (
                      myRequests.map((req) => (
                        <div key={req._id} className="bp-card overflow-hidden mb-[14px]">
                          <div className="p-[26px] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[12.5px] font-bold px-3 py-1 rounded-[6px] bg-paper text-ink-3 uppercase tracking-wide">
                                  Train {req.trainNumber}
                                </span>
                                <span 
                                  className={`text-[12.5px] font-bold px-3 py-1 rounded-[6px] uppercase tracking-wide ${req.status === 'open' ? 'bg-green-soft text-green' : 'bg-red-soft text-red'}`}
                                >
                                  {req.status}
                                </span>
                              </div>
                              <p className="text-[15px] font-sora text-ink-3 mt-3">
                                Swapping <span className="font-playfair font-bold text-ink text-[18px] ml-1">{req.currentSeat}</span> for <span className="font-playfair font-bold text-[18px] text-amber ml-1">{req.wantedSeat}</span>
                              </p>
                            </div>
                            <button 
                              onClick={() => setExpandedReq(expandedReq === req._id ? null : req._id)}
                              className="flex items-center gap-2 text-[14px] font-sora font-semibold text-red hover:bg-red-soft px-4 py-2 rounded-[8px] transition-colors"
                            >
                              <MessageSquare size={16} />
                              {reqMessages[req._id]?.length || 0} Messages
                              {expandedReq === req._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                          
                          {expandedReq === req._id && (
                            <div className="px-[26px] pb-[26px] pt-0">
                              <div className="p-[20px] rounded-[14px] space-y-4 bg-paper border border-border">
                                {reqMessages[req._id]?.length > 0 ? (
                                  reqMessages[req._id].map((m, mIdx) => (
                                    <div key={mIdx} className={`flex flex-col ${m.sender._id === user._id ? 'items-end' : 'items-start'}`}>
                                      <div 
                                        className={`max-w-[80%] px-[16px] py-[12px] rounded-[12px] font-sora text-[14px] leading-[1.5] ${m.sender._id === user._id ? 'bg-ink text-white rounded-tr-sm' : 'bg-white border border-border text-ink rounded-tl-sm'}`}
                                      >
                                        <p className="font-semibold text-[11px] mb-1 opacity-60 tracking-wide uppercase">{m.sender.name}</p>
                                        <p>{m.text}</p>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-center font-sora text-[14px] text-ink-4 italic py-2">No messages yet.</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center">
                        <Info size={32} className="text-ink-4 mb-3" />
                        <h3 className="font-playfair text-[20px] font-bold text-ink mb-2">No Postings Yet</h3>
                        <p className="font-sora text-[15px] text-ink-3">You haven't submitted any seat exchange requests.</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* ═══ Message Modal ═══ */}
            {selectedReq && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
                <div className="bg-white w-full max-w-md rounded-[20px] shadow-lg border border-border overflow-hidden anim-fade-up">
                  <div className="p-[24px] border-b border-border flex justify-between items-center bg-paper">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[10px] bg-red-soft flex items-center justify-center">
                        <MessageSquare size={18} className="text-red" />
                      </div>
                      <h3 className="font-playfair text-[20px] font-bold text-ink">Message Passenger</h3>
                    </div>
                    <button onClick={() => setSelectedReq(null)} className="p-2 hover:bg-border rounded-[8px] text-ink-3 transition-colors">
                      <XCircle size={22} />
                    </button>
                  </div>
                  
                  <div className="p-[28px] space-y-[20px]">
                    <div className="bp-input-wrapper">
                      <label className="bp-label pl-1">Your Message</label>
                      <textarea 
                        className="bp-input h-32 resize-none"
                        placeholder="Hi! I am interested in swapping seats..."
                        value={msgText}
                        onChange={(e) => setMsgText(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-[28px] pt-0 bg-white">
                    <button 
                      onClick={handleSendMessage}
                      disabled={isSending || !msgText.trim()}
                      className="bp-btn bp-btn--primary w-full"
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ Post Request sidebar ═══ */}
            <div className="h-fit sticky top-[100px] anim-fade-up anim-delay-2">
              <div className="bp-card border-none overflow-hidden shadow-[0_12px_40px_rgba(26,20,16,0.12)]">
                <div className="px-[26px] py-[24px] bg-ink">
                  <h3 className="font-playfair text-[20px] font-bold text-white flex items-center gap-2">
                    <RefreshCcw size={18} /> Post Request
                  </h3>
                  <p className="font-sora text-[14px] mt-1 text-ink-3 font-medium">
                    For Train <strong className="text-white">{trainNumber}</strong>
                  </p>
                </div>

                <form className="p-[26px] space-y-[20px]" onSubmit={handlePost}>
                  <div className="bp-input-wrapper">
                    <label className="bp-label">PNR Number</label>
                    <input
                      className="bp-input"
                      type="text"
                      placeholder="10-digit PNR"
                      value={myPnr}
                      onChange={(e) => setMyPnr(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bp-input-wrapper">
                    <label className="bp-label">Your Current Seat</label>
                    <input
                      className="bp-input"
                      type="text"
                      placeholder="e.g. B4 | 45"
                      value={mySeat}
                      onChange={(e) => setMySeat(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bp-input-wrapper">
                    <label className="bp-label">Current Berth</label>
                    <select
                      className="bp-input cursor-pointer"
                      value={myCurrentBerth}
                      onChange={(e) => setMyCurrentBerth(e.target.value)}
                    >
                      <option>Upper Berth</option>
                      <option>Middle Berth</option>
                      <option>Lower Berth</option>
                      <option>Side Lower</option>
                      <option>Side Upper</option>
                    </select>
                  </div>

                  <div className="bp-input-wrapper">
                    <label className="bp-label">Preferred Berth</label>
                    <select
                      className="bp-input cursor-pointer"
                      value={myTarget}
                      onChange={(e) => setMyTarget(e.target.value)}
                    >
                      <option>Upper Berth</option>
                      <option>Middle Berth</option>
                      <option>Lower Berth</option>
                      <option>Side Lower</option>
                      <option>Side Upper</option>
                    </select>
                  </div>

                  <div className="pt-[16px]">
                    <button
                      type="submit"
                      className="bp-btn bp-btn--primary w-full text-[14px]"
                      disabled={!myPnr || !mySeat}
                    >
                      POST REQUEST
                    </button>
                  </div>

                  {postSuccess && (
                    <div className="flex items-center gap-2 p-3 font-sora text-[13px] bg-green-soft text-green rounded-[8px] border border-green/20">
                      <CheckCircle2 size={16} /> Successfully Posted!
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ═══ Empty state — before search ═══ */}
      {!hasSearched && !isSearching && (
        <div className="max-w-[400px] mx-auto text-center py-[80px] px-4 anim-fade-up anim-delay-3">
          <div className="w-16 h-16 mx-auto mb-6 rounded-[16px] flex items-center justify-center bg-paper shadow-sm border border-border">
            <ArrowRightLeft size={28} className="text-red" />
          </div>
          <h3 className="font-playfair text-[24px] font-bold text-ink mb-3 tracking-[-0.5px]">
            Find Swap Partners
          </h3>
          <p className="font-sora text-[15px] mb-6 text-ink-3 leading-[1.6]">
            Enter your train number above to browse active swap requests from co-passengers.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-paper text-ink-4 text-[12.5px] font-semibold border border-border uppercase tracking-wide">
            <Info size={14} /> Same train requirement
          </div>
        </div>
      )}
    </div>
  );
}
