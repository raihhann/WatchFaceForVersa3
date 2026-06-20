# Minimalist Digital Watchface

A sleek, highly readable, and deeply optimized digital watchface built for Fitbit OS 5 devices (Versa 3 and Sense). This design features a split-layout presentation for time and date alongside a dynamic 5-second interval metric carousel tracking daily health progress.

---

## 📱 Demo

![Watchface Active Demo](./Img/demo.mp4)

---

## ✨ Features

* **Ultra-Readable Typography:** Up-scaled system fonts (`124px` for hours, `84px` for minutes) maximized for higher pixel-density OLED displays.
* **Perfect Visual Balance:** Geometrically centered cross-axis split screen separated by a clean accent divider line.
* **Dynamic Resource Carousel:** A smart 5-second loop tracking active stats without cluttering the screen real estate:
    * **0–5 Seconds:** Total Daily Steps (`emojis/running-shoe.png`)
    * **5–10 Seconds:** Total Accumulated Calories—combining Active Burn and Basal Metabolic Rate (BMR) (`emojis/cal_icon.png`)
    * **10–15 Seconds:** Precise Location-Based Distance Traveled (`emojis/location.png`)
* **Smart Localization:** Automatically detects system configuration profiles to render distance measurements cleanly in either miles (`mi`) or kilometers (`km`).
* **Thread-Safe Asset Performance:** Utilizes graphic canvas memory flush handlers to ensure custom emoji textures never flicker or vanish during interval swaps.

---

## 📁 Project Architecture

```text
WATCHFACE/
├── app/
│   └── index.js          # Core device application script logic
├── build/                # Compiled production distribution files (.fba)
├── Img/
│   └── demo.mp4          # Workspace performance preview asset
├── node_modules/         # Package development dependencies 
├── resources/
│   ├── emojis/           # Custom metric asset PNG collection
│   └── index.view        # SVG XML layout declaration file
├── package-lock.json
├── package.json          # Target hardware and system capabilities
└── tsconfig.json         # TypeScript/JavaScript engine configuration