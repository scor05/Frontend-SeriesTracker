const API_URL = "http://localhost:42069/series"

async function submitSeriesForm(event) {
    event?.preventDefault()

    const form = document.querySelector(".content-form")
    const submitButton = form.querySelector(".content-form-submit")

    const name = document.querySelector("#series-name").value.trim()
    const description = document.querySelector("#series-description").value.trim()
    const currentEpisode = Number.parseInt(document.querySelector("#series-current-episode").value, 10)
    const totalEpisodes = Number.parseInt(document.querySelector("#series-total-episodes").value, 10)
    const imageUrl = document.querySelector("#series-image-url").value.trim()

    if (!name || !description || !imageUrl) {
        alert("Completa todos los campos antes de agregar la serie.")
        return
    }

    if (Number.isNaN(currentEpisode) || Number.isNaN(totalEpisodes) || currentEpisode < 0 || totalEpisodes < 1) {
        alert("Los episodios ingresados no son números válidos.")
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

    submitButton.disabled = true
    submitButton.textContent = "Agregando..."
    submitButton.style.width = "165px"

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serie),
        })

        const data = await response.json().catch(() => null)
        if (!response.ok) {
            throw new Error(data?.error || "No se pudo agregar la serie.")
        }

        form.reset()
        alert("Creación exitosa")
        window.location.href = "../"
    } catch (error) {
        alert(error.message)
    } finally {
        submitButton.disabled = false
        submitButton.textContent = "Agregar"
        submitButton.style.width = "135px"
    }
}

window.submitSeriesForm = submitSeriesForm

window.addEventListener("load", () => {
    const form = document.querySelector(".content-form")
    form.addEventListener("submit", submitSeriesForm)
})
