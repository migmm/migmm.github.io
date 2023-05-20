import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./utils/cors";
import config from "./config/server";

/* import routerProjects from "./router/projects";
import routerCertifications from "./router/certifications"; */
import routerUsers from "./router/users";
/* import routerAuth from "./router/auth";
import routerforgotPassword from "./router/forgotPassword";
import routerResetPassword from "./router/resetPassword";
import routerFavourite from "./router/favorites";
import routerImages from "./router/aws"; */

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

/* app.use("/api/projects", routerProjects);
app.use("/api/certifications", routerCertifications); */

app.use("/api/users", routerUsers);
/* app.use("/api/auth", routerAuth);

app.use("/api/auth/forgotpassword", routerforgotPassword);
app.use("/api/auth/resetpassword", routerResetPassword);

app.use("/api/addfavourite", routerFavourite);
app.use("/api/removefavourite", routerFavourite);

app.use("/api/images", routerImages); */


// in case of using another route
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.json({ error: "404 Not Found" });
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
server.on("error", (error) => console.log("Error starting Express server: " + error.message));
