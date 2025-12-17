# FlashLearn - Calculus Edition

A modern, dark-themed FlashCard application meant to optimize your learning process using spaced repetition.

## Features
- **Smart Learning**: Uses a weighted random selection algorithm to show you cards you struggle with more often.
- **LaTeX Support**: Renders complex mathematical formulas beautifully using KaTeX.
- **Modern UI**: Sleek dark mode with neon green accents for a premium feel.
- **Interactive**: Smooth flip animations and instant feedback controls.

## Setup & Installation

1. **Clone the repository** (if applicable) or download the source.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Customization
- Replace `src/cards_calculus.csv` with your own flashcards.
- Format: `Fronte;Retro` (Semicolon separated).
- Supports LaTeX math enclosed in `$  $` (e.g., `$\int_0^1 x dx$`).

## Technologies
- React + Vite
- Framer Motion (Animations)
- Papaparse (CSV Handling)
- KaTeX (Math Rendering)
- Lucide React (Icons)
