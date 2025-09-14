import { genres, seasons } from "./data.js";

// modal.js
export function initModal() {
  const modal = document.getElementById("podcast-modal");
  const closeModalBtn = document.getElementById("close-modal");

  closeModalBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close();
  });

  return function openModal(podcast) {
    const modalElements = {
      image: document.getElementById("modal-image"),
      title: document.getElementById("modal-title"),
      description: document.getElementById("modal-description"),
      genres: document.getElementById("modal-genres"),
      updated: document.getElementById("modal-updated"),
      seasons: document.getElementById("modal-seasons"),
    };

    modalElements.image.src = podcast.image;
    modalElements.title.textContent = podcast.title;
    modalElements.description.textContent = podcast.description;

    modalElements.genres.innerHTML = podcast.genres
      .map(
        (id) =>
          `<span class="text-md font-bold text-gray-600 px-2 py-1 rounded">${
            genres.find((g) => g.id === id)?.title || "Unknown"
          }</span>`
      )
      .join("");

    const formattedDate = new Date(podcast.updated).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );

    modalElements.updated.textContent = `Last updated: ${formattedDate}`;

    modalElements.updated.innerHTML = "";

    function getSeasonsForPodcast(podcast, seasons) {
      const match = seasons.find((s) => s.id === podcast.id);
      return match ? match.seasonDetails : [];
    }

    const podcastSeasons = getSeasonsForPodcast(podcast, seasons);

    modalElements.seasons.innerHTML = "";

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
    </p>
  `;

      modalElements.seasons.appendChild(seasonDiv);
    });

    modal.showModal();
  };
}
