const ui = {
  printTable: (data, tbl, mark) => {
    const tbl_header =
      "<thead> <tr> " +
      Object.keys(data[0])
        .map((x) => `<th> ${x} </th>`)
        .join(" ") +
      " </tr> </thead>";
    const tbl_body =
      "<tbody id='tbl-list'>" +
      data
        .map(
          (row) =>
            `<tr> ${Object.keys(row)
              .map((column) => {
                if (column === mark) {
                  return (
                    "<td class='target'> <a href='#'> " +
                    row[column] +
                    " </a> </td>"
                  );
                }
                return "<td class='target'> " + row[column] + " </td>";
              })
              .join(" ")} </tr>`
        )
        .join(" ") +
      "</tbody>";
    tbl.innerHTML = tbl_header + tbl_body;
  },
  filter: (data, data_filter) => {
    return data.map((item) =>
      Object.keys(item)
        .filter((key) => data_filter.includes(key))
        .reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {})
    );
  },
  printDetails: (data, container) => {
    const albums = [...new Set(data.map((x) => x.AlbumTitle))];
    albums.map((album) => {
      const header = document.createElement("h2");
      const br = document.createElement("br");
      header.innerText = album;
      const tbl = document.createElement("table");
      tbl.className = "table table-striped mt-5";
      const filtered = data
        .filter((x) => x.AlbumTitle === album)
        .map((x) => {
          return {
            TrackName: x.TrackName,
          };
        });
      const tbl_body =
        "<tbody>" +
        filtered
          .map(
            (row) =>
              `<tr> ${Object.keys(row)
                .map((column) => {
                  return "<td> " + row[column] + " </td>";
                })
                .join(" ")} </tr>`
          )
          .join(" ") +
        "</tbody>";
      tbl.innerHTML = tbl_body;
      container.appendChild(header);
      container.appendChild(br);
      container.appendChild(tbl);
      container.appendChild(br);
    });
  },
};

export { ui };
