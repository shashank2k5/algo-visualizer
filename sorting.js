const barsContainer = document.getElementById("bars-container");
const speedSlider = document.getElementById("speed");
let array = [];
let abort = false;
let isSorting = false;

const logList = document.getElementById("log-list");

// Complexity Chart
function renderComplexityChart() {
    const ctx = document.getElementById('complexityChart').getContext('2d');

    // Generate data points
    const labels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const nSquared = labels.map(n => n * n);
    const nLogN = labels.map(n => n * Math.log2(n));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'O(n²) - Bubble, Insertion, Selection',
                    data: nSquared,
                    borderColor: '#ef4444', // Red for slower
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'O(n log n) - Merge, Quick',
                    data: nLogN,
                    borderColor: '#22c55e', // Green for faster
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8' }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Elements (n)', color: '#94a3b8' },
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' }
                },
                y: {
                    title: { display: true, text: 'Operations', color: '#94a3b8' },
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' }
                }
            }
        }
    });
}

function addLog(message, type = "default") {
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logList.prepend(entry); // Newest top
    // Keep log clean (max 50 entries)
    if (logList.children.length > 50) {
        logList.lastElementChild.remove();
    }
}

// Generate random array
function generateArray() {
    if (isSorting) return;
    const size = 15; // Fixed reasonable size for visualization
    array = [];
    barsContainer.innerHTML = "";
    if (logList) logList.innerHTML = ""; // Clear logs
    document.getElementById("custom-input").value = "";

    for (let i = 0; i < size; i++) {
        let val = Math.floor(Math.random() * 90) + 10;
        array.push(val);

        // Wrapper for bar and text
        const wrapper = document.createElement("div");
        wrapper.className = "bar-wrapper";

        const bar = document.createElement("div");
        bar.className = "bar";
        // Max height relative to container (approx 300px max height)
        bar.style.height = `${val * 3}px`;

        const label = document.createElement("div");
        label.className = "bar-val";
        label.textContent = val;

        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        barsContainer.appendChild(wrapper);
    }
    addLog(`Generated new random array of size ${size}`, "default");
}

// Delay based on speed slider
function getDelay() {
    // 100 -> 10ms, 1 -> 500ms
    return Math.max(10, 500 - (speedSlider.value * 4.8));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkAbort() {
    if (abort) {
        isSorting = false;
        throw new Error("Aborted");
    }
    await sleep(getDelay());
}

async function updateBar(idx, height, color = null) {
    const wrappers = document.getElementsByClassName("bar-wrapper");
    const bar = wrappers[idx].querySelector(".bar");
    const label = wrappers[idx].querySelector(".bar-val");

    bar.style.height = `${height * 3}px`;
    label.textContent = height;

    if (color) {
        bar.style.backgroundColor = color;
        // Add animation class
        if (color.includes("swap") || color.includes("#ef4444") || color === "red") {
            bar.classList.add("swapping");
            setTimeout(() => bar.classList.remove("swapping"), 300);
        }
    }
}

async function highlight(idx, color) {
    const wrappers = document.getElementsByClassName("bar-wrapper");
    if (wrappers[idx]) {
        wrappers[idx].querySelector(".bar").style.backgroundColor = color;
    }
}

// Helper to swap DOM elements and Array values with animation
async function swap(i, j) {
    const wrappers = document.getElementsByClassName("bar-wrapper");
    const bar1 = wrappers[i];
    const bar2 = wrappers[j];

    // Visual Highlight
    const b1 = bar1.querySelector(".bar");
    const b2 = bar2.querySelector(".bar");
    b1.style.backgroundColor = "var(--bar-swap)";
    b2.style.backgroundColor = "var(--bar-swap)";
    b1.classList.add("swapping");
    b2.classList.add("swapping");

    // Calculate distance
    const dist = j - i;

    // Apply transform
    // Note: This relies on bars being same width/margin. 
    // We can just swap their positions using transform 100% * dist? 
    // No, absolute pixels is safer or 100% of own width?
    // Let's use getBoundingClientRect for precision or just CSS transform based on known width/gap?
    // Actually, simpler: Wrapper width + margin.
    // Let's assume uniform width.

    // BUT, simply translated swapping:
    bar1.style.transform = `translateX(${100 * dist}%)`;
    bar2.style.transform = `translateX(${-100 * dist}%)`;

    await sleep(getDelay());

    // Reset styles
    bar1.style.transform = "translateX(0)";
    bar2.style.transform = "translateX(0)";
    b1.style.backgroundColor = "var(--bar-default)";
    b2.style.backgroundColor = "var(--bar-default)";
    b1.classList.remove("swapping");
    b2.classList.remove("swapping");

    // Swap in DOM
    // Simplest robust DOM swap:
    // Clone nodes? No, keep references.
    // We want to swap bar1 and bar2 positions.
    // If they are the same, do nothing.
    if (bar1 === bar2) return;

    // Check if adjacent
    const nextI = bar1.nextSibling;
    const nextJ = bar2.nextSibling;

    // If bar1 is right before bar2
    if (nextI === bar2) {
        barsContainer.insertBefore(bar2, bar1);
    }
    // If bar2 is right before bar1
    else if (nextJ === bar1) {
        barsContainer.insertBefore(bar1, bar2);
    }
    // General case
    else {
        barsContainer.insertBefore(bar1, nextJ);
        barsContainer.insertBefore(bar2, nextI);
    }

    // Swap global array
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}


// Bubble Sort
async function bubbleSort() {
    try {
        isSorting = true;
        abort = false;
        const n = array.length;
        addLog("Starting Bubble Sort", "default");

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                await checkAbort();
                await highlight(j, "var(--bar-compare)");
                await highlight(j + 1, "var(--bar-compare)");

                if (array[j] > array[j + 1]) {
                    addLog(`Swap: ${array[j]} > ${array[j + 1]}`, "swap");
                    await swap(j, j + 1);
                }

                await highlight(j, "var(--bar-default)");
                await highlight(j + 1, "var(--bar-default)");
            }
            await highlight(n - i - 1, "var(--bar-sorted)");
        }
        await highlight(0, "var(--bar-sorted)");
        addLog("Bubble Sort Complete", "sorted");
    } catch (e) {
        if (e.message !== "Aborted") console.error(e);
        addLog("Sorting Aborted", "swap");
    } finally {
        isSorting = false;
    }
}

