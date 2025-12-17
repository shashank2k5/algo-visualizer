@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

:root {
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --accent: #3b82f6;
    --accent-glow: rgba(59, 130, 246, 0.5);
    --bar-default: #6366f1;
    --bar-compare: #eab308;
    --bar-swap: #ef4444;
    --bar-sorted: #22c55e;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-primary);
    font-family: 'Outfit', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

header {
    width: 100%;
    padding: 1.5rem;
    background: rgba(30, 41, 59, 0.8);
    border-bottom: 1px solid #334155;
    text-align: center;
    margin-bottom: 2rem;
}

h1 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

main {
    width: 90%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.controls-container {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    border: 1px solid #334155;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.control-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.buttons-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

label {
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

/* Buttons */
.btn {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: all 0.2s;
    font-size: 0.9rem;
    background: var(--bg-dark);
    color: var(--text-secondary);
    border: 1px solid #334155;
}

.btn:hover {
    background: #252e42;
    color: var(--text-primary);
}

.btn.primary {
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    border: none;
}

.btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn.danger {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.btn.danger:hover {
    background: rgba(239, 68, 68, 0.2);
}

/* Range Slider */
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: var(--bg-dark);
    border-radius: 3px;
    outline: none;
    width: 120px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
    transition: transform 0.1s;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
}

/* Text Input */
input[type="text"] {
    background: var(--bg-dark);
    border: 1px solid #334155;
    color: var(--text-primary);
    padding: 0.6rem;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.9rem;
    outline: none;
    width: 150px;
}

input[type="text"]:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px var(--accent-glow);
}

/* Bars Container styles now handled in layout above, keeping content styles */
#bars-container {
    /* height: 400px;  Removed as it's now controlled by parent layout */
    /* background: var(--bg-card); Removed dup */
    /* border-radius: 16px; Removed dup */
    /* border: 1px solid #334155; Removed dup */
    /* padding: 2rem; Keeping padding might be okay or move to general style */
    background: var(--bg-card);
    border-radius: 16px;
    border: 1px solid #334155;
    padding: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 8px;
    position: relative;
}

.bar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    flex: 1;
    max-width: 50px;
    margin: 0 1px;
    flex-shrink: 0;
    transition: transform 0.3s ease-in-out;
    /* Smooth movement */
}

.bar {
    width: 20px;
    background: var(--bar-default);
    /* Use var for dynamic changes */
    border-radius: 5px 5px 0 0;
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.3);
    transition: height 0.3s ease, background-color 0.3s ease;
}

.bar-val {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
}

/* Visualization Layout */
.visualizer-layout {
    display: flex;
    gap: 1.5rem;
    align-items: stretch;
    height: 400px;
}

#bars-container {
    flex: 3;
    height: 100%;
    margin: 0;
    /* Reset previous margin/padding if needed */
}

/* Log Panel */
#log-container {
    flex: 1;
    height: 100%;
    max-height: none;
    /* Let it fill height */
    background: var(--bg-card);
    border-radius: 16px;
    border: 1px solid #334155;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 250px;
}

#log-container h3 {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #334155;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

#log-list {
    flex: 1;
    overflow-y: auto;
    font-family: monospace;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.log-entry {
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
}

.log-entry.compare {
    border-left: 3px solid var(--bar-compare);
    color: #cbd5e1;
}

.log-entry.swap {
    border-left: 3px solid var(--bar-swap);
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.1);
}

.log-entry.sorted {
    border-left: 3px solid var(--bar-sorted);
    color: #86efac;
}

/* Animation Effects */
@keyframes pulse-swap {
    0% {
        transform: scale(1);
        filter: brightness(1);
    }

    50% {
        transform: scale(1.1);
        filter: brightness(1.5);
    }

    100% {
        transform: scale(1);
        filter: brightness(1);
    }
}

.bar.swapping {
    animation: pulse-swap 0.3s ease-in-out;
    box-shadow: 0 0 10px var(--bar-swap);
    z-index: 10;
}

