# FlashLearn

A modern, dark-themed FlashCard application optimizing learning through spaced repetition. Now supporting multiple decks and course-specific themes.

## Features
- **Spaced Repetition System (SRS)**: Implements the **SM-2 algorithm** (similar to Anki) to efficiently schedule reviews based on card difficulty (Again, Hard, Good, Easy).
- **Multiple Decks**:
    - **Calculus**: Math & Analysis (Green Theme).
    - **LPP**: Programming Languages & Functional Programming (Blue Theme).
- **Deck-Specific Theming**: dynamic color accents based on the selected course.
- **LaTeX Support**: Renders complex mathematical formulas using KaTeX.
- **Modern UI**: Sleek dark mode, glassmorphism effects, and smooth animations.
- **Progress Tracking**: Visualizes card maturity (New, Learning, Mature).

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Customization
- **Cards**:
    - `src/cards_calculus.csv` (Default Calculus deck)
    - `src/cards_lpp.csv` (LPP deck)
- **Format**: `Fronte;Retro` (Semicolon separated).
- **Math**: Supports standard LaTeX math enclosed in `$ ... $`.

## Technologies
- React + Vite
- Framer Motion (Animations)
- Papaparse (CSV Handling)
- KaTeX (Math Rendering)
- Lucide React (Icons)

## Deployed version
https://vizz77.github.io/Analisi-FlashCard/