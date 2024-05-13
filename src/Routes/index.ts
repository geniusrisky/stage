import { Router } from "express";
const router: Router = Router();
import * as UserController from "../Controllers/UserController";
import * as MovieController from "../Controllers/MovieController";
import * as TvShowController from "../Controllers/TvShowController";
import { internalAuth } from "../middleware/authentication";
import * as UserActionController from "../Controllers/UserActionController";

// user
 router.post("/create-user", UserController.createUser);
 router.post("/user-login", UserController.userLogin);
 router.delete("/delete-user/:id", [internalAuth], UserController.deleteUser);
 router.post("/update-user",UserController.updateUser);

// tvShows
router.post("/create-show",  TvShowController.createShow);
router.delete("/delete-show/:id", TvShowController.deleteShow);
router.post("/update-show", TvShowController.updateShow);

// movies

router.post("/create-movie", MovieController.createMovie);
router.delete("/delete-movie/:id", MovieController.deleteMovie);
router.post("/update-movie", MovieController.updateMovie);


// functionalities
router.post("/user/add-to-my-list", [internalAuth],  UserActionController.addToMyList);
router.post("/user/fetch-list", [internalAuth], UserActionController.fetchListForUser);
router.post("/user/remove-content-from-list", [internalAuth], UserActionController.removeContentFromList);

export default router;
