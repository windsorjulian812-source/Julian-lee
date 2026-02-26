import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { JobListing, ResumeData } from '../types';
import { Search, Loader2, Send, CheckCircle2, AlertCircle, ExternalLink, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  resumeData: ResumeData;
}

export default function JobSearch({ resumeData }: Props) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applying, setApplying] = useState<string | null>(null);
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const searchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = `Based on this resume:
        Name: ${resumeData.fullName}
        Skills: ${resumeData.skills.join(', ')}
        Summary: ${resumeData.summary}
        
        Find 5 current job listings that match this profile. 
        Return them as a JSON array of objects with: id, title, company, location, description, email (if found), and url.
        Search for jobs in ${resumeData.location || 'remote'}.
        If you can't find a direct email, leave it null.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                location: { type: Type.STRING },
                description: { type: Type.STRING },
                email: { type: Type.STRING, nullable: true },
                url: { type: Type.STRING },
              },
              required: ["id", "title", "company", "location", "description", "url"],
            },
          },
        },
      });

      const results = JSON.parse(response.text || '[]');
      setJobs(results);
    } catch (err) {
      console.error(err);
      setError("Failed to search for jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (job: JobListing) => {
    if (!job.email) {
      window.open(job.url, '_blank');
      return;
    }

    setApplying(job.id);
    try {
      const resumeHtml = document.getElementById('resume-preview')?.innerHTML;
      
      const response = await fetch('/api/send-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: job.email,
          jobTitle: job.title,
          resumeHtml: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Application for ${job.title}</h2>
              <p>Hi ${job.company} Team,</p>
              <p>I am interested in the ${job.title} position. Please find my resume below.</p>
              <hr />
              ${resumeHtml}
            </div>
          `,
        }),
      });

      if (!response.ok) throw new Error('Failed to send email');
      
      setApplied(prev => new Set(prev).add(job.id));
    } catch (err) {
      console.error(err);
      alert("Failed to send resume. Make sure RESEND_API_KEY is configured.");
    } finally {
      setApplying(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-lg shadow-indigo-200">
        <h2 className="text-2xl font-bold mb-2">Find Your Next Role</h2>
        <p className="text-indigo-100 mb-6">We'll use your resume to find the best matching opportunities.</p>
        <button
          onClick={searchJobs}
          disabled={loading}
          className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          {loading ? 'Searching...' : 'Search Matching Jobs'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                  <p className="text-indigo-600 font-medium">{job.company}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </p>
                </div>
                <button
                  onClick={() => applyToJob(job)}
                  disabled={applying === job.id || applied.has(job.id)}
                  className={clsx(
                    "px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2",
                    applied.has(job.id) 
                      ? "bg-emerald-50 text-emerald-600 cursor-default"
                      : "bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
                  )}
                >
                  {applying === job.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : applied.has(job.id) ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : job.email ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <ExternalLink className="w-4 h-4" />
                  )}
                  {applying === job.id ? 'Applying...' : applied.has(job.id) ? 'Applied' : job.email ? 'Apply via Email' : 'Apply on Site'}
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600 line-clamp-3">{job.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
