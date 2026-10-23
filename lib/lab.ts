// A starter collection for the Lab preview. Replace these sample picks freely.
export const labSections = [
  { id: "life", title: "Life lately", color: "#eae3d2", accent: "#ff645f", text: "#151313", subtitle: "A few things from my corner." },
  { id: "games", title: "Games", color: "#a4b8c4", accent: "#a4b8c4", text: "#111111", subtitle: "The ones that stayed with me." },
  { id: "music", title: "Music", color: "#274cff", accent: "#a7e5ff", text: "#fff9e9", subtitle: "On repeat, forever." },
  { id: "projects", title: "Projects", color: "#00d5db", accent: "#00d5db", text: "#111111", subtitle: "Things I make, just because." },
  { id: "odds", title: "Odds & ends", color: "#ff4c78", accent: "#ff799a", text: "#151313", subtitle: "Things with nowhere else to go." },
] as const;

export type LabSection = (typeof labSections)[number]["id"];
export function isLabSection(value: string): value is LabSection {
  return labSections.some(section => section.id === value);
}

export const lifeEntries = [
  { label: "Making", title: "A little room on the internet.", body: "Trying things, moving things around, and seeing what sticks. This corner is allowed to be a work in progress." },
  { label: "Playing", title: "One more run. Probably.", body: "A small stack of games, a very long backlog, and absolutely no promise to finish them in order." },
  { label: "Thinking about", title: "Making things just because.", body: "Some ideas do not need a business plan. Sometimes it is enough that they would be fun to make." },
];

export const games = [
  { title: "Bloodborne", tag: "A beautiful nightmare", genre: "Action / atmosphere", story: "Strange streets, quiet dread, and the pull of whatever waits around the next corner. A world to get lost in, one more attempt at a time.", image: "/lab/games/bloodborne.webp", imageAlt: "A hunter exploring a candlelit hall in Bloodborne's Cainhurst Castle.", source: "https://blog.playstation.com/archive/2014/11/20/new-bloodborne-environments-characters-weapons-unveiled/", credit: "PlayStation / FromSoftware", palette: { surface: "#10171b", paper: "#27383f", accent: "#c9bdab", text: "#f2e9da", muted: "#b3b9b8" } },
  { title: "ULTRAKILL", tag: "Keep moving. Make it stylish.", genre: "FPS / movement", story: "Speed, precision, and a little controlled chaos. Finding a rhythm in the middle of everything, then trying to do it a little better.", image: "/lab/games/ultrakill.webp", imageAlt: "A fast-paced first-person combat scene from ULTRAKILL.", source: "https://store.steampowered.com/app/1229490/ULTRAKILL/", credit: "Hakita / New Blood Interactive", palette: { surface: "#1a1013", paper: "#422329", accent: "#ff7d68", text: "#fff0e4", muted: "#cbb8b5" } },
  { title: "Terraria", tag: "One more thing to build", genre: "Sandbox / exploration", story: "A small beginning with room for a very big adventure. Digging a little deeper, building something unnecessary, and seeing where the world leads next.", image: "/lab/games/terraria.webp", imageAlt: "A colorful pixel-art world and player-built structures in Terraria.", source: "https://store.steampowered.com/app/105600/Terraria/", credit: "Re-Logic", palette: { surface: "#101a14", paper: "#293e31", accent: "#add58d", text: "#f1efdb", muted: "#b8c9b3" } },
  {
    title: "Darkest Dungeon 1",
    tag: "A little light against the dark",
    genre: "Turn-based RPG / gothic horror",
    story: "A flickering torch, a battered party, and the decision to go one room further. Every expedition is a gamble, and making it home feels like a story of its own.",
    image: "/lab/games/darkest-dungeon.webp",
    imageAlt: "Four adventurers face a group of skeletal enemies in the gothic ruins of Darkest Dungeon.",
    source: "https://store.steampowered.com/app/262060/Darkest_Dungeon/",
    credit: "Red Hook Studios",
    palette: { surface: "#191411", paper: "#3c2d25", accent: "#e4b56e", text: "#f3e7d3", muted: "#c7b7a0" },
  },
  {
    title: "Resident Evil 4 Remake",
    tag: "Stay sharp. Keep a way out.",
    genre: "Survival horror / action",
    story: "A quiet forest, a village that feels wrong, and barely enough room to breathe. The tension lives in every narrow escape and every carefully saved round.",
    image: "/lab/games/resident-evil-4.webp",
    imageAlt: "Leon walks through a misty forest toward a weathered wooden cross in Resident Evil 4 Remake.",
    source: "https://store.steampowered.com/app/2050650/Resident_Evil_4/",
    credit: "CAPCOM",
    palette: { surface: "#0c1719", paper: "#223b3d", accent: "#a4c6bc", text: "#e8eeea", muted: "#b0c3be" },
  },
  {
    title: "Hollow Knight",
    tag: "A world to get lost in",
    genre: "Metroidvania / exploration",
    story: "Getting a little lost, finding a secret path, and hearing that piano again. A quiet, strange kingdom that rewards curiosity, one small discovery at a time.",
    image: "/lab/games/hollow-knight.webp",
    imageAlt: "The Knight battles flying enemies among lanterns and tall pillars in Hollow Knight.",
    source: "https://store.steampowered.com/app/367520/Hollow_Knight/",
    credit: "Team Cherry",
    palette: { surface: "#151521", paper: "#333047", accent: "#c1b8e8", text: "#eeecf6", muted: "#bdb9d0" },
  },
];

export const musicAlbums = [
  {
    title: "Getting Killed",
    artist: "Geese",
    year: "2025",
    spotifyId: "0eeXb23yMW6EaIgm63xxPC",
    url: "https://open.spotify.com/album/0eeXb23yMW6EaIgm63xxPC",
    cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0245e82ae0372a50834825c018",
  },
];

export const labProjects = [
  { title: "This little lab", status: "In progress", description: "An off-duty corner of the internet. A place to play with type, sound, color, and ideas that do not fit anywhere else.", note: "You are already inside this experiment. Take a look around.", href: "#odds", action: "Keep exploring" },
  { title: "Cardio", status: "Experiment", description: "Small, deliberate practice sessions across development, systems, and the cloud. Making room for learning one exercise at a time.", note: "The collection lives alongside the rest of my portfolio.", href: "/side-projects", action: "Explore the collection" },
  { title: "The next thing", status: "Idea", description: "An empty page for a tiny tool, an unnecessary invention, or that idea that keeps coming back at 1 a.m.", note: "Nothing to launch yet. That is part of the fun.", href: "mailto:fathulbilad@gmail.com?subject=A%20little%20idea", action: "Start a conversation" },
];

export const oddNotes = [
  { label: "A thought", title: "Something worth keeping.", body: "Make things that you would like to find. Even if they are small. Even if they are strange. Especially if they make you curious." },
  { label: "A find", title: "Follow the interesting thing.", body: "A color combination. A pause menu. A line in a song. The best ideas sometimes start with noticing something and wondering what else it could become." },
  { label: "A little list", title: "A few good ingredients.", body: "A little empty space. An unusual typeface. A color that feels a bit too loud. A good soundtrack. Enough time to get pleasantly distracted." },
];
