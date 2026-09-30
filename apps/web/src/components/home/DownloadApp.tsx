import React from 'react';
import { Star } from 'lucide-react';

export function DownloadApp() {
  return (
    <section className="py-12 md:py-16 selection:bg-basil/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Architectural Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#121915] text-white border border-white/10 shadow-lg">
          
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-basil/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid Layout: Main Brand Statement (75-80%) + Small Phone (20-25%) */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 sm:p-12 lg:p-16">
            
            {/* ── Left: Large Brand Typography (75–80% weight) ── */}
            <div className="flex-1 max-w-2xl text-center md:text-left space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 border border-white/10">
                <span>MOBILE APPLICATION / iOS & ANDROID</span>
              </div>

              {/* Exact user-requested brand statement */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none">
                YOUR GROCERIES.<br />
                <span className="text-[#a7e8bd]">ONE TAP AWAY.</span>
              </h2>

              <p className="text-white/70 text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto md:mx-0">
                Download the QuickBasket app for exclusive daily harvest drops, instant live courier telemetry, and guaranteed 10-minute doorstep dispatch.
              </p>

              {/* App Store & Google Play Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {/* App Store */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-white text-ink hover:bg-white/90 px-5 py-2.5 rounded-xl transition-transform duration-200 active:scale-95 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] font-mono uppercase text-ink-500 leading-none">Available on</div>
                    <div className="text-xs font-bold leading-tight">App Store</div>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/15 text-white px-5 py-2.5 rounded-xl transition-transform duration-200 active:scale-95 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.09l2.312 1.338a1 1 0 010 1.732l-2.123 1.229-2.532-2.532 2.343-1.767zM5.864 2.658L16.802 8.99l-2.303 2.303L5.864 2.658z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] font-mono uppercase text-white/50 leading-none">Get it on</div>
                    <div className="text-xs font-bold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Ratings proof line */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-1 font-mono text-[11px] text-white/50">
                <div className="flex items-center gap-1 text-[#f59e0b]">
                  <Star className="w-3.5 h-3.5 fill-[#f59e0b] stroke-[#f59e0b]" />
                  <span className="font-bold text-white">4.8 Rating</span>
                </div>
                <span>·</span>
                <span>1M+ Mobile Downloads</span>
              </div>
            </div>

            {/* ── Right: Small Phone Mockup (~20–25% of section) ── */}
            <div className="shrink-0 flex items-center justify-center md:justify-end">
              <div className="relative w-36 sm:w-40 lg:w-44 h-[240px] sm:h-[270px] rounded-[1.8rem] bg-gradient-to-b from-white/20 to-white/5 p-1.5 border border-white/20 shadow-2xl">
                
                {/* Phone screen */}
                <div className="w-full h-full rounded-[1.4rem] bg-[#16271c] overflow-hidden flex flex-col justify-between p-3 border border-white/10 relative">
                  
                  {/* Dynamic Island / Notch */}
                  <div className="w-12 h-2.5 bg-black rounded-full mx-auto mb-2" />

                  {/* App Screen Content Preview */}
                  <div className="space-y-2">
                    <div className="text-[8px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                      10 MIN DISPATCH
                    </div>
                    <div className="font-display text-xs font-bold text-white leading-tight">
                      Order arriving now
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-basil rounded-full" />
                    </div>
                  </div>

                  {/* Mini Cart Thumbnails */}
                  <div className="grid grid-cols-3 gap-1.5 py-2">
                    {['🥬', '🥛', '🍞'].map((icon, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-md bg-white/10 flex items-center justify-center text-sm border border-white/5"
                      >
                        {icon}
                      </div>
                    ))}
                  </div>

                  {/* Mini Tracking Pill */}
                  <div className="w-full py-1 rounded bg-white text-ink text-center text-[9px] font-mono font-bold uppercase tracking-wider">
                    Track Rider →
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
