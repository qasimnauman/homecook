import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger-output.json" assert { type: 'json' };

// Routes Imports
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    express.json({
        limit: "16kb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

// Swagger Docs MiddleWare
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(express.static("public"));
// app.use(cookieParser());

// Swagger documentation route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Add this line

// Routes Declaration
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

export { app };