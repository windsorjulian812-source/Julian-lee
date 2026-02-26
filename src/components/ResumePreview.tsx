import React from 'react';
import { ResumeData } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  data: ResumeData;
}

export default function ResumePreview({ data }: Props) {
  return (
    <div id="resume-preview" className="bg-white p-12 shadow-2xl min-h-[1056px] w-full max-w-[816px] mx-auto text-slate-800 font-serif leading-relaxed">
      <header className="border-b-2 border-slate-900 pb-6 mb-8 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">{data.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-slate-600">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-200 mb-3 pb-1">Summary</h2>
          <p className="text-sm">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-200 mb-4 pb-1">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-xs font-sans text-slate-500">{exp.duration}</span>
                </div>
                <div className="text-sm italic mb-2">{exp.company}</div>
                <p className="text-sm whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-200 mb-4 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-sm">{edu.school}</h3>
                  <div className="text-sm italic">{edu.degree}</div>
                </div>
                <span className="text-xs font-sans text-slate-500">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-200 mb-3 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-sm bg-slate-50 px-2 py-1 rounded border border-slate-100">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
