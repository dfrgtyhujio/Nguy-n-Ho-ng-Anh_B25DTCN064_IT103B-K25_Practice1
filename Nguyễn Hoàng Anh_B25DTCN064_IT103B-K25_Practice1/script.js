let songs = JSON.parse(localStorage.getItem("songs")) || [];

let editIndex = -1;

renderSongs(songs);

function renderSongs(list) {
    let table = document.getElementById("songTable");
    table.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        table.innerHTML += `
        <tr>
            <td>${list[i].id}</td>
            <td>${list[i].title}</td>
            <td>${list[i].artist}</td>
            <td>
                <button onclick="editSong(${i})">Sửa</button>
                <button onclick="deleteSong(${i})">Xóa</button>
            </td>
        </tr>
        `;
    }
}

function handleSubmit() {

    let title = document.getElementById("title").value.trim();
    let artist = document.getElementById("artist").value.trim();

    if (title === "" || artist === "") {
        alert("Không được để trống!");
        return;
    }

    if (editIndex === -1) {

        let id = songs.length > 0 ? songs[songs.length - 1].id + 1 : 1;

        let song = {
            id: id,
            title: title,
            artist: artist
        };

        songs.push(song);

    } else {

        songs[editIndex].title = title;
        songs[editIndex].artist = artist;

        editIndex = -1;

        document.getElementById("formTitle").innerText = "🎵 Thêm bài hát";
        document.getElementById("submitBtn").innerText = "Thêm";
    }

    localStorage.setItem("songs", JSON.stringify(songs));

    resetForm();

    renderSongs(songs);
}

function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("artist").value = "";
}

function deleteSong(index) {

    let confirmDelete = confirm("Bạn có chắc muốn xóa bài hát này?");

    if (confirmDelete) {
        songs.splice(index, 1);

        localStorage.setItem("songs", JSON.stringify(songs));

        renderSongs(songs);
    }
}

function editSong(index) {

    let song = songs[index];

    document.getElementById("title").value = song.title;
    document.getElementById("artist").value = song.artist;

    document.getElementById("formTitle").innerText = "✏️ Sửa bài hát";
    document.getElementById("submitBtn").innerText = "Cập nhật";

    editIndex = index;
}

function searchSong() {

    let keyword = document.getElementById("search").value.toLowerCase();

    let result = songs.filter(function (song) {
        return song.title.toLowerCase().includes(keyword);
    });

    renderSongs(result);
}