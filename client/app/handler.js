import { ui } from "./ui.js";

var handler = {
  showDetail: (event, source) => {
    if (!event.target.parentElement.className.includes("target")) return;
    const id =
      event.target.parentElement.parentElement.firstElementChild.innerText;

    location.replace(`./details.html?search=${source}&id=${id}`);
  },
  deletePlaylist: async () => {
    const dropdown = document.getElementById("sel1");
    const id = dropdown.selectedOptions[0].dataset.id;
    try {
      let res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      //const data = await res.json();
      location.reload();
      /*res = await fetch("/api/playlists");
      const data = await res.json();
      const dropdown = document.getElementById("sel1");
      ui.fillDropdown(data, dropdown);
      handler.printDetail();*/
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  printDetail: async () => {
    const dropdown = document.getElementById("sel1");
    const id = dropdown.selectedOptions[0].dataset.id;
    const tbl = document.getElementById("main-table");
    try {
      const res = await fetch(`/api/details/playlists/${id}`);
      let data = await res.json();

      data = data.map((x) => {
        return {
          Artist: x.Artist,
          Track: x.Track,
          Album: x.Album,
          Milliseconds: x.Milliseconds,
          Delete: x.TrackId,
        };
      });
      if (data.length) {
        ui.printTablePlaylist(data, tbl);
        const del_list = document.getElementsByClassName("del-track");
        for (let item of del_list) {
          item.onclick = async (e) => {
            if (
              confirm(
                "Are you sure to delete selected track from the playlist?"
              )
            )
              await handler.removeTrack(e.target.dataset.id);
          };
        }
      } else {
        tbl.innerHTML = "";
      }
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  removeTrack: async (id) => {
    //console.log(id);
    const dropdown = document.getElementById("sel1");
    const playlistId = dropdown.selectedOptions[0].dataset.id;
    try {
      const res = await fetch(`/api/playlists/${playlistId}/${id}`, {
        method: "DELETE",
      });
      //const data = await res.json();
      await handler.printDetail();
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  fillPlaylists: async () => {
    try {
      const res = await fetch("/api/playlists");
      let data = await res.json();
      const dropdown = document.getElementById("sel1");
      const del_btn = document.getElementById("del-btn");
      const add_btn = document.getElementById("add-btn");
      data = data.map((x) => {
        return { id: x.PlaylistId, name: x.Name };
      });
      ui.fillDropdown(data, dropdown);
      dropdown.onchange = async (e) => {
        e.preventDefault();
        await handler.printDetail();
      };
      del_btn.onclick = async (e) => {
        e.preventDefault();
        if (confirm("Are you sure to delete the complete playlist?")) {
          await handler.deletePlaylist();
          await handler.printDetail();
        }
      };
      add_btn.onclick = async (e) => {
        e.preventDefault();
        if (
          confirm("Are you sure to add the selected track to the playlist?")
        ) {
          await handler.addTrack();
          await handler.printDetail();
        }
      };
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  fillArtists: async () => {
    try {
      const dropdown = document.getElementById("sel2");
      const res = await fetch("/api/artists");
      let data = await res.json();
      data = data.map((x) => {
        return { id: x.ArtistId, name: x.Name };
      });
      ui.fillDropdown(data, dropdown);
      dropdown.onchange = async (e) => {
        e.preventDefault();
        await handler.fillTracks();
      };
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  fillTracks: async () => {
    try {
      const dropdown = document.getElementById("sel3");
      const dropdown_artist = document.getElementById("sel2");
      const artistId = dropdown_artist.selectedOptions[0].dataset.id;
      const res = await fetch(`/api/details/artists/${artistId}`);
      let data = await res.json();
      data = data.map((x) => {
        return { id: x.TrackId, name: x.TrackName };
      });
      ui.fillDropdown(data, dropdown);
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
  addTrack: async () => {
    try {
      const dropdown_track = document.getElementById("sel3");
      const dropdown_playlist = document.getElementById("sel1");
      const trackId = dropdown_track.selectedOptions[0].dataset.id;
      const playlistId = dropdown_playlist.selectedOptions[0].dataset.id;
      const data = { PlaylistId: playlistId, TrackId: trackId };
      const res = await fetch(`/api/playlists/add_track/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      alert("Error while fetching data, check console for details...");
      console.log(err.message);
    }
  },
};

export { handler };
