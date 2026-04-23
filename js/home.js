const API_URL = "http://localhost:42069/series"


window.addEventListener('load', async () => {
    // resetear el input del topbar porque por alguna razón nunca se reseteaba
    document.querySelector(".topbar-search").value = ""

    // load inicial
    const resp = await fetch(API_URL)
    const series = await resp.json()

    const table = document.querySelector(".content-table")
    for (const s of series) {
        const tr = document.createElement("tr")

        const cover = document.createElement("td")
        const img = document.createElement("img")
        img.setAttribute("src", s.img_src)
        cover.appendChild(img)

        const text_desc = document.createElement("td")
        const text_descElement = document.createElement("p")
        text_descElement.classList.add("series-description")
        text_descElement.append(s.name, document.createElement("br"), document.createElement("br"), s.description)
        text_desc.appendChild(text_descElement)
        const current_episode = document.createElement("td")
        const current_episodeElement = document.createElement("p")
        current_episodeElement.textContent = s.current_episode
        current_episode.appendChild(current_episodeElement)

        const total_episodes = document.createElement("td")
        const total_episodesElement = document.createElement("p")
        total_episodesElement.textContent = s.total_episodes
        total_episodes.appendChild(total_episodesElement)

        /*
        const rating = document.createElement("td")
        const ratingElement = document.createElement("p")
        ratingElement.textContent = "Working on it"
        rating.appendChild(ratingElement)
        */
        tr.append(cover, text_desc, current_episode, total_episodes)
        table.appendChild(tr)
    }
})
