


window.addEventListener('load', async () => {
    // resetear el input del topbar porque por alguna razón nunca se reseteaba
    document.querySelector(".topbar-search").value = "";

    // load inicial
    const resp = await fetch("http://localhost:8080/series");
    const series = await resp.json();

    const table = document.querySelector(".content-table")
    for (const s of series) {
        const tr = document.createElement("tr");
        const cover = document.createElement("td").appendChild(document.createElement("img").src(s.img_src));
        const text_desc = document.createElement("td").appendChild(document.createElement("p").append(s.name, document.createElement("br"), s.description));
        const current_episode = document.createElement("td").appendChild(document.createElement("p").appendChild(s.current_episode))
        const total_episodes = document.createElement("td").appendChild(document.createElement("p").appendChild(s.total_episodes))
        const rating = document.createElement("td").appendChild(document.createElement("p").appendChild("Working on it"))
        tr.appendChild(cover, text_desc, current_episode, total_episodes, rating)
        table.appendChild(tr)
    }

})
