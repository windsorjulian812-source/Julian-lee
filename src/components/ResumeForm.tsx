import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { Plus, Trash2, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addExperience = () => {
    updateField('experience', [...data.experience, { company: '', position: '', duration: '', description: '' }]);
  };

  const removeExperience = (index: number) => {
    updateField('experience', data.experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    updateField('experience', newExp);
  };

  const addEducation = () => {
    updateField('education', [...data.education, { school: '', degree: '', year: '' }]);
  };

  const removeEducation = (index: number) => {
    updateField('education', data.education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    updateField('education', newEdu);
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
          <User className="w-5 h-5" />
          <h2>Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="New York, NY"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Professional Summary</label>
          <textarea
            value={data.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Experienced software engineer with a passion for..."
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
            <Briefcase className="w-5 h-5" />
            <h2>Experience</h2>
          </div>
          <button
            onClick={addExperience}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={index} className="p-4 border border-slate-100 rounded-xl space-y-4 relative group">
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 2020 - Present)"
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
            <GraduationCap className="w-5 h-5" />
            <h2>Education</h2>
          </div>
          <button
            onClick={addEducation}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="p-4 border border-slate-100 rounded-xl space-y-4 relative group">
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
          <Code className="w-5 h-5" />
          <h2>Skills</h2>
        </div>
        <input
          type="text"
          placeholder="Add skills (comma separated)"
          value={data.skills.join(', ')}
          onChange={(e) => updateField('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s !== ''))}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </section>
    </div>
  );
}
