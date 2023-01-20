const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const handler = require("../helper/errorHandler");
const { hash, verifyHash } = require("../helper/hashing");

class UserController {
  static async checkUser(req, res) {
    const { params } = req;
    console.log(req.params);
    if (Object.keys(params).length === 0)
      return res.status(500).json({
        message: "Internal Server Error",
        data: "param is Needed",
      });
    let dataQuery = {};
    if (params.name) dataQuery.name = params.name;
    if (params.username) dataQuery.username = params.username;
    let data = await User.findOne({
      where: dataQuery,
    });
    if (!data)
      return res.status(400).json({
        message: "User Not Found",
      });
    return res.status(200).JSON({
      message: "User Data Found",
      data,
    });
  }
  static async addUser(req, res) {
    const { body } = req;
    const { name, username, password } = body;
    if (!body.name) throw new Error("Name is Needed");
    if (!body.username) throw new Error("Username is Needed");
    if (!body.password) throw new Error("Password is Needed");
    let userChecker = await User.findOne({
      where: { username: body.username },
    });
    if (userChecker) return res.status(400).json(handler("username", "exist"));
    let hashPass = await hash(body.password);
    let createQuery = {
      name,
      username,
      password: hashPass,
    };
    await User.create(createQuery);
    return res.status(201).json({
      message: "User Created",
    });
  }
  static async login(req, res) {
    const { body } = req;
    if (!body.username)
      return res.status(400).json(handler("username", "include"));
    if (!body.password)
      return res.status(400).json(handler("password", "include"));
    if (body.username.length === 0)
      return res.status(400).json(handler("username", "blank"));
    if (body.password.length === 0)
      return res.status(400).json(handler("password", "blank"));
    let usernameChecker = await User.findOne({
      where: { username: body.username },
    });
    if (!usernameChecker)
      return res.status(400).json(handler("username", "notFound"));
    let passwordChecker = await verifyHash(
      body.password,
      usernameChecker.password
    );
    console.log(passwordChecker);
    if (!passwordChecker)
      return res.status(400).json(handler("password", "wrong"));
    let bearerToken = jwt.sign(
      { name: usernameChecker.name, username: usernameChecker.username },
      "ehehe"
    );
    return res.status(200).json({
      message: "Login Success",
      token: bearerToken,
    });
  }
  static async deleteUser(req, res) {
    const { body } = req;
    if (!body.username)
      return res.status(400).json(handler("username", "include"));
    if (body.username.length === 0)
      return res.status(400).json(handler("username", "blank"));
    let accountExist = await User.findOne({
      where: {
        username: body.username,
      },
    });
    if (!accountExist) return res.status(400).json(handler("id", "notFound"));
    await User.destroy({ where: { username: body.username } });
    return res.status(201).json({
      message: "Account Deleted",
    });
  }
}

module.exports = UserController;
