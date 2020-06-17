import { ui } from "./ui.js";
import { handler } from "./handler.js";
async function main() {
  try {
    const tbl = document.getElementById("main-table");
    const res = await fetch("/api/tracks");
    const data = await res.json();
    const data_filter = ["TrackId", "Name", "Composer", "Milliseconds"];
    ui.printTable(ui.filter(data, data_filter), tbl, "Name");
    document.querySelector("#tbl-list").addEventListener("click", (e) => {
      handler.showDetail(e, "tracks");
    });
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