// Selection Sort
async function selectionSort() {
    try {
        isSorting = true;
        abort = false;
        const n = array.length;
        addLog("Starting Selection Sort", "default");

        for (let i = 0; i < n; i++) {
            let minIdx = i;
            await highlight(i, "var(--bar-swap)");

            for (let j = i + 1; j < n; j++) {
                await checkAbort();
                await highlight(j, "var(--bar-compare)");

                if (array[j] < array[minIdx]) {
                    if (minIdx !== i) await highlight(minIdx, "var(--bar-default)");
                    minIdx = j;
                    await highlight(minIdx, "var(--bar-swap)");
                } else {
                    await highlight(j, "var(--bar-default)");
                }
            }

            if (minIdx !== i) {
                addLog(`Swap: Found min ${array[minIdx]}, swapping with ${array[i]}`, "swap");
                await swap(i, minIdx);
                // Note: after swap, indices in DOM changed?
                // swap(i, minIdx) swaps array[i] and array[minIdx] AND DOM nodes.
                // So array[i] is now the min val. Correct.
            }
            await highlight(minIdx, "var(--bar-default)");
            await highlight(i, "var(--bar-sorted)");
        }
        addLog("Selection Sort Complete", "sorted");
    } catch (e) {
        if (e.message !== "Aborted") console.error(e);
        addLog("Sorting Aborted", "swap");
    } finally { isSorting = false; }
}

// Insertion Sort
async function insertionSort() {
    try {
        isSorting = true;
        abort = false;
        const n = array.length;
        addLog("Starting Insertion Sort", "default");

        for (let i = 1; i < n; i++) {
            let j = i;
            await highlight(i, "var(--bar-swap)");

            while (j > 0 && array[j - 1] > array[j]) {
                await checkAbort();
                await highlight(j - 1, "var(--bar-compare)");

                addLog(`Swap: ${array[j - 1]} > ${array[j]}`, "swap");
                await swap(j - 1, j);

                await highlight(j, "var(--bar-sorted)"); // part of sorted section
                j--;
            }
            await highlight(j, "var(--bar-sorted)");

            for (let k = 0; k <= i; k++) await highlight(k, "var(--bar-sorted)");
        }
        addLog("Insertion Sort Complete", "sorted");
    } catch (e) {
        if (e.message !== "Aborted") console.error(e);
        addLog("Sorting Aborted", "swap");
    } finally { isSorting = false; }
}

