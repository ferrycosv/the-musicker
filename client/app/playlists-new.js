import { handler } from "./handler.js";
async function main() {
  try {
    let tracks = [];
    handler.initCreate();
    await handler.fillArtists();
    await handler.fillTracks();
    //handler.printDetail();
  } catch (err) {
    alert("Error while fetching data, check console for details...");
    console.log(err.message);
  }
}
main();
