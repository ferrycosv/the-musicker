import { ui } from "./ui.js";
import { handler } from "./handler.js";
async function main() {
  try {
    const tbl = document.getElementById("main-table");
    const res = await fetch("/api/albums");
    const data = await res.json();
    const data_filter = ["AlbumId", "Title"];
    ui.printTable(ui.filter(data, data_filter), tbl, "Title");
    document.querySelector("#tbl-list").addEventListener("click", (e) => {
      handler.showDetail(e, "albums");
    });
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
