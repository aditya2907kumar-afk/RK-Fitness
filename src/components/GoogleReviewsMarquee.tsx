import React from 'react';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { googleReviewsList, GOOGLE_MAPS_URL } from '../data/reviewsData.ts';

export const GoogleReviewsMarquee: React.FC = () => {
  // Duplicate reviews to create a seamless infinite marquee loop
  const trackReviews = [...googleReviewsList, ...googleReviewsList];

  return (
    <section id="reviews" className="relative py-20 overflow-hidden text-center">
      {/* Section Header: Floating clean typography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center flex flex-col items-center justify-center gap-2.5">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-montserrat tracking-[0.28em] text-[#FCD34D] font-medium uppercase mb-1 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#FCD34D]/30 shadow-md text-center text-halo">
          <Star className="w-4 h-4 fill-[#FCD34D]" />
          <span>Real Google Maps Reviews</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-cormorant font-medium text-white tracking-tight luxury-text-shadow text-center">
          Real Words from Patna Lifters
        </h2>
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-md text-slate-100 text-xs sm:text-sm max-w-2xl text-center leading-relaxed text-halo font-montserrat tracking-wide">
          <span>4.6★ Rated on Google Maps • Verified customer experiences at Bajrangi Chowk, Jakariyapur, Pahari, Patna.</span>
        </div>
        <div className="mt-2 text-center">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-montserrat tracking-[0.2em] uppercase text-[#FCD34D] hover:text-[#FDE68A] transition-colors px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#FCD34D]/40 text-center text-halo"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Floating Reviews Marquee: Frosted Crystal Review Tiles over Wallpaper */}
      <div className="marquee-container w-full overflow-hidden relative select-none text-center py-2 marquee-mask">
        <div className="animate-marquee-reviews flex gap-8 sm:gap-10">
          {/* Track 1 */}
          <div className="flex gap-8 sm:gap-10 shrink-0">
            {trackReviews.map((rev, index) => (
              <div
                key={`rev-t1-${rev.id}-${index}`}
                className="w-[360px] sm:w-[420px] flex flex-col items-center justify-between shrink-0 p-6 sm:p-7 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl text-center text-halo gpu-layer butter-scale hover:scale-[1.02] hover:border-white/35"
              >
                <div className="flex flex-col items-center text-center w-full">
                  {/* Reviewer Google Avatar */}
                  {rev.avatarUrl && (
                    <div className="mb-3 flex justify-center items-center">
                      <img
                        src={rev.avatarUrl}
                        alt={rev.author}
                        className="w-12 h-12 rounded-full border border-[#FCD34D]/40 object-cover shadow-md mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Gold Stars & Verification Tag */}
                  <div className="flex flex-col items-center justify-center gap-1.5 mb-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-[#FCD34D]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FCD34D]" />
                      ))}
                    </div>
                    <div className="inline-flex items-center justify-center gap-1.5 text-[11px] font-montserrat text-slate-300 font-medium text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{rev.reviewDate}</span>
                    </div>
                  </div>

                  {/* Floating Italicized Review Quote */}
                  <p className="text-lg sm:text-xl text-slate-100 italic font-cormorant font-normal leading-relaxed mb-4 luxury-text-shadow text-center">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-2 flex flex-col items-center justify-center text-center gap-1 w-full">
                  <h4 className="text-base sm:text-lg font-medium text-white font-cormorant tracking-tight text-center">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-slate-400 text-center font-montserrat">Jakariyapur, Pahari, Patna</p>
                  <span className="text-[10px] sm:text-[11px] font-montserrat text-[#FCD34D] tracking-[0.2em] uppercase text-center mt-0.5 font-semibold">
                    {rev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 */}
          <div className="flex gap-8 sm:gap-10 shrink-0" aria-hidden="true">
            {trackReviews.map((rev, index) => (
              <div
                key={`rev-t2-${rev.id}-${index}`}
                className="w-[360px] sm:w-[420px] flex flex-col items-center justify-between shrink-0 p-6 sm:p-7 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl text-center text-halo gpu-layer butter-scale hover:scale-[1.02] hover:border-white/35"
              >
                <div className="flex flex-col items-center text-center w-full">
                  {/* Reviewer Google Avatar */}
                  {rev.avatarUrl && (
                    <div className="mb-3 flex justify-center items-center">
                      <img
                        src={rev.avatarUrl}
                        alt={rev.author}
                        className="w-12 h-12 rounded-full border border-[#FCD34D]/40 object-cover shadow-md mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Gold Stars & Verification Tag */}
                  <div className="flex flex-col items-center justify-center gap-1.5 mb-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-[#FCD34D]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FCD34D]" />
                      ))}
                    </div>
                    <div className="inline-flex items-center justify-center gap-1.5 text-[11px] font-montserrat text-slate-300 font-medium text-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{rev.reviewDate}</span>
                    </div>
                  </div>

                  {/* Floating Italicized Review Quote */}
                  <p className="text-lg sm:text-xl text-slate-100 italic font-cormorant font-normal leading-relaxed mb-4 luxury-text-shadow text-center">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-2 flex flex-col items-center justify-center text-center gap-1 w-full">
                  <h4 className="text-base sm:text-lg font-medium text-white font-cormorant tracking-tight text-center">
                    {rev.author}
                  </h4>
                  <p className="text-xs text-slate-400 text-center font-montserrat">Jakariyapur, Pahari, Patna</p>
                  <span className="text-[10px] sm:text-[11px] font-montserrat text-[#FCD34D] tracking-[0.2em] uppercase text-center mt-0.5 font-semibold">
                    {rev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
