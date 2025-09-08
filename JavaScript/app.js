import { podcasts, genres } from "./data.js";
import { initModal } from "./pod-modal.js";

const openModal = initModal();

// Function to get genre titles from genre IDs
function getGenreTitles(ids) {
  return ids
    .map((id) => {
      const title = genres.find((g) => g.id === id)?.title || "Unknown";
      return `<span>${title}</span>`;
    })
    .join("");
}

// Function to calculate days ago from a given date
function daysAgo(updated) {
  const diff = Date.now() - new Date(updated).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Main function to display podcast tiles
function displayPodcasts(podcastList) {
  const container = document.getElementById("podcast-container");
  container.innerHTML = "";

  podcastList.forEach((podcast) => {
    const tile = document.createElement("div");
    tile.classList.add("podcast-tile", "shadow", "overflow-hidden", "bg-white");

    tile.innerHTML = `
      <div class="transition-transform duration-300 ease-in-out hover:scale-105 border border-gray-200 rounded-lg p-4">
        <img src="${podcast.image}" alt="${
      podcast.title
    }" class="w-full h-60 rounded-lg object-cover">
      <div class="pl-1 pt-4 pr-3 pb-1">
        <h2 class="text-lg font-semibold mb-2">${podcast.title}</h2>
        <div class="flex items-center space-x-1">
          <div class="bg-[url('/icons/calendar.png')] h-4 w-4 mr-1.5 bg-cover bg-center"></div>
          <p class="text-sm font-semibold text-gray-500">${
            podcast.seasons
          } Seasons</p>
        </div>
        <p class="text-sm font-bold text-gray-700 mt-3 ml-2.5 mb-3 flex space-x-3">${getGenreTitles(
          podcast.genres
        )}</p>
        <p class="text-sm font-semibold text-[#898f9a] mt-2">Updated ${daysAgo(
          podcast.updated
        )} days ago</p>
      </div>
      </div>
    `;

    tile.addEventListener("click", () => openModal(podcast));

    console.log("Podcast tiles loaded");
    container.appendChild(tile);
  });
}

// Display Podcast Tiles
displayPodcasts(podcasts);