// Merge Sort
// Merge sort is hard to animate with direct swaps because it's auxiliary.
// We'll stick to height updates for Merge Sort for now, or just leave it. 
// Adding log for consistency.
async function mergeSortVisualizer(low, high) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);
    await mergeSortVisualizer(low, mid);
    await mergeSortVisualizer(mid + 1, high);
    await merge(low, mid, high);
}

async function merge(low, mid, high) {
    try {
        let left = low;
        let right = mid + 1;
        let temp = [];

        while (left <= mid && right <= high) {
            await checkAbort();
            await highlight(left, "var(--bar-compare)");
            await highlight(right, "var(--bar-compare)");

            if (array[left] < array[right]) {
                temp.push(array[left]);
                await highlight(left, "var(--bar-default)");
                left++;
            } else {
                temp.push(array[right]);
                await highlight(right, "var(--bar-default)");
                right++;
            }
        }

        while (left <= mid) {
            await checkAbort();
            temp.push(array[left]);
            left++;
        }

        while (right <= high) {
            await checkAbort();
            temp.push(array[right]);
            right++;
        }

        for (let i = 0; i < temp.length; i++) {
            await checkAbort();
            array[low + i] = temp[i];
            addLog(`Merge: Writing ${temp[i]} to index ${low + i}`, "swap");
            await updateBar(low + i, temp[i], "var(--bar-sorted)");
        }
    } catch (e) { throw e; }
}

// Events
document.getElementById("generate").addEventListener("click", () => {
    document.getElementById("custom-input").value = ""; // Clear input on random gen
    generateArray();
});

document.getElementById("custom-input").addEventListener("change", (e) => {
    const val = e.target.value;
    const parts = val.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));

    if (parts.length > 0) {
        if (isSorting) {
            abort = true;
            isSorting = false;
        }
        array = parts.slice(0, 30); // Limit to reasonable size
        barsContainer.innerHTML = "";
        if (logList) logList.innerHTML = ""; // Clear logs

        // Find max for scaling
        const maxVal = Math.max(...array);

        array.forEach(val => {
            const wrapper = document.createElement("div");
            wrapper.className = "bar-wrapper";

            const bar = document.createElement("div");
            bar.className = "bar";
            // Scale height relative to max, max height 300px
            // Prevent div by zero if max is 0
            const height = maxVal > 0 ? (val / maxVal) * 280 : 0;
            bar.style.height = `${Math.max(height, 5)}px`; // Min height visibility

            const label = document.createElement("div");
            label.className = "bar-val";
            label.textContent = val;

            wrapper.appendChild(bar);
            wrapper.appendChild(label);
            barsContainer.appendChild(wrapper);
        });
    }
});

document.getElementById("stop").addEventListener("click", () => {
    if (isSorting) {
        abort = true;
    }
});



// Quick Sort
async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);

        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    await highlight(high, "var(--bar-swap)"); // Pivot visual

    let i = (low - 1); // Index of smaller element

    for (let j = low; j <= high - 1; j++) {
        await checkAbort();
        await highlight(j, "var(--bar-compare)"); // Compare visual

        if (array[j] < pivot) {
            i++;
            // Swap
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            await updateBar(i, array[i]);
            await updateBar(j, array[j]);
        }
        await highlight(j, "var(--bar-default)"); // Reset compare visual
    }
    // Swap pivot to correct position
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    await updateBar(i + 1, array[i + 1]);
    await updateBar(high, array[high]);

    await highlight(high, "var(--bar-default)"); // Reset pivot visual
    await highlight(i + 1, "var(--bar-sorted)"); // Sorted position visual

    return (i + 1);
}

document.getElementById("sort").addEventListener("click", () => !isSorting && bubbleSort());
document.getElementById("selection").addEventListener("click", () => !isSorting && selectionSort());
document.getElementById("insertion").addEventListener("click", () => !isSorting && insertionSort());
document.getElementById("merge").addEventListener("click", async () => {
    if (!isSorting) {
        try {
            isSorting = true;
            abort = false;
            await mergeSortVisualizer(0, array.length - 1);
        } catch (e) { } finally { isSorting = false; }
    }
});
document.getElementById("quick").addEventListener("click", async () => {
    if (!isSorting) {
        try {
            isSorting = true;
            abort = false;
            await quickSort(0, array.length - 1);
            // Final green sweep
            for (let i = 0; i < array.length; i++) await highlight(i, "var(--bar-sorted)");
        } catch (e) { } finally { isSorting = false; }
    }
});

// Init
generateArray();
renderComplexityChart();