import React from 'react';
import { BookOpenIcon } from '../components/IconComponents';

interface Course {
  title: string;
  category: string;
  progress: number;
  badge: string;
  isAR?: boolean;
}

const courses: Course[] = [
  { title: "Intro to Drip Irrigation", category: "Water Management", progress: 100, badge: '💧' },
  { title: "Organic Pest Control", category: "Sustainability", progress: 75, badge: '🐞' },
  { title: "Soil Health Fundamentals", category: "Crop Science", progress: 40, badge: '🌱' },
  { title: "AR Crop Disease Guide", category: "Technology", progress: 10, badge: '🔬', isAR: true },
  { title: "Blockchain in Supply Chain", category: "Business", progress: 0, badge: '🔗' },
  { title: "Advanced Fertilizers", category: "Crop Science", progress: 0, badge: '🧪' },
  { title: "Market Price Analysis", category: "Business", progress: 90, badge: '📈' },
  { title: "Drone Farming Basics", category: "Technology", progress: 25, badge: '🚁' },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className={`bg-brand-gray-light p-4 rounded-xl shadow-lg flex flex-col justify-between border-2 ${course.isAR ? 'border-purple-500' : 'border-transparent'}`}>
    <div>
      <div className="flex justify-between items-start">
        <p className="text-xs font-semibold text-brand-green-light">{course.category}</p>
        <span className="text-2xl">{course.badge}</span>
      </div>
      <h3 className="font-bold text-white mt-2 h-12">{course.title}</h3>
      {course.isAR && (
        <div className="my-2 bg-purple-900/50 text-purple-300 text-xs font-bold text-center py-1 rounded-full">
            AR ENABLED
        </div>
      )}
    </div>
    <div>
      <div className="w-full bg-brand-gray-dark rounded-full h-2.5 mt-4">
        <div className="bg-brand-green h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
      </div>
      <p className="text-xs text-gray-400 mt-1 text-right">{course.progress}% Complete</p>
    </div>
  </div>
);

export const LearningHubView: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-6">
            <div className="bg-brand-gray p-6 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Welcome to the AI Farming Academy</h2>
                    <p className="text-gray-400">Earn badges and level up your farming skills!</p>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-300">Your Rank</p>
                    <p className="text-3xl font-bold text-brand-green">Agri-Expert</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => <CourseCard key={course.title} course={course} />)}
            </div>
        </div>
    );
};
