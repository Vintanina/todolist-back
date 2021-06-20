const Express = require("express");
const database = require("./database");

const route = Express.Router();
const path = "/api/v1/";
const Database = new database();

Database.connect();

//READ todo for public browsers
route.get("/", (req, res) => {
	const mysql_req = "SELECT * from todo";
		Database.request(mysql_req)
		.then(result => {
			res.json({
				status: 1,
				response: result
			});
		})
		.catch(err => {
			res.json({
				status: 0,
				response: err
			});
		});
});

//ADD todo
route.put("/", (req, res) => {
	const task = req.body.task || null;
	if(task) {
		let mysql_req = "INSERT INTO todo(task) VALUES (\"" + task + "\")";
			Database.request(mysql_req)
			.then(result => {
				res.json({
					status: 1,
					response: result
				});
			})
			.catch(err => {
				res.json({
					status: 0,
					response: err
				});
			});
	}
	else {
		res.json({
			status: 0,
			response: "Missing body parameter: task."
		});
	}
});

//DELETE todo
route.delete("/", (req, res) => {
	const id = req.body.id ? req.body.id : null;
	if(id) {
		let mysql_req = "DELETE FROM todo WHERE id=" + id;
			Database.request(mysql_req)
			.then(result => {
				res.json({
					status: 1,
					response: result
				});
			})
			.catch(err => {
				res.json({
					status: 0,
					response: err
				});
			});
	}
	else {
		res.json({
			status: 0,
			response: "Missing body parameter: id"
		});
	}
});

route.post("/", (req, res) => {
	const id = typeof req.body.id === "number" ? req.body.id : null;
	const done =  typeof req.body.done === "number" ? req.body.done : null;
	if(id != null && done != null) {
		let mysql_req = `UPDATE todo SET done=${done} WHERE id=${id}`;
			Database.request(mysql_req)
			.then(result => {
				res.json({
					status: 1,
					response: result
				});
			})
			.catch(err => {
				res.json({
					status: 0,
					response: err
				});
			});
	}
	else {
		res.json({
			status: 0,
			response: "Missing body parameter."
		});
	}
});

module.exports = {path, route};