const express = require("express");
const app = express();
const PORT = 3000;
const recipeRoutes = require("./routes/recipes.routes");

app.get("/", (req, res) =>
  res.send("Hello, projet Docker nodejs avec Railway !")
);

app.use("/movies", movieRoutes); // Routes pour les films
app.use("/books", bookRoutes); // Routes pour les livres
app.use("/recipes", recipeRoutes); // Routes pour les recettes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
