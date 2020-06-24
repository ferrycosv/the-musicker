import { ui } from "./ui.js";
import { handler } from "./handler.js";
async function main() {
  try {
    await handler.fillPlaylists();
    await handler.fillArtists();
    await handler.fillTracks();
    /*
    let res = await fetch("/api/playlists");
    let data = await res.json();
    const dropdown = document.getElementById("sel1");
    const dropdown2 = document.getElementById("sel2");
    const dropdown3 = document.getElementById("sel3");
    const del_btn = document.getElementById("del-btn");
    data = data.map((x) => {
      return { id: x.PlaylistId, name: x.Name };
    });
    ui.fillDropdown(data, dropdown);

    res = await fetch("/api/artists");
    data = await res.json();
    data = data.map((x) => {
      return { id: x.ArtistId, name: x.Name };
    });
    ui.fillDropdown(data, dropdown2);


    const artistId = dropdown2.selectedOptions[0].getAttribute("data-id");
    res = await fetch(`/api/details/artists/${artistId}`);
    data = await res.json();
    data = data.map((x) => {
      return { id: x.TrackId, name: x.TrackName };
    });
    ui.fillDropdown(data, dropdown3);
    */
    handler.printDetail();
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
