// const express = require("express");
// const app = express();
// const mysql = require("mysql2");

// const cors = require("cors");
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "team4",
// });

// db.connect(function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Connected!");
// });

// // resource report page:
// app.get("/resources/:username", (req, res) => {
//   const username = req.params.username;
//   db.query(
//     `SELECT resourceFunctions.id, resourceFunctions.description, COUNT(resources.PFunctionId ) AS count
//     FROM resources RIGHT OUTER JOIN resourceFunctions ON resources.PFunctionId = resourceFunctions.id
//     AND resources.username=?
//     GROUP BY resourceFunctions.id
//     ORDER BY resourceFunctions.id`,
//     [username],
//     (error, result) => {
//       if (error) {
//         res.send(error);
//       } else {
//         if (!username) {
//           res.send("no result");
//         } else {
//           res.send(result);
//         }
//       }
//     }
//   );
// });

// //
// //

// // get functions:
// app.get("/functions", (req, res) => {
//   db.query("select * from resourceFunctions", (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// // get resources:
// app.get("/resources/search", (req, res) => {
//   let {resourceName, description,capability, primaryFunction, distance } = req.query;
//   db.query(
//     "SELECT * FROM resources WHERE resourceName LIKE '%resourceName%' AND description LIKE '%resourceName%' AND capability LIKE '%capability%' AND PFunctionId = ${primaryFunction} AND distance <= ${distance} ORDER BY distance",
//     (err, result) => {
//       if (err) {
//         res.send(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

// // log in users:
// // app.post("/users/login", (req, res) => {
// //   const username = req.body.username;
// //   const password = req.body.password;
// //   db.query(
// //     `select * from users where username = ? and password = ?`,
// //     [username, password],
// //     (error, result) => {
// //       if (error) {
// //         res.send(error);
// //       } else {
// //         if (!result) {
// //           res.send("Invalid username or password");
// //         } else {
// //           console.log(result);
// //           res.send(result);
// //         }
// //       }
// //     }
// //   );
// // });

// // app.get("/users/:username", (req, res) => {
// //   const username = req.params.username;
// //   db.query(
// //     `select users.username as 'username', users.displayName as 'displayName', admins.email as 'email', providers.address as 'address', cimtusers.phone as 'phone' from users left outer join admins on users.username = admins.username left outer join providers on users.username = providers.username left outer join cimtusers on users.username = cimtusers.username where users.username = ?`,
// // [username],
// //     (error, result) => {
// //       if (error) {
// //         res.send(error);
// //       } else {
// //         console.log(result);
// //         res.send(result);
// //       }
// //     }
// //   );
// // });

// // post incidents:
// // app.post("/incidents", (req, res) => {
// //   const categoryId = req.body.category;
// //   const date = req.body.date;
// //   const description = req.body.description;
// //   const username = req.body.username;

// //   db.query(
// //     "insert into incidents (date, description, categoryId, username) values (?, ?,?, ?)",
// //     [date, description, categoryId, username]
// //   );
// // get incident Id:
// //   db.query(
// //     "select count(*) from incidents where categoryId = ?",
// //     [categoryId],
// //     (err, result) => {
// //       if (err) {
// //         res.send(err);
// //       } else {
// //         res.send(`${categoryId}-${result[0]["count(*)"]}`);
// //       }
// //     }
// //   );
// // });

// // get all incidents:
// // app.get("/incidents", (req, res) => {
// //   db.query("select * from incidents", (err, result) => {
// //     if (err) {
// //       res.send(err);
// //     } else {
// //       res.send(result);
// //     }
// //   });
// // });

// //

// //
// //
// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });
