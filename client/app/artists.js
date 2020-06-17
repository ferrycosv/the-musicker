import { ui } from "./ui.js";
import { handler } from "./handler.js";
async function main() {
  try {
    const tbl = document.getElementById("main-table");
    const res = await fetch("/api/artists");
    const data = await res.json();
    ui.printTable(data, tbl, "Name");
    document.querySelector("#tbl-list").addEventListener("click", (e) => {
      handler.showDetail(e, "artists");
    });
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
