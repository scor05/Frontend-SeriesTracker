const API_URL = "http://localhost:42069/series"

const getSearchTerm = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get("q")?.trim() || ""
}

const updateSearchQuery = (searchTerm) => {
    const params = new URLSearchParams(window.location.search)
    if (searchTerm === "") {
        params.delete("q")
    } else {
        params.set("q", searchTerm)
    }

    const queryString = params.toString()
    const nextURL = queryString === "" ? window.location.pathname : `${window.location.pathname}?${queryString}`
    window.history.replaceState({}, "", nextURL)
}

const clearTable = () => {
    const table = document.querySelector(".content-table")
    table.querySelectorAll(".content-table-row, .content-table-empty-row").forEach((row) => row.remove())
    return table
}

const renderEmptyState = (table) => {
    const tr = document.createElement("tr")
    tr.classList.add("content-table-empty-row")

    const td = document.createElement("td")
    td.colSpan = 4

    const input = document.querySelector(".topbar-search").value.trim()
    const text = document.createElement("p")
    text.textContent = "No se encontraron series con el nombre " + "'" + input + "'"

    td.appendChild(text)
    tr.appendChild(td)
    table.appendChild(tr)
}

const renderSeries = (series) => {
    const table = clearTable()

    if (series === null) {
        renderEmptyState(table)
        return
    }

    let i = 0
    for (const s of series) {
        const tr = document.createElement("tr")
        tr.classList.add("content-table-row")
        tr.addEventListener("click", () => {
            window.location.href = `html/editSeries.html?id=${s.id_serie}`
        })
        if (i === series.length) {
            tr.style.borderRadius = "0 0 15px 15px"
        }

        const cover = document.createElement("td")
        if (s.img_src !== "") {
            const img = document.createElement("img")
            img.setAttribute("src", s.img_src)
            cover.appendChild(img)
        } else {
            const img = document.createElement("p")
            img.textContent = "No se encontro una portada"
            cover.appendChild(img)
        }

        const textDesc = document.createElement("td")
        const textDescElement = document.createElement("p")
        textDescElement.classList.add("series-description")
        textDescElement.append(
            s.name,
            document.createElement("br"),
            document.createElement("br"),
            s.description !== "" ? s.description : "No se proveyó descripción"
        )
        textDesc.appendChild(textDescElement)

        const currentEpisode = document.createElement("td")
        const currentEpisodeElement = document.createElement("p")
        currentEpisodeElement.textContent = s.current_episode
        currentEpisode.appendChild(currentEpisodeElement)

        const totalEpisodes = document.createElement("td")
        const totalEpisodesElement = document.createElement("p")
        totalEpisodesElement.textContent = s.total_episodes
        totalEpisodes.appendChild(totalEpisodesElement)

        tr.append(cover, textDesc, currentEpisode, totalEpisodes)
        table.appendChild(tr)
        i++
    }
}

const loadSeries = async (searchTerm) => {
    const requestURL = searchTerm === "" ? API_URL : `${API_URL}?q=${encodeURIComponent(searchTerm)}`
    const response = await fetch(requestURL)

    if (!response.ok) {
        throw new Error("No se pudieron cargar las series.")
    }

    const series = await response.json()
    renderSeries(series)
}

window.addEventListener("load", async () => {
    const searchInput = document.querySelector(".topbar-search")
    const initialSearchTerm = getSearchTerm()
    let searchTimeout = null

    searchInput.value = initialSearchTerm
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.trim()
        updateSearchQuery(searchTerm)

        clearTimeout(searchTimeout)
        searchTimeout = window.setTimeout(async () => {
            try {
                await loadSeries(searchTerm)
            } catch (error) {
                alert(error.message)
            }
        }, 250)
    })

    try {
        await loadSeries(initialSearchTerm)
    } catch (error) {
        alert(error.message)
    }
})