/* Complexity Chart */
#complexity-container {
    width: 100%;
    background: var(--bg-card);
    border-radius: 16px;
    border: 1px solid #334155;
    padding: 1.5rem;
    margin-top: 1rem;
}

#complexity-container h3 {
    font-size: 1.2rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    text-align: center;
}

#complexityChart {
    width: 100%;
    max-height: 300px;
}

/* ============================================
   RESPONSIVE DESIGN - Mobile First Approach
   ============================================ */

/* Tablet and below (< 1024px) */
@media (max-width: 1024px) {
    main {
        width: 95%;
    }

    h1 {
        font-size: 1.5rem;
    }

    .visualizer-layout {
        flex-direction: column;
        height: auto;
    }

    #bars-container {
        height: 300px;
        min-height: 300px;
    }

    #log-container {
        height: 200px;
        min-height: 200px;
        min-width: auto;
    }
}

/* Mobile (< 640px) */
@media (max-width: 640px) {
    header {
        padding: 1rem;
        margin-bottom: 1rem;
    }

    h1 {
        font-size: 1.3rem;
    }

    main {
        width: 100%;
        padding: 0 0.5rem;
        gap: 1rem;
    }

    /* Controls Container */
    .controls-container {
        padding: 1rem;
        gap: 1rem;
        flex-direction: column;
        align-items: stretch;
    }

    .control-group {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
    }

    .control-group label {
        font-size: 0.85rem;
    }

    /* Buttons */
    .buttons-group {
        flex-direction: column;
        gap: 0.5rem;
    }

    .btn {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        min-height: 44px;
        /* Touch target size */
    }

    /* Inputs */
    input[type="text"] {
        width: 100%;
        padding: 0.75rem;
        font-size: 0.95rem;
    }

    input[type="range"] {
        width: 100%;
    }

    /* Visualizer Layout */
    .visualizer-layout {
        gap: 1rem;
    }

    #bars-container {
        height: 250px;
        min-height: 250px;
        padding: 1rem;
        gap: 4px;
    }

    /* Bars */
    .bar-wrapper {
        max-width: 30px;
        margin: 0;
    }

    .bar {
        width: 12px;
    }

    .bar-val {
        font-size: 0.65rem;
        margin-top: 0.3rem;
    }

    /* Log Container */
    #log-container {
        height: 180px;
        min-height: 180px;
        padding: 0.75rem;
    }

    #log-container h3 {
        font-size: 0.9rem;
        margin-bottom: 0.4rem;
        padding-bottom: 0.4rem;
    }

    #log-list {
        font-size: 0.75rem;
        gap: 3px;
    }

    .log-entry {
        padding: 3px 6px;
    }

    /* Complexity Chart */
    #complexity-container {
        padding: 1rem;
        margin-top: 0.5rem;
    }

    #complexity-container h3 {
        font-size: 1rem;
        margin-bottom: 0.75rem;
    }

    #complexityChart {
        max-height: 250px;
    }
}

/* Extra small mobile (< 375px) */
@media (max-width: 375px) {
    h1 {
        font-size: 1.1rem;
    }

    .btn {
        font-size: 0.85rem;
        padding: 0.7rem 0.8rem;
    }

    #bars-container {
        height: 200px;
        min-height: 200px;
        padding: 0.75rem;
        gap: 2px;
    }

    .bar {
        width: 10px;
    }

    .bar-val {
        font-size: 0.6rem;
    }

    #log-container {
        height: 150px;
        min-height: 150px;
    }

    #log-list {
        font-size: 0.7rem;
    }
}

/* Landscape mobile optimization */
@media (max-width: 900px) and (orientation: landscape) {
    .visualizer-layout {
        flex-direction: row;
        height: 300px;
    }

    #bars-container {
        flex: 2;
        height: 100%;
    }

    #log-container {
        flex: 1;
        height: 100%;
        min-height: auto;
    }
}
