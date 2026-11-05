export type Title = {
  id: string;
  name: string;
  year: number;
  kind: "movie" | "series";
  poster: string;
  /** Fallback gradient tint used if the remote poster fails to load */
  tint: [string, string];
  rating: number;
  genre: string;
  runtime?: string;
};

export type Episode = {
  id: string;
  index: number;
  title: string;
  runtime: string;
  watched: boolean;
};

export type Season = {
  id: string;
  label: string;
  episodes: Episode[];
};

const P = "https://image.tmdb.org/t/p/w500";

/* ------------------------------------------------------------------ *
 * All poster paths below were verified reachable against the TMDB CDN *
 * ------------------------------------------------------------------ */

export const movies: Title[] = [
  {
    id: "dune-2",
    name: "Dune: Part Two",
    year: 2024,
    kind: "movie",
    poster: `${P}/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg`,
    tint: ["#c98a3a", "#3a2412"],
    rating: 8.5,
    genre: "Sci-Fi",
    runtime: "2h 46m",
  },
  {
    id: "oppenheimer",
    name: "Oppenheimer",
    year: 2023,
    kind: "movie",
    poster: `${P}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,
    tint: ["#d9622b", "#241009"],
    rating: 8.1,
    genre: "Drama",
    runtime: "3h 0m",
  },
  {
    id: "interstellar",
    name: "Interstellar",
    year: 2014,
    kind: "movie",
    poster: `${P}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,
    tint: ["#2f6d9e", "#0d1c26"],
    rating: 8.4,
    genre: "Sci-Fi",
    runtime: "2h 49m",
  },
  {
    id: "the-batman",
    name: "The Batman",
    year: 2022,
    kind: "movie",
    poster: `${P}/74xTEgt7R36Fpooo50r9T25onhq.jpg`,
    tint: ["#a3271f", "#170a0a"],
    rating: 7.7,
    genre: "Crime",
    runtime: "2h 56m",
  },
  {
    id: "br2049",
    name: "Blade Runner 2049",
    year: 2017,
    kind: "movie",
    poster: `${P}/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg`,
    tint: ["#e07a2f", "#20120a"],
    rating: 7.6,
    genre: "Sci-Fi",
    runtime: "2h 44m",
  },
  {
    id: "spider-verse",
    name: "Across the Spider-Verse",
    year: 2023,
    kind: "movie",
    poster: `${P}/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg`,
    tint: ["#c2316b", "#1b0a20"],
    rating: 8.3,
    genre: "Animation",
    runtime: "2h 20m",
  },
  {
    id: "top-gun",
    name: "Top Gun: Maverick",
    year: 2022,
    kind: "movie",
    poster: `${P}/62HCnUTziyWcpDaBO2i1DX17ljH.jpg`,
    tint: ["#2b7fa5", "#0c1a20"],
    rating: 8.2,
    genre: "Action",
    runtime: "2h 10m",
  },
  {
    id: "eeaaoo",
    name: "Everything Everywhere All at Once",
    year: 2022,
    kind: "movie",
    poster: `${P}/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg`,
    tint: ["#8b3fd1", "#170a24"],
    rating: 7.8,
    genre: "Comedy",
    runtime: "2h 20m",
  },
  {
    id: "furiosa",
    name: "Furiosa",
    year: 2024,
    kind: "movie",
    poster: `${P}/iADOJ8Zymht2JPMoy3R7xceZprc.jpg`,
    tint: ["#c86a2a", "#22120a"],
    rating: 7.5,
    genre: "Action",
    runtime: "2h 29m",
  },
  {
    id: "poor-things",
    name: "Poor Things",
    year: 2023,
    kind: "movie",
    poster: `${P}/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
    tint: ["#3f9d8f", "#0d211f"],
    rating: 7.7,
    genre: "Comedy",
    runtime: "2h 21m",
  },
  {
    id: "john-wick-4",
    name: "John Wick: Chapter 4",
    year: 2023,
    kind: "movie",
    poster: `${P}/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg`,
    tint: ["#b3352f", "#180a0a"],
    rating: 7.9,
    genre: "Action",
    runtime: "2h 49m",
  },
];

export const series: Title[] = [
  {
    id: "breaking-bad",
    name: "Breaking Bad",
    year: 2008,
    kind: "series",
    poster: `${P}/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg`,
    tint: ["#4a8f4a", "#0f1a0f"],
    rating: 8.9,
    genre: "Crime",
  },
  {
    id: "stranger-things",
    name: "Stranger Things",
    year: 2016,
    kind: "series",
    poster: `${P}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,
    tint: ["#b32b2b", "#170a0a"],
    rating: 8.6,
    genre: "Sci-Fi",
  },
  {
    id: "severance",
    name: "Severance",
    year: 2022,
    kind: "series",
    poster: `${P}/lFf6LLrQjYldcZItzOkGmMMigP7.jpg`,
    tint: ["#3f6fa8", "#0d1620"],
    rating: 8.7,
    genre: "Thriller",
  },
  {
    id: "shogun",
    name: "Shōgun",
    year: 2024,
    kind: "series",
    poster: `${P}/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg`,
    tint: ["#a8402f", "#1c0d0a"],
    rating: 8.6,
    genre: "Drama",
  },
  {
    id: "fallout",
    name: "Fallout",
    year: 2024,
    kind: "series",
    poster: `${P}/AnsSKR9LuK0T9bAOcPVA3PUvyWj.jpg`,
    tint: ["#3f8fa8", "#0d1a1f"],
    rating: 8.3,
    genre: "Sci-Fi",
  },
  {
    id: "the-bear",
    name: "The Bear",
    year: 2022,
    kind: "series",
    poster: `${P}/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg`,
    tint: ["#2f6f9e", "#0d1620"],
    rating: 8.5,
    genre: "Comedy",
  },
  {
    id: "andor",
    name: "Andor",
    year: 2022,
    kind: "series",
    poster: `${P}/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg`,
    tint: ["#6f6034", "#191408"],
    rating: 8.4,
    genre: "Sci-Fi",
  },
  {
    id: "hotd",
    name: "House of the Dragon",
    year: 2022,
    kind: "series",
    poster: `${P}/1X4h40fcB4WWUmIBK0auT4zRBAV.jpg`,
    tint: ["#8f3a2f", "#1c0d0a"],
    rating: 8.4,
    genre: "Fantasy",
  },
  {
    id: "mandalorian",
    name: "The Mandalorian",
    year: 2019,
    kind: "series",
    poster: `${P}/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg`,
    tint: ["#8a7038", "#1a1408"],
    rating: 8.4,
    genre: "Sci-Fi",
  },
  {
    id: "the-boys",
    name: "The Boys",
    year: 2019,
    kind: "series",
    poster: `${P}/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg`,
    tint: ["#b33b3b", "#1c0a0a"],
    rating: 8.7,
    genre: "Action",
  },
];

