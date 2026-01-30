import express from "express";  
import cors from "cors";
import path from "path";
import { fileURLToPath } from "node:url";
import bodyParser from "body-parser";
import presets from './routes/presets.js';
import mongoose from "mongoose";

let app = express();
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://js:web2026@presets.lrqgsgv.mongodb.net/presetsDB?appName=Presets';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB presets dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/presets que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, "presets");


app.use('/presets', express.static(DATA_DIR));


// Pour les formulaires
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/presets')
  .get(presets.getPresets);

app.route(prefix + '/presets/:name')
  .get(presets.getPreset)
  .delete(presets.deletePreset)
  .put(presets.updatePreset);

app.route(prefix + '/presets')
  .post(presets.postPreset)


// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);




