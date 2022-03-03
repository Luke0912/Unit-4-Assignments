const express = require ("express")
const app = express()

app.get("", function (req, res) {
    res.send( "Hello" );
  });
  
  app.get("/books", function (req, res) {
    res.send({ Fantasy : "Random Fantasy Generator 2.0", Sci_Fi: "Obscure Hub: Sci-Fi Titles", Romance : "Romance Generator",Crime : "Tara Sparling’s Crime Thriller Titles"

});
  });
  
  app.listen(4000, () => {
    console.log("listening on port 4000");
  });