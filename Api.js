const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.9", express.static("C:/Users/Anas/Desktop/CodeEditor/codemirror-5.65.9"))

// API Backend ide && compiler
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("Compilation environnement vidé avec succès.");
    })
    // Envoyer le fichier HTML pour la page d'accueil
    res.sendFile("C:/Users/Anas/Desktop/CodeEditor/index.html")
})

// Endpoint pour la compilation du code
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
	var envData = { OS: "windows" }
    var envData1 = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
    try {
        if (!code || !lang) {
            throw new Error("Le code et le langage sont obligatoires.");
            //console.log("Le code et le langage sont obligatoires.");
        }
        //JAVA
        if (lang == "Java") {
            if (!input) {
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        // PYTHON
        else if (lang == "Python") {
            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        // C++
        else if (lang == "Cpp") {
            if (!input) {
                compiler.compileCPP(envData1, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                compiler.compileCPPWithInput(envData1, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erreur lors de la compilation :", error);
        res.status(500).json({ error: error.message });
    }
});

// Écouter sur le port 8000
app.listen(8000, () => {
    console.log("Serveur démarré sur le port 8000.");
});