"use client";

import { Clock3, PlayCircle, Star } from "lucide-react";
import MainLayout from "../components/MainLayout";

const FEATURED = [
  {
    title: "Data Structures and Algorithms",
    chapters: 13,
    items: 149,
    gradient: "from-indigo-500 to-fuchsia-500",
  },
  {
    title: "System Design for Interviews",
    chapters: 10,
    items: 104,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    title: "ML Beginner's Guide",
    chapters: 9,
    items: 72,
    gradient: "from-amber-400 to-rose-400",
  },
  {
    title: "Top Interview Questions",
    chapters: 11,
    items: 130,
    gradient: "from-cyan-700 to-emerald-800",
  },
];

export default function LearnPage() {
  return (
    <MainLayout title="Explore" subtitle="Continue your structured interview preparation tracks">
      <section className="rounded-3xl border border-zinc-700/30 bg-[#eef0f4] p-6 text-zinc-900">
        <p className="text-2xl text-zinc-500">Welcome to</p>
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-6xl font-semibold tracking-tight text-zinc-800">MLBoost Explore</h1>
          <div className="hidden items-center gap-4 text-zinc-400 md:flex">
            <Star className="h-8 w-8" />
            <Clock3 className="h-8 w-8" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-4 text-white">
              <p className="text-sm opacity-90">Continue Previous</p>
              <h2 className="mt-2 text-4xl font-semibold">Data Structures and Algorithms</h2>
            </div>
            <div className="grid grid-cols-3 p-4 text-center">
              <div>
                <p className="text-5xl font-semibold text-zinc-800">13</p>
                <p className="text-sm text-zinc-500">Chapters</p>
              </div>
              <div>
                <p className="text-5xl font-semibold text-zinc-800">149</p>
                <p className="text-sm text-zinc-500">Items</p>
              </div>
              <div>
                <button className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-zinc-700">
                  <PlayCircle className="h-8 w-8" />
                </button>
                <p className="text-sm text-zinc-500">0%</p>
              </div>
            </div>
          </article>

          <div>
            <h3 className="text-5xl font-semibold text-zinc-800">Featured</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {FEATURED.map((course) => (
                <article
                  key={course.title}
                  className={`rounded-2xl bg-gradient-to-br ${course.gradient} p-4 text-white shadow-sm`}
                >
                  <p className="text-sm opacity-90">Interview Crash Course</p>
                  <h4 className="mt-2 text-4xl font-semibold leading-tight">{course.title}</h4>
                  <p className="mt-6 text-sm opacity-90">
                    {course.chapters} chapters · {course.items} lessons
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
