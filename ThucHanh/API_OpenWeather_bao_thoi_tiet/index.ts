import express from "express";
import bodyParser from 'body-parser';
import axios from 'axios';

const PORT = 8080;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());

app.get('/ok', async (req, res) => {
    try {
        const url = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=b91d5595f84baa2fd92c5273eb054d87&lang=vi';
        // call api from other server by axios
        // nghĩa là đứng từ phía server của mình, call api sang 1 server khác, rồi truyền data lấy được vaò view
        const response = await axios.get(url);
        console.log(response)
        const data = response.data;
        console.log(data);
        if (data) {
            res.render("weather", {data: data})
        } else {
            res.end('<h1>Error11<h1>')
        }
    } catch (err) {
        res.end('<h1>Error22<h1>')
    }
})

app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})