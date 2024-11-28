import { getVisits, incrementVisits } from "./src/db.ts";
import express, { NextFunction, Request } from "npm:express";
import { render } from "npm:preact-render-to-string";
import { HomePage } from "./src/ui.tsx";
import { createProblemDetails, problemDetailsHandler } from "./src/helpers/errorResponse.ts";
import { AboutPage } from "./src/ui.tsx";
import { openBrowser } from "./src/helpers/openBrowser.ts";

const app = new express();

app.use(express.static("public"));

app.get("/", async (_req: Request, res: express.Response, _next: NextFunction) => {
    await incrementVisits();
    return res.send(render(HomePage()));
});

app.get("/about", async (_req: Request, res: express.Response, _next: NextFunction) => {
    incrementVisits();
    const visitedCount = await getVisits();
    return res.send(render(AboutPage({ visitedCount })));
});

// Not found handler (404)
app.use((req: Request, _res: express.Response, next: NextFunction) => {
    const detail = "The requested resource was not found on the server.";
    const additionalFields = {
        requestUrl: req.originalUrl,
        timestamp: new Date().toISOString(),
    };
    next(createProblemDetails(404, "Not Found", detail, additionalFields));
});

// Central error handler
app.use(problemDetailsHandler);

const port = Deno.env.get("PORT") || "8000";
app.listen(port, () => {
    console.log("Server is running on http://localhost:8000");
});

if (Deno.env.get("OPEN_BROWSER_ON_STARTUP") === "true") {
    openBrowser();
}
