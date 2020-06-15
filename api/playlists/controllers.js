const db = require("../db-connection");
const table = "playlists";
const primary_key = "PlaylistId";

const controllers = {
  detail: (req, res) => {
    db.all(
      `SELECT A.PlaylistId,C.Name playListName, A.TrackId, B.Name trackName FROM playlist_track A INNER JOIN tracks B on (A.TrackId = B.TrackId) INNER JOIN playlists C on (A.PlaylistId = C.PlaylistId)  WHERE A.PlaylistId = ?`,
      req.params.id,
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json(rows);
      }
    );
  },
  getAll: (req, res) => {
    db.all(`SELECT * FROM ${table}`, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  },
  getOne: (req, res) => {
    db.get(
      `SELECT * FROM ${table} where ${primary_key}=?`,
      req.params.id,
      (err, rows) => {
        if (err || !rows) {
          res.status(400).json({
            error: !rows ? `id: ${req.params.id} not found!` : err.message,
          });
          return;
        }
        res.json(rows);
      }
    );
  },
  create: (req, res) => {
    // read row data from body
    const data = req.body;
    const cols = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).fill("?").join(", ");
    db.run(
      `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`,
      Object.values(data),
      (err) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        db.get(`SELECT last_insert_rowid() id`, (err, rows) => {
          data[primary_key] = rows.id;
          return res.json(data);
        });
      }
    );
  },
  update: (req, res) => {
    // read row data from body
    const data = req.body;
    const cols = Object.keys(data)
      .map((x) => `${x}=?`)
      .join(", ");
    data[primary_key] = req.params.id;
    const params = Object.values(data);
    db.run(
      `UPDATE ${table} SET ${cols} WHERE ${primary_key}=?`,
      params,
      (err) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        return res.json(data);
      }
    );
  },
  delete: (req, res) => {
    db.run(
      `DELETE FROM ${table} WHERE ${primary_key}=?`,
      req.params.id,
      (err) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json();
      }
    );
  },
};

module.exports = controllers;
