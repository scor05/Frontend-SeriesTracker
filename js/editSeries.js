const API_URL = "http://localhost:42069/series"

function getCurrentSeriesID() {
    const params = new URLSearchParams(window.location.search)
    const currentID = Number.parseInt(params.get("id"), 10)

    if (Number.isNaN(currentID)) {
        throw new Error("No se encontro un ID de serie valido para editar.")
    }

    return currentID
}

async function loadSeriesData() {
    const currentID = getCurrentSeriesID()
    const response = await fetch(`${API_URL}/${currentID}`)

    if (!response.ok) {
        throw new Error("No se pudo cargar la serie a editar.")
    }

    const serie = await response.json()
    const title = document.querySelector(".content-title")
    const nameInput = document.querySelector("#series-name")
    const descriptionInput = document.querySelector("#series-description")
    const currentEpisodeInput = document.querySelector("#series-current-episode")
    const totalEpisodesInput = document.querySelector("#series-total-episodes")
    const imageUrlInput = document.querySelector("#series-image-url")

    title.textContent = `Editando serie: ${serie.name}`
    nameInput.placeholder = serie.name
    descriptionInput.placeholder = serie.description
    currentEpisodeInput.placeholder = serie.current_episode
    totalEpisodesInput.placeholder = serie.total_episodes
    imageUrlInput.placeholder = serie.img_src

    nameInput.value = serie.name
    descriptionInput.value = serie.description
    currentEpisodeInput.value = serie.current_episode
    totalEpisodesInput.value = serie.total_episodes
    imageUrlInput.value = serie.img_src
}

async function deleteSeries(event) {
    event?.preventDefault()

    document.querySelector(".content-form-buttons").querySelector(".content-form-submit").disabled = true
    document.querySelector(".content-form-buttons").querySelector(".content-form-delete").disabled = true

    const currentID = getCurrentSeriesID()
    const seriesName = document.querySelector(".content-title").textContent.slice(16)
    if (confirm(`¿Está seguro que desea eliminar la serie ${seriesName}?`)) {
        const resp = await fetch(`${API_URL}/${currentID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await resp.json().catch(() => null)
        if (!resp.ok) {
            throw new Error(data?.Error || "Error eliminando la serie actual")
        } else {
            alert(`Serie ${seriesName} eliminada exitosamente`)
            window.location.href = "../"
        }
    }
}


async function putSeries(event) {
    event?.preventDefault()

    const formButtonsDiv = document.querySelector(".content-form-buttons")
    const submitButton = formButtonsDiv.querySelector(".content-form-submit")
    const currentID = getCurrentSeriesID()

    const nameInput = document.querySelector("#series-name")
    const descriptionInput = document.querySelector("#series-description")
    const currentEpisodeInput = document.querySelector("#series-current-episode")
    const totalEpisodesInput = document.querySelector("#series-total-episodes")
    const imageUrlInput = document.querySelector("#series-image-url")

    const name = nameInput.value.trim()
    const description = descriptionInput.value.trim()
    const currentEpisode = Number.parseInt(currentEpisodeInput.value, 10)
    const totalEpisodes = Number.parseInt(totalEpisodesInput.value, 10)
    const imageUrl = imageUrlInput.value.trim()

    if (!name) {
        alert("El nombre de la serie es obligatorio.")
        return
    }

    if (Number.isNaN(currentEpisode) || Number.isNaN(totalEpisodes) || currentEpisode < 0 || totalEpisodes < 1) {
        alert("Los episodios deben ser numeros validos.")
        return
    }

    if (currentEpisode > totalEpisodes) {
        alert("El episodio actual no puede ser mayor que el total de episodios.")
        return
    }

    const serie = {
        name: name,
        description: description,
        current_episode: currentEpisode,
        total_episodes: totalEpisodes,
        img_src: imageUrl,
    }

    submitButton.textContent = "Editando..."
    submitButton.style.width = "150px"
    submitButton.disabled = true

    try {
        const response = await fetch(`${API_URL}/${currentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serie),
        })

        const data = await response.json().catch(() => null)
        if (!response.ok) {
            throw new Error(data?.error || "No se pudo actualizar la serie.")
        }

        alert("Modificacion exitosa")
        window.location.href = "../"
    } catch (error) {
        alert(error.message)
        submitButton.textContent = "Confirmar"
        submitButton.style.width = "150px"
        submitButton.disabled = false
    }
}

window.putSeries = putSeries
window.deleteSeries = deleteSeries

window.addEventListener("load", async () => {
    const submitButton = document.querySelector(".content-form-submit")
    submitButton.style.width = "150px"

    const deleteButton = document.querySelector(".content-form-delete")
    deleteButton.addEventListener("click", deleteSeries)

    const form = document.querySelector(".content-form")
    form.addEventListener("submit", putSeries)

    try {
        await loadSeriesData()
    } catch (error) {
        alert(error.message)
        window.location.href = "../"
    }
})
