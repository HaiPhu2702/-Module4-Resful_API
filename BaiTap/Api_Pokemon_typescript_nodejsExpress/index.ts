import express from "express";
import bodyParser from 'body-parser';
import axios from "axios";

const PORT = 3000;


const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());

app.get('/',async (req, res) => {
    try{

        const limit=+req.query.limit||10;
       let page=+req.query.page||0;
        const AllDataPokemon= (await axios.get("https://pokeapi.co/api/v2/pokemon")).data.count;

        if(page<0){
            page=0;
            res.redirect('?page=1')
        }else if(page>Math.ceil(AllDataPokemon/limit)){
            page=Math.ceil(AllDataPokemon/limit)
            res.redirect('?page='+page)
        }





        const url = `https://pokeapi.co/api/v2/ability/?limit=${limit}&offset=${page}.`;
        const ApiPokemon=await axios.get(url)

        console.log(ApiPokemon.data.count);
        const dataPokemon=ApiPokemon.data.results;
        // console.log(dataPokemon)
        if(dataPokemon){

            res.render('pokemon',{dataPokemon:dataPokemon,page:page})
        }else {
            res.end('<h1>ERR</h1>')
        }

    }catch (e) {
        res.end('<h1>ERR</h1>')
    }
})



app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})