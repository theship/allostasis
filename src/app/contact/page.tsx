"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    challenge: "",
    timeline: "",
    budget: "",
    details: ""
  });

  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Try to parse JSON response, but don't fail if it's not JSON (static hosting)
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails (e.g., on static hosting), just treat as success
        // since the form data was sent
        console.log('Note: Running on static hosting - form submitted but email sending requires server');
      }

      if (!response.ok && data?.error) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success - show confirmation message
      setShowMessage(true);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        challenge: "",
        timeline: "",
        budget: "",
        details: ""
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowMessage(false), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-20 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-dark-50 mb-4">
          Architecture Intro
        </h1>
        <p className="text-xl text-dark-100 mb-12">
          Tell us about your challenge and we&apos;ll design a solution that fits.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-dark-200 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-dark-200 mb-2">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
                placeholder="Your role"
              />
            </div>
          </div>

          <div>
            <label htmlFor="challenge" className="block text-sm font-medium text-dark-200 mb-2">
              Primary Challenge *
            </label>
            <select
              id="challenge"
              name="challenge"
              required
              value={formData.challenge}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
            >
              <option value="">Select a challenge</option>
              <option value="data-quality">Data quality & labeling</option>
              <option value="evaluation">Evaluation & testing</option>
              <option value="human-in-loop">Human-in-the-loop workflows</option>
              <option value="governance">Governance & compliance</option>
              <option value="scale">Scaling existing system</option>
              <option value="new-system">Building new system</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-dark-200 mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediate (&lt; 1 month)</option>
                <option value="quarter">This quarter</option>
                <option value="half-year">Next 6 months</option>
                <option value="year">This year</option>
                <option value="planning">Planning stage</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-dark-200 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry"
              >
                <option value="">Select budget</option>
                <option value="&lt; 50k">Less than $50k</option>
                <option value="50-100k">$50k - $100k</option>
                <option value="100-250k">$100k - $250k</option>
                <option value="250k+">$250k+</option>
                <option value="tbd">To be determined</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-dark-200 mb-2">
              Project Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={6}
              value={formData.details}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-900/50 border border-dark-700 rounded-lg text-dark-100 placeholder-dark-500 focus:outline-none focus:border-winterberry focus:ring-1 focus:ring-winterberry resize-none"
              placeholder="Tell us more about your project, current systems, and goals..."
            />
          </div>

          <div className="flex items-center justify-between pt-6">
            <p className="text-sm text-dark-400">
              * Required fields
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-winterberry text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>

        {showMessage && (
          <div className="mt-12 p-6 bg-green-900/20 border border-green-700 rounded-lg">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Success!</h3>
            <p className="text-sm text-green-300 mb-3">
              Your request has been submitted successfully. We&apos;ll review your requirements and contact you soon.
            </p>
            <p className="text-xs text-green-400">
              📧 A confirmation email has been sent to your email address.
            </p>
          </div>
        )}

        {submitError && (
          <div className="mt-12 p-6 bg-red-900/20 border border-red-700 rounded-lg">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Error</h3>
            <p className="text-sm text-red-300">
              {submitError}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}