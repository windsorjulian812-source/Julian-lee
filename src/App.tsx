import React, { useState, useEffect } from 'react';
import { ResumeData } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import JobSearch from './components/JobSearch';
import { FileText, Search, Sparkles, Layout, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_DATA: ResumeData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
};

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume-data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [activeTab, setActiveTab] = useState<'build' | 'search'>('build');

  useEffect(() => {
    localStorage.setItem('resume-data', JSON.stringify(data));
  }, [data]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">ResumeAutomator</h1>
          </div>
          
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('build')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'build' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              Build Resume
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'search' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Search className="w-4 h-4" />
              Find Jobs
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'build' ? (
            <motion.div
              key="build"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">Craft your story</h2>
                  <p className="text-slate-500">Fill in your details to generate a professional resume in real-time.</p>
                </div>
                <ResumeForm data={data} onChange={setData} />
              </div>
              
              <div className="sticky top-28 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                    <Layout className="w-4 h-4" />
                    Live Preview
                  </div>
                  <div className="text-xs text-slate-400 italic">Changes saved automatically</div>
                </div>
                <div className="print:fixed print:inset-0 print:z-[100] print:bg-white overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-indigo-100/50">
                  <ResumePreview data={data} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <JobSearch resumeData={data} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">
            © 2024 ResumeAutomator. Built with Gemini AI.
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
