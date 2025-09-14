import { genres } from "./data.js";

// Web Component with Shadow DOM for encapsulation
export class PodcastTile extends HTMLElement {
  constructor(podcast) {
    super();
    this.podcast = podcast;

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .tile {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          background: white;
          transition: transform 0.3s ease-in-out;
          cursor: pointer;
        }
        .tile:hover { transform: scale(1.05); }
        img { width: 100%; height: 15rem; object-fit: cover; border-radius: 0.5rem; }
        .content { padding: 0.75rem; }
        .title { font-weight: 600; margin-bottom: 0.5rem; }
        .genres { margin-top: 0.5rem; font-weight: bold; color: #374151; display: flex; flex-wrap: wrap; gap: 0.25rem; }
        .updated { margin-top: 0.5rem; color: #6b7280; font-weight: 500; }
      </style>
      <div class="tile">
        <img src="${podcast.image}" alt="${podcast.title}">
        <div class="content">
          <div class="title">${podcast.title}</div>
          <div class="genres">${this.getGenreTitles(podcast.genres)}</div>
          <div class="updated">Updated ${this.daysAgo(
            podcast.updated
          )} days ago</div>
        </div>
      </div>
    `;
  }

  getGenreTitles(ids) {
    return ids
      .map((id) => {
        const title = genres.find((g) => g.id === id)?.title || "Unknown";
        return `<span>${title}</span>`;
      })
      .join("");
  }

  daysAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}

// Define the custom element
customElements.define("podcast-tile", PodcastTile);
