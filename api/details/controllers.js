const db = require("../db-connection");

const controllers = {
  detail: (req, res) => {
    // function to get all albums and tracks from artist
    const getAllTracks = (paramId) => {
      db.all(
        `SELECT C.Name ArtistName, B.Title AlbumTitle, A.Name TrackName, A.TrackId 
        FROM tracks A INNER JOIN albums B on (A.AlbumId = B.AlbumId) 
        INNER JOIN artists C on (B.ArtistId = C.ArtistId) 
        WHERE C.ArtistId = ? ORDER BY 2,3`,
        paramId,
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json(rows);
        }
      );
    };
    // function to get artist id
    const getArtistId = (primary_key) => {
      db.get(
        `SELECT DISTINCT A.ArtistId 
        FROM albums A INNER JOIN tracks B on (A.AlbumId = B.AlbumId) 
        WHERE B.${primary_key}=?`,
        req.params.id,
        (err, rows) => {
          if (err || !rows) {
            res.status(400).json({
              error: !rows ? `id: ${req.params.id} not found!` : err.message,
            });
            return;
          }
          getAllTracks(rows.ArtistId);
        }
      );
    };
    // function to get playlist detail
    const getPlaylistDetail = () => {
      db.all(
        `SELECT A.Name PlaylistName, E.Name Artist, C.Name Track, D.Title Album, C.Milliseconds, B.TrackId
        FROM playlists A 
        INNER JOIN playlist_track B on (A.PlaylistId = B.PlaylistId) 
        INNER JOIN tracks C on (B.TrackId = C.TrackId)
        INNER JOIN albums D on (C.AlbumId = D.AlbumId)
        INNER JOIN artists E on (D.ArtistId = E.ArtistId)
        WHERE A.PlaylistId = ?`,
        req.params.id,
        (err, rows) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json(rows);
        }
      );
    };
    // process the source parameter
    switch (req.params.source) {
      case "albums":
        getArtistId("AlbumId");
        break;
      case "tracks":
        getArtistId("TrackId");
        break;
      case "artists":
        getAllTracks(req.params.id);
        break;
      case "playlists":
        getPlaylistDetail();
        break;
    }
  },
};

module.exports = controllers;
