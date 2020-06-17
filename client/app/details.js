import { ui } from "./ui.js";
import { handler } from "./handler.js";
async function main() {
  try {
    const url = new URL(window.location.href);
    const search = url.searchParams.get("search");
    const id = url.searchParams.get("id");
    const container = document.getElementById("details-section");
    const span_header = document.getElementById("span-head");
    const res = await fetch(`/api/details/${search}/${id}`);
    const data = await res.json();
    if (search !== "playlists") {
      span_header.innerText = `${data[0].ArtistName} - Details`;
      ui.printDetails(data, container);
    } else {
      span_header.innerText = `${data[0].PlaylistName} - Details`;
      const tbl = document.createElement("table");
      tbl.className = "table table-striped mt-5";
      container.appendChild(tbl);
      ui.printTable(
        data.map((x) => {
          return {
            Artist: x.Artist,
            Track: x.Track,
            Album: x.Album,
            Milliseconds: x.Milliseconds,
          };
        }),
        tbl,
        ""
      );
    }
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
