import { genres } from "./data.js";
import { seasons } from "./data.js";

// modal.js
export function initModal() {
  const modal = document.getElementById("podcast-modal");
  const closeModalBtn = document.getElementById("close-modal");

  closeModalBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  return function openModal(podcast) {
    document.getElementById("modal-image").src = podcast.image;
    document.getElementById("modal-title").textContent = podcast.title;
    document.getElementById("modal-description").textContent =
      podcast.description;

    document.getElementById("modal-genres").innerHTML = podcast.genres
      .map(
        (id) =>
          `<span class="text-md font-bold text-gray-600 px-2 py-1 rounded">${
            genres.find((g) => g.id === id)?.title || "Unknown"
          }</span>`
      )
      .join("");

    const updatedDate = new Date(podcast.updated);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = updatedDate.toLocaleDateString("en-US", options);

    document.getElementById(
      "modal-updated"
    ).textContent = `Last updated: ${formattedDate}`;

    const seasonsContainer = document.getElementById("modal-seasons");
    seasonsContainer.innerHTML = "";

    const podcastSeasons =
      seasons.find((s) => s.id === podcast.id)?.seasonDetails || [];

    podcastSeasons.forEach((season) => {
      const seasonDiv = document.createElement("div");
      seasonDiv.classList.add(
        "relative",
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-4",
        "mb-3"
      );

      seasonDiv.innerHTML = `
        <h3 class="font-semibold">${season.title}</h3>
        <p class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium">
        ${season.episodes} episodes
        </p>`;

      seasonsContainer.appendChild(seasonDiv);
    });

    modal.showModal();
  };
}
