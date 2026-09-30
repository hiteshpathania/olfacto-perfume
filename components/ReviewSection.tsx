"use client";

import { useState } from "react";

const PERFUMES = [
  "Neosil",
  "Black Knot",
  "Frose",
  "Smoky Knight",
  "First Kiss",
  "Liyara",
];

type Review = {
  id: number;
  name: string;
  perfume: string;
  rating: number;
  text: string;
  date: string;
};

// ==========================================
// YOUR PERMANENT REVIEWS LIVE HERE
// Add new reviews you receive via email here to make them permanent
// ==========================================
const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Agam K.",
    perfume: "Smoky Knight",
    rating: 5,
    text: "Wore this with my streetwear hoodie and the vibe was absolute fire. Truly worth the sin. Lasts all night long.",
    date: "Sep 22, 2026",
  },
  {
    id: 2,
    name: "Riya S.",
    perfume: "First Kiss",
    rating: 5,
    text: "Elegant and unforgettable. I've received so many compliments every time I wear this to an event. The packaging is also top tier.",
    date: "Sep 18, 2026",
  },
];

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [perfume, setPerfume] = useState(PERFUMES[0]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Prepare data for Web3Forms
    const formData = new FormData();
    formData.append("access_key", "3d0c244c-48d6-4adb-9166-5e3accd70b8b"); // Your Web3Forms Key
    formData.append("subject", `⭐ NEW REVIEW for ${perfume} - OLFACTO`);
    formData.append("from_name", "Olfacto Reviews");
    formData.append("Customer_Name", name);
    formData.append("Perfume_Purchased", perfume);
    formData.append("Rating", `${rating} out of 5 Stars`);
    formData.append("Review_Text", text);

    try {
      // 2. Send the review to your email
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      // 3. Temporarily show it on the user's screen so they feel good
      const newReview: Review = {
        id: Date.now(),
        name,
        perfume,
        rating,
        text,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setReviews([newReview, ...reviews]);
      
      // 4. Show success state and reset form
      setSuccessMessage(true);
      setName("");
      setRating(5);
      setText("");
      setTimeout(() => setSuccessMessage(false), 4000);

    } catch (error) {
      console.error("Review failed to send", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "submit"}
            onClick={() => interactive && setRating(star)}
            disabled={!interactive}
            aria-label={`Rate ${star} out of 5 stars`}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={star <= currentRating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={1.5}
              className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= currentRating ? 'text-black' : 'text-gray-300'}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-gray-100">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-widest uppercase mb-4">Client Experiences</h2>
        <div className="w-12 h-0.5 bg-black mx-auto mb-6"></div>
        <p className="text-gray-500 text-xs sm:text-sm tracking-widest uppercase">Leave your mark. Share your signature scent.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT: SUBMIT REVIEW FORM */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 sm:p-8">
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6 border-b border-gray-200 pb-4">
              Write a Review
            </h3>
            
            {successMessage ? (
               <div className="bg-green-50 border border-green-200 text-green-800 p-6 text-center">
                 <p className="text-xs tracking-widest uppercase font-bold mb-2">Thank You</p>
                 <p className="text-xs">Your review has been submitted for approval.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="reviewer-name" className="block text-[10px] tracking-widest uppercase text-gray-600 mb-2">Name</label>
                  <input 
                    id="reviewer-name"
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm" 
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="scent-select" className="block text-[10px] tracking-widest uppercase text-gray-600 mb-2">Select Scent</label>
                  <select 
                    id="scent-select"
                    value={perfume}
                    onChange={(e) => setPerfume(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm tracking-wide uppercase cursor-pointer"
                  >
                    {PERFUMES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest uppercase text-gray-600 mb-2">Rating</label>
                  {renderStars(rating, true)}
                </div>

                <div>
                  <label htmlFor="review-text" className="block text-[10px] tracking-widest uppercase text-gray-600 mb-2">Your Experience</label>
                  <textarea 
                    id="review-text"
                    required 
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors bg-transparent rounded-none text-sm resize-none" 
                    placeholder="How did this fragrance make you feel?"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT: REVIEWS LIST */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-100 p-6 flex flex-col justify-between h-full bg-white hover:border-gray-300 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    {renderStars(review.rating, false)}
                    <span className="text-[10px] text-gray-400 tracking-widest uppercase">{review.date}</span>
                  </div>
                  
                  <h4 className="text-xs font-bold tracking-widest uppercase mb-1">{review.name}</h4>
                  <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">Purchased: <span className="text-black">{review.perfume}</span></p>
                  
                  <p className="text-sm text-gray-600 leading-relaxed italic">"{review.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}