import { podcasts } from "./data.js";
import { initModal } from "./pod-modal.js";
import "./pod-tile.js"; // Registers Web Component

const openModal = initModal();

function displayPodcasts(podcastList) {
  const container = document.getElementById("podcast-container");
  container.innerHTML = "";

  podcastList.forEach((podcast) => {
    const tile = new (customElements.get("podcast-tile"))(podcast);
    tile.addEventListener("click", () => openModal(podcast));
    container.appendChild(tile);
  });
}

displayPodcasts(podcasts);
