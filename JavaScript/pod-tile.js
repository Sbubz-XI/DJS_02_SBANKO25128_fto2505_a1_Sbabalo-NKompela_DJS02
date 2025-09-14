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
          padding: 1rem;
          height: 90%;
          display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .tile:hover { transform: scale(1.05); }
        img { 
            width: 100%; 
            height: 15rem; 
            object-fit: cover; 
            border-radius: 0.5rem;  
            display: block; 
            margin: 0 auto; }
        .content { 
            padding-left: 1rem; 
        }
        .title { 
            font-size: 1.1rem; 
            font-weight: 800; 
            margin-top: 0.5rem;
            margin-bottom: 0.5rem; 
        }
        .genres { 
            font-size: 0.9rem;
            margin-top: 0.5rem; 
            font-weight: 700; 
            color: #374151; 
            display: flex; 
            flex-wrap: wrap; 
            gap: 0.25rem; 
        }
        .updated { 
            margin-top: 0.5rem; 
            color: #6b7280; 
            font-weight: 500; 
        }
      </style>
      <div class="tile">
        <img src="${podcast.image}" alt="${podcast.title}">
        <div class="content">
          <div class="title">${podcast.title}</div>
          <div class="genres">${this.getGenreTitles(podcast.genres)}</div>
          <div class="updated">Updated ${timeAgo(podcast.updated)}</div>
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
}

function timeAgo(dateStr) {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    console.warn("Invalid date:", dateStr);
    return "Unknown date";
  }

  const now = Date.now();
  let diffDays = Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

customElements.define("podcast-tile", PodcastTile);