export const allTitles: Title[] = [...movies, ...series];

export const byId = (id: string): Title =>
  allTitles.find((t) => t.id === id) ?? movies[0];

/* --------------------------- App content --------------------------- */

export const trackingFeatures = [
  { icon: "listchecks", title: "Episode-by-episode progress" },
  { icon: "skipforward", title: "Automatic next-up queue" },
  { icon: "circlecheck", title: "Season completion at a glance" },
  { icon: "calendar", title: "Personal viewing calendar" },
  { icon: "sparkles", title: "Live Activities & widgets" },
] as const;

export const severanceSeasons: Season[] = [
  {
    id: "s1",
    label: "Season 1",
    episodes: [
      { id: "s1e1", index: 1, title: "Good News About Hell", runtime: "57m", watched: true },
      { id: "s1e2", index: 2, title: "Half Loop", runtime: "54m", watched: true },
      { id: "s1e3", index: 3, title: "In Perpetuity", runtime: "56m", watched: true },
      { id: "s1e4", index: 4, title: "The You You Are", runtime: "46m", watched: true },
      { id: "s1e5", index: 5, title: "The Grim Barbarity of Optics", runtime: "43m", watched: true },
      { id: "s1e6", index: 6, title: "Hide and Seek", runtime: "47m", watched: false },
      { id: "s1e7", index: 7, title: "Defiant Jazz", runtime: "46m", watched: false },
      { id: "s1e8", index: 8, title: "What's for Dinner?", runtime: "44m", watched: false },
      { id: "s1e9", index: 9, title: "The We We Are", runtime: "40m", watched: false },
    ],
  },
];

