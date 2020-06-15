const db = require("../db-connection");
const table = "albums";
const primary_key = "AlbumId";

const controllers = {
  detail: (req, res) => {
    const getAllTracks = (res, paramId) => {
      db.all(
        `SELECT C.Name artistName, B.Title albumTitle, A.Name trackName FROM tracks A INNER JOIN albums B on (A.AlbumId = B.AlbumId) INNER JOIN artists C on (B.ArtistId = C.ArtistId) WHERE C.ArtistId = ? ORDER BY 2,3`,
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

    db.get(
      `SELECT DISTINCT A.ArtistId FROM albums A INNER JOIN tracks B on (A.AlbumId = B.AlbumId) WHERE B.${primary_key}=?`,
      req.params.id,
      (err, rows) => {
        if (err || !rows) {
          res.status(400).json({
            error: !rows ? `id: ${req.params.id} not found!` : err.message,
          });
          return;
        }
        getAllTracks(res, rows.ArtistId);
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
