# MEMORY.md - Long-Term Memory

## The User
- Runs a Mac Mini
- Not a developer — relies on the agent to build things
- Working on a mobile game called **Gridlock**

## Gridlock Project
- Rush Hour clone for iPhone (Expo React Native)
- Daily 90-second sprint, same puzzles for all users each day
- Shareable results, streak system
- Monetization: free core + rewarded ads + Gridlock Pro subscription + puzzle packs
- Codebase at: https://github.com/mRichardson777/gridlock

### Current State (March 30, 2026)
Working prototype running in Expo Go on user's iPhone. Completed today:
- Game engine (move validation, collision detection, win condition)
- Design system: clean/modern — warm off-white, red car hero, navy results screen
- 6x6 draggable game board
- 5 verified solvable puzzles (Easy → Hard) per daily session
- 90-second countdown timer (green → yellow → red urgency)
- Multi-puzzle session flow with puzzle counter (1/5, 2/5, etc.)
- Results screen: navy score card, gold streak badge, green "tomorrow" card
- Wordle-style share card with 🟦 blue squares
- All pushed to GitHub

### Design Decisions
- Clean & modern aesthetic (Option 1) — minimal, premium feel
- Red reserved for game only (car, timer urgency)
- Navy/gold/green for results screen (calm celebration)
- 🟦 blue squares in share card (matches results screen)
- 600ms pause before solved celebration appears
- Timer starts on first move (not on screen load)

### Still To Build
- Streak persistence (AsyncStorage)
- Real puzzle library (more days of content)
- App icon + splash screen
- Monetization (ads, Pro subscription, puzzle packs)
- App Store submission

## Lessons Learned
- Always push to GitHub — local workspace can be wiped during reinstalls
- Visual style preference still needed

## GitHub
- Username: mRichardson777
- Repo: https://github.com/mRichardson777/gridlock
- Token stored in git remote URL (credential embedded)
- Workspace is connected and first push completed
