import React from 'react';
import { Star, Shield, ArrowRight } from 'lucide-react';

export function DownloadApp() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-basil/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-mango/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

          {/* Floating grocery elements */}
          <div className="absolute top-12 right-[15%] text-4xl opacity-20 animate-float" style={{ animationDelay: '0s' }}>🥬</div>
          <div className="absolute top-1/3 right-[8%] text-3xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>🍊</div>
          <div className="absolute bottom-16 right-[20%] text-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}>🥛</div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 p-8 sm:p-12 md:p-16 lg:p-20">
            {/* Text content */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="font-display text-display-lg text-white">
                Your groceries,
                <br />
                <span className="text-gradient bg-gradient-to-r from-mango to-amber-300 bg-clip-text" style={{ WebkitTextFillColor: 'transparent' }}>
                  one tap away.
                </span>
              </h2>

              <p className="text-base text-white/60 leading-relaxed max-w-md mx-auto md:mx-0">
                Download the QuickBasket app for exclusive deals, real-time tracking, 
                and lightning-fast delivery — all in one place.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-mango fill-mango" />
                  <span className="text-sm font-bold">4.8</span>
                  <span className="text-xs text-white/40">rating</span>
                </div>
                <div className="w-px h-4 bg-white/15" />
                <div>
                  <span className="text-sm font-bold">1M+</span>
                  <span className="text-xs text-white/40 ml-1">downloads</span>
                </div>
                <div className="w-px h-4 bg-white/15" />
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-basil" />
                  <span className="text-xs text-white/40">Secure</span>
                </div>
              </div>

              {/* App store buttons */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2.5 bg-white hover:bg-white/95 text-ink px-5 py-3 rounded-xl transition-all active:scale-95 hover:shadow-float"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] font-medium text-ink-400 leading-none">Download on the</div>
                    <div className="text-sm font-bold leading-tight">App Store</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-ink-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white px-5 py-3 rounded-xl transition-all active:scale-95 hover:shadow-float"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.09l2.312 1.338a1 1 0 010 1.732l-2.123 1.229-2.532-2.532 2.343-1.767zM5.864 2.658L16.802 8.99l-2.303 2.303L5.864 2.658z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] font-medium text-white/40 leading-none">GET IT ON</div>
                    <div className="text-sm font-bold leading-tight">Google Play</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="hidden md:flex items-center justify-center shrink-0">
              <div className="relative w-56 h-[400px]">
                {/* Phone frame */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/15 shadow-editorial overflow-hidden">
                  {/* Screen */}
                  <div className="absolute inset-2.5 rounded-[2rem] bg-gradient-to-b from-basil to-basil-dark overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-bold text-white/70">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 rounded-sm border border-white/50">
                          <div className="w-3 h-1.5 rounded-sm bg-white/70 m-px" />
                        </div>
                      </div>
                    </div>

                    {/* App content preview */}
                    <div className="px-4 pt-5 pb-3">
                      <div className="text-[10px] font-bold text-white/50">Delivering in</div>
                      <div className="text-lg font-display font-bold text-white">10 minutes</div>
                      <div className="mt-2 bg-white/12 rounded-xl px-3 py-2 text-[9px] text-white/50 font-medium">
                        Search for &apos;paneer&apos;...
                      </div>
                    </div>

                    {/* Mini category row */}
                    <div className="px-4 flex gap-2 mt-1">
                      {['🥛', '🥬', '🍎', '🍞'].map((emoji, i) => (
                        <div key={i} className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center text-sm">
                          {emoji}
                        </div>
                      ))}
                    </div>

                    {/* Mini product grid */}
                    <div className="px-4 mt-3 grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white/8 rounded-xl p-2">
                          <div className="w-full h-10 rounded-lg bg-white/8 mb-1.5" />
                          <div className="h-1.5 w-3/4 rounded bg-white/15 mb-1" />
                          <div className="h-1.5 w-1/2 rounded bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-ink rounded-b-2xl z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
