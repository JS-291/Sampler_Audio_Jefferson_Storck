let Preset = require('../model/preset');
let fs= require('fs');
let path = require('path');
let multer = require('multer');

// Récupérer tous les presets (GET)
function getPresets(req, res){
    Preset.find((err, presets) => {
        if(err){
            res.send(err)
        }

        res.send(presets);
    });
}

// Récupérer un preset par son nom (GET)
function getPreset(req, res){
    let presetName = req.params.name;

    Preset.findOne({name: presetName}, (err, preset) =>{
        if(err){res.send(err)}
        res.json(preset);
    })
}

// Ajout d'un preset (POST)
function postPreset(req, res){

    let jsonData;

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                
                jsonData = JSON.parse(req.body.data);

                const dir = path.join(process.env.DATA_DIR || path.join(__dirname, "../presets"), jsonData.name);
                if (!fs.existsSync(dir)) fs.mkdirSync(dir);
                
                cb(null, dir);
            },
            filename: (req, file, cb) => cb(null, file.originalname)
        })
    }).array("files");

    upload(req, res, (err) => {
        if (err) return res.send(err);
        
        let preset = new Preset();
        preset.name = jsonData.name;
        preset.type = jsonData.type;
        preset.isFactoryPresets = jsonData.isFactoryPresets;
        preset.samples = jsonData.samples;

        preset.save( (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: `${preset.name} saved!`})
        });
    });
}

// Update d'un preset (PUT)
function updatePreset(req, res) {
  console.log('UPDATE received preset:', req.body.name);

  const oldName = req.params.name;
  const newName = req.body.name;
  const baseDir = process.env.DATA_DIR || path.join(__dirname, '../presets');

  let updateDB = () => {
    Preset.findOneAndUpdate({ name: oldName },req.body,{ new: true },(err, preset) => {
        if (err) return res.send(err);
        if (!preset) return res.json('Preset not found');
        res.json(preset);
      }
    );
  };

  if (newName && newName !== oldName) {
    const oldDir = path.join(baseDir, oldName);
    const newDir = path.join(baseDir, newName);

    fs.rename(oldDir, newDir, (err) => {
      if (err) {
        console.error('Rename failed:', err);
        return res.json({ error: 'Folder rename failed' });
      }
      updateDB();
    });
  } else {
    updateDB();
  }
}



// suppression d'un preset (DELETE)

function deletePreset(req, res) {
    Preset.findOneAndRemove({ name: req.params.name }, (err, preset) => {
        if(err) return res.send(err);
        if (!preset) return res.json('Preset not found');
        const dir = path.join(process.env.DATA_DIR || path.join(__dirname, "../presets"), preset.name);
        fs.rm(dir,{recursive: true, force: true}, (err)=>{
            res.json('Preset deleted');
        });
    });
}

module.exports = { getPresets, postPreset, getPreset, updatePreset, deletePreset };