export const syncComparisonRows: {
  label: string;
  group?: string;
  values: [string, string, string];
}[] = [
  { label: "Favorite movies / watchlist", values: ["yes", "yes", "yes"] },
  { label: "Watched movies", values: ["yes", "yes", "yes"] },
  { label: "Followed shows / watchlist", values: ["yes", "yes", "yes"] },
  { label: "Watched / unwatched episodes", values: ["yes", "yes", "yes"] },
  { label: "Mark a full season watched", values: ["yes", "yes", "yes"] },
  { label: "\u201cWatched at\u201d activity dates", values: ["yes", "yes", "yes"] },
  { label: "Movie ratings", values: ["yes", "yes", "yes"] },
  { label: "Show ratings", values: ["yes", "yes", "yes"] },
  { label: "Episode ratings", values: ["no", "yes", "yes"] },
  { label: "Custom lists", values: ["yes", "yes", "yes"] },
  { label: "Liked lists", values: ["no", "yes", "yes"] },
  { label: "Create / edit / delete lists", values: ["yes", "yes", "yes"] },
  { label: "Add a title to a custom list", values: ["yes", "yes", "yes"] },
  { label: "ZIP import", values: ["yes", "no", "no"] },
  { label: "Migrate from iCloud", values: ["\u2014", "yes", "yes"] },
  { label: "iCloud \u2192 Trakt", values: ["\u2014", "no", "yes"] },
  { label: "Viewing stats", values: ["yes", "yes", "yes"] },
  { label: "Currently watching (Live Activities)", values: ["yes", "no", "no"] },
  { label: "Widgets", values: ["yes", "no", "no"] },
  { label: "Gamification", values: ["yes", "no", "no"] },
  { label: "Calendar", values: ["yes", "no", "no"] },
  { label: "Notifications", values: ["yes", "no", "no"] },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What can I track with Marquee?",
    a: "Track series, movies, seasons, and individual episodes. Marquee keeps your progress, watchlist, and discoveries together in one place.",
  },
  {
    q: "Can I track individual TV episodes?",
    a: "Yes. Every series is tracked episode by episode. Mark an episode watched with a single tap or swipe and Marquee remembers the season, the episode, and exactly where you left off.",
  },
  {
    q: "Does my watchlist sync across devices?",
    a: "Yes. Your library and viewing progress sync privately through iCloud across your compatible Apple devices. Marquee also supports Trakt and Simkl for syncing, so you can keep your watch history in step with those services too.",
  },
  {
    q: "Can I import my existing watch history?",
    a: "Yes. Marquee connects with services including Trakt and Simkl, making it easy to bring your existing history with you.",
  },
  {
    q: "Is the app free?",
    a: "Yes. Marquee is free to download on iPhone. It includes a free iCloud tier so you can use the app fully before deciding on a subscription.",
  },
  {
    q: "What features require a subscription?",
    a: "The free iCloud tier lets you store up to 30 items and stays effectively unlimited as long as you stay under that mark. Episodes are never counted, and a title only ever counts once whether it sits in your watchlist or your watched list. A subscription unlocks unlimited storage plus cloud providers like Simkl and Trakt with cross-device sync, ratings, custom lists, and remote stats.",
  },
  {
    q: "How is my viewing data protected?",
    a: "Marquee has no advertising trackers and does not sell your viewing activity. Your library remains yours \u2014 synced privately through iCloud and never packaged for an advertising profile.",
  },
];
