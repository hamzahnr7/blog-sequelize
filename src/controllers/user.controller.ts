import expressAsyncHandler from "express-async-handler";

class UserController {
  getUsers = expressAsyncHandler(async (req, res, next) => {
    res.send("respond with a resource");
  });
}

export default new UserController();
