'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Headphones,
  Bot,
  User,
  Phone,
  Package,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  Smile,
  Paperclip,
} from 'lucide-react';
import { useOrdersQuery } from '@quickbasket/api-client';
import { formatCurrency } from '@quickbasket/utils';
import Link from 'next/link';

interface SupportChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  time: string;
  actionCard?: {
    type: 'order' | 'refund' | 'ticket' | 'call';
    title?: string;
    subtitle?: string;
    orderId?: string;
    riderPhone?: string;
    amount?: number;
    ticketId?: string;
  };
}

export function SupportChatModal({ isOpen, onClose, initialTopic }: SupportChatModalProps) {
  const { data: orders } = useOrdersQuery();
  const activeOrder = orders && orders.length > 0 ? orders[0] : null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "👋 Hi Vikram! I'm your 24x7 QuickBasket Support Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle initial topic if provided
  useEffect(() => {
    if (initialTopic && isOpen) {
      handleQuickTopic(initialTopic);
    }
  }, [initialTopic, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI response logic based on input query
    setTimeout(() => {
      generateBotReply(text);
      setIsTyping(false);
    }, 700);
  };

  const generateBotReply = (query: string) => {
    const lower = query.toLowerCase();
    let botMsg: ChatMessage;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (lower.includes('where') || lower.includes('track') || lower.includes('status') || lower.includes('order')) {
      if (activeOrder) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Your active order #${activeOrder.orderNumber} is currently **Out for Delivery**! Your delivery partner Vikram Singh is 1.2 km away.`,
          time: timeStr,
          actionCard: {
            type: 'order',
            title: `Order #${activeOrder.orderNumber}`,
            subtitle: `${activeOrder.items.length} items • Estimated Arrival in 4 mins`,
            orderId: activeOrder.id,
            riderPhone: '+91 98112 33445',
          },
        };
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I checked your account and all your recent orders have been delivered successfully! Is there a specific past order you have a question about?",
          time: timeStr,
        };
      }
    } else if (lower.includes('damage') || lower.includes('missing') || lower.includes('item') || lower.includes('wrong')) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "We sincerely apologize for the inconvenience! QuickBasket guarantees 100% fresh groceries. I have processed an instant refund of ₹120.00 directly to your QuickWallet.",
        time: timeStr,
        actionCard: {
          type: 'refund',
          title: 'Instant Refund Processed',
          subtitle: '₹120.00 credited to QuickWallet',
          amount: 120,
          ticketId: `TICK-${Math.floor(10000 + Math.random() * 90000)}`,
        },
      };
    } else if (lower.includes('refund') || lower.includes('wallet') || lower.includes('balance') || lower.includes('money')) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Your QuickWallet current balance is **₹245.00**. All QuickBasket refunds are instantly credited to your wallet without any bank delay.",
        time: timeStr,
        actionCard: {
          type: 'refund',
          title: 'QuickWallet Status: Active',
          subtitle: 'Current Balance: ₹245.00',
          amount: 245,
        },
      };
    } else if (lower.includes('call') || lower.includes('rider') || lower.includes('partner') || lower.includes('driver')) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "You can directly contact your delivery partner Vikram Singh for gate directions or delivery notes:",
        time: timeStr,
        actionCard: {
          type: 'call',
          title: 'Delivery Partner: Vikram Singh',
          subtitle: 'Vehicle: DL 03 XY 8899',
          riderPhone: '+91 98112 33445',
        },
      };
    } else if (lower.includes('human') || lower.includes('agent') || lower.includes('executive') || lower.includes('person')) {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Connecting you to a Live Senior Support Specialist... Ticket #TICK-8842 assigned. Expected wait time: under 30 seconds.",
        time: timeStr,
        actionCard: {
          type: 'ticket',
          title: 'Support Ticket #TICK-8842 Created',
          subtitle: 'Agent Rahul Sharma assigned to chat',
          ticketId: 'TICK-8842',
        },
      };
    } else {
      botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Thanks for reaching out! I've logged your request. Our 24x7 customer support team is monitoring this chat. How else can I help you?",
        time: timeStr,
      };
    }

    setMessages((prev) => [...prev, botMsg]);
  };

  const handleQuickTopic = (topic: string) => {
    handleSendMessage(topic);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-surface rounded-3xl border border-mist shadow-float w-full max-w-lg h-[620px] max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn">
        {/* ========================================================================= */}
        {/* MODAL HEADER */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-ink via-header-dark to-basil-dark text-white p-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-mango text-ink flex items-center justify-center font-bold shadow-pill">
                <Bot className="w-5 h-5 text-ink" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-ink rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">QuickBasket Support AI</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  24x7 Online
                </span>
              </div>
              <p className="text-[11px] text-white/70 font-medium">Instant order help & resolution</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:18007842522"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              title="Call Helpline: 1800-QUICK-BASKET"
            >
              <Phone className="w-4 h-4 text-brand" />
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAT MESSAGES BODY */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper/60">
          {/* Quick Topic Suggestions */}
          <div className="space-y-1.5 pt-1 pb-2">
            <p className="text-[11px] font-bold text-ink-400 uppercase tracking-wider">Quick Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickTopic('Where is my active order?')}
                className="text-xs bg-surface border border-mist hover:border-basil hover:bg-basil-light text-ink font-bold px-3 py-1.5 rounded-pill transition-all shadow-sm flex items-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5 text-basil" />
                <span>Where is my order?</span>
              </button>
              <button
                onClick={() => handleQuickTopic('Report damaged or missing item')}
                className="text-xs bg-surface border border-mist hover:border-basil hover:bg-basil-light text-ink font-bold px-3 py-1.5 rounded-pill transition-all shadow-sm flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-mango-hover" />
                <span>Damaged item</span>
              </button>
              <button
                onClick={() => handleQuickTopic('Check refund status & wallet balance')}
                className="text-xs bg-surface border border-mist hover:border-basil hover:bg-basil-light text-ink font-bold px-3 py-1.5 rounded-pill transition-all shadow-sm flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Refund status</span>
              </button>
              <button
                onClick={() => handleQuickTopic('Talk to human support executive')}
                className="text-xs bg-surface border border-mist hover:border-basil hover:bg-basil-light text-ink font-bold px-3 py-1.5 rounded-pill transition-all shadow-sm flex items-center gap-1.5"
              >
                <Headphones className="w-3.5 h-3.5 text-sky-600" />
                <span>Human Agent</span>
              </button>
            </div>
          </div>

          {/* Messages list */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs space-y-2 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-basil text-white rounded-br-none font-medium'
                    : 'bg-surface border border-mist text-ink rounded-bl-none font-medium'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {/* Render Rich Action Card if attached to Bot message */}
                {msg.actionCard && (
                  <div className="pt-2 border-t border-mist/80 space-y-2 text-ink">
                    {msg.actionCard.type === 'order' && (
                      <div className="bg-surface-muted p-3 rounded-xl border border-mist space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-basil text-[11px]">
                            {msg.actionCard.title}
                          </span>
                          <span className="text-[10px] font-black bg-basil-light text-basil px-2 py-0.5 rounded-md">
                            ON THE WAY
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-ink-600">{msg.actionCard.subtitle}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href={`tel:${msg.actionCard.riderPhone}`}
                            className="flex-1 bg-basil hover:bg-basil-hover text-white text-[11px] font-bold py-1.5 rounded-pill text-center flex items-center justify-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Rider</span>
                          </a>
                          {msg.actionCard.orderId && (
                            <Link
                              href={`/orders/${msg.actionCard.orderId}`}
                              onClick={onClose}
                              className="flex-1 bg-surface border border-mist text-ink hover:bg-white text-[11px] font-bold py-1.5 rounded-pill text-center"
                            >
                              Track Map
                            </Link>
                          )}
                        </div>
                      </div>
                    )}

                    {msg.actionCard.type === 'refund' && (
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{msg.actionCard.title}</span>
                        </div>
                        <p className="text-[11px] text-emerald-700 font-medium">
                          {msg.actionCard.subtitle}
                        </p>
                      </div>
                    )}

                    {msg.actionCard.type === 'call' && (
                      <div className="bg-mango-light/50 border border-mango/40 p-3 rounded-xl space-y-2">
                        <p className="font-bold text-ink text-[11px]">{msg.actionCard.title}</p>
                        <p className="text-[11px] text-ink-500 font-mono">{msg.actionCard.subtitle}</p>
                        <a
                          href={`tel:${msg.actionCard.riderPhone}`}
                          className="inline-flex items-center gap-1.5 bg-mango text-ink font-black text-xs px-4 py-1.5 rounded-pill shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Rider ({msg.actionCard.riderPhone})</span>
                        </a>
                      </div>
                    )}

                    {msg.actionCard.type === 'ticket' && (
                      <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl space-y-1">
                        <p className="font-extrabold text-sky-900 text-[11px]">{msg.actionCard.title}</p>
                        <p className="text-[11px] text-sky-700 font-medium">{msg.actionCard.subtitle}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-ink-400 px-1 font-mono">{msg.time}</span>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-ink-400 text-xs py-1">
              <div className="w-7 h-7 rounded-full bg-mango/20 text-ink flex items-center justify-center">
                <Bot className="w-4 h-4 text-basil" />
              </div>
              <span className="font-medium animate-pulse">QuickBasket Support is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ========================================================================= */}
        {/* CHAT FOOTER INPUT */}
        {/* ========================================================================= */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-surface border-t border-mist flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            className="p-2 text-ink-400 hover:text-ink transition-colors rounded-full"
            title="Attach order receipt or image"
            onClick={() => alert('Attachment upload dialog')}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Type your query (e.g. refund, missing item)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-surface-muted border border-mist focus:border-basil rounded-pill px-4 py-2 text-xs font-medium text-ink focus:outline-none placeholder:text-ink-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-basil hover:bg-basil-hover disabled:opacity-50 text-white p-2.5 rounded-full transition-all active:scale-95 shadow-pill"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
