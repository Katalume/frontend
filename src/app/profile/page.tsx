"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  Eye,
  Github,
  GraduationCap,
  HeartHandshake,
  Linkedin,
  MapPin,
  Trophy,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import { fetchUserProfile } from "@/lib/api";
import { UserProfile } from "@/types";

function heatLevelClass(count: number): string {
  if (count >= 5) {
    return "bg-emerald-500";
  }
  if (count >= 3) {
    return "bg-emerald-400";
  }
  if (count >= 1) {
    return "bg-emerald-300/80";
  }
  return "bg-zinc-800";
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserProfile();
        setProfile(data);
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  const heatmapWeeks = useMemo(() => {
    if (!profile) {
      return [] as UserProfile["heatmap"][];
    }
    const cells = [...profile.heatmap];
    const weeks: UserProfile["heatmap"][] = [];
    while (cells.length > 0) {
      weeks.push(cells.splice(0, 7));
    }
    return weeks.slice(-22);
  }, [profile]);

  return (
    <MainLayout title="Profile" subtitle="Public profile, contest rating, and submission graph">
      {isLoading || !profile ? (
        <div className="rounded-2xl border border-zinc-800 bg-[#171b22] p-10 text-center text-sm text-zinc-400">
          Loading profile...
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[300px_1fr]">
          <aside className="space-y-4">
            <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-950 text-2xl text-amber-400">
                  🦁
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-100">{profile.user.name}</h2>
                  <p className="text-sm text-zinc-400">{profile.user.email}</p>
                  <p className="mt-2 text-3xl font-semibold text-zinc-100">
                    Rank {Math.max(100, 350000 - profile.totalSolved * 7).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Open-source focused ML engineer. Building production-ready interview prep
                flows and platform UX.
              </p>
              <button className="mt-4 w-full rounded-lg bg-emerald-500/20 py-2 text-sm font-medium text-emerald-300">
                Edit Profile
              </button>
            </article>

            <article className="space-y-3 rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <MapPin className="h-4 w-4 text-zinc-500" /> India
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <GraduationCap className="h-4 w-4 text-zinc-500" /> New MLBoost School
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <ExternalLink className="h-4 w-4 text-zinc-500" /> mlboost.dev
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <Github className="h-4 w-4 text-zinc-500" /> @mlboost
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-zinc-300">
                <Linkedin className="h-4 w-4 text-zinc-500" /> /in/mlboost
              </div>
            </article>

            <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Community Stats
              </h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-zinc-300">
                  <Eye className="h-4 w-4 text-cyan-400" /> Views <span>0</span>
                </p>
                <p className="flex items-center gap-2 text-zinc-300">
                  <HeartHandshake className="h-4 w-4 text-pink-400" /> Solution <span>0</span>
                </p>
                <p className="flex items-center gap-2 text-zinc-300">
                  <Trophy className="h-4 w-4 text-amber-400" /> Contest <span>5</span>
                </p>
              </div>
            </article>
          </aside>

          <div className="space-y-4">
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
              <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
                <div className="mb-3 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                      Contest Rating
                    </p>
                    <p className="mt-1 text-4xl font-semibold text-zinc-100">
                      {1380 + profile.totalSolved}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Global Rank</p>
                    <p className="mt-1 text-xl font-semibold text-zinc-100">
                      {Math.max(100, 740000 - profile.totalSolved * 9).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Attended</p>
                    <p className="mt-1 text-xl font-semibold text-zinc-100">5</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Top</p>
                    <p className="mt-1 text-4xl font-semibold text-zinc-100">87.29%</p>
                  </div>
                </div>
                <div className="h-[140px] rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-3">
                  <div className="flex h-full items-end gap-2">
                    {[58, 44, 67, 51, 39].map((value) => (
                      <div
                        key={value}
                        className="w-1/5 rounded-t bg-amber-500/70"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Solved</p>
                <p className="mt-2 text-5xl font-semibold text-zinc-100">
                  {profile.totalSolved}/3860
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                    <span className="text-emerald-300">Easy</span>
                    <span className="text-zinc-300">238/929</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                    <span className="text-amber-300">Medium</span>
                    <span className="text-zinc-300">103/2019</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-800 px-3 py-2 text-sm">
                    <span className="text-rose-300">Hard</span>
                    <span className="text-zinc-300">9/912</span>
                  </div>
                </div>
              </article>
            </section>

            <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-3xl font-semibold text-zinc-100">
                  {profile.heatmap.filter((cell) => cell.count > 0).length} submissions in past year
                </h3>
                <p className="text-sm text-zinc-500">Current streak: {profile.streakDays}</p>
              </div>
              <div className="overflow-x-auto">
                <div className="flex min-w-[780px] gap-1">
                  {heatmapWeeks.map((week, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      {week.map((cell) => (
                        <div
                          key={cell.date}
                          title={`${cell.date}: ${cell.count} submissions`}
                          className={`h-3 w-3 rounded-[2px] ${heatLevelClass(cell.count)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-zinc-800 bg-[#171b22] p-4">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {["Recent AC", "List", "Solutions", "Discuss"].map((item) => (
                  <button
                    key={item}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      item === "Recent AC"
                        ? "bg-zinc-700 text-zinc-100"
                        : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  "Validate Binary Search Tree",
                  "Maximum 69 Number",
                  "Median of Two Sorted Arrays",
                  "KNN Classifier on Iris",
                ].map((title, index) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 px-4 py-3"
                  >
                    <p className="text-sm text-zinc-200">{title}</p>
                    <p className="text-sm text-zinc-500">{index + 1} months ago</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
