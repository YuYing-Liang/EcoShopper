const express = require("express");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const jsdom = require('jsdom')
const axios = require('axios')
const { JSDOM } = jsdom;
const app = express();
const user_postal_code = "L4Z+1H6"
let postal_code = ""
let transportation_query = ""

app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json');
//     next();
// });
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/get-text", async (req, res) => {
    console.log(req.body.url)
    // const response = await fetch(req.body.url)
    axios.get(req.body.url, {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }
    }).then(async (response) => {
        const $ = cheerio.load(response.data)
        const text = $('#productOverview_feature_div').text().split('\n').join(' ').trim().split('      ')
        const about = $('#featurebullets_feature_div').text().split('\n').join(' ').trim().split('      ')
        const combined = text.concat(about)
        const features = {}
        const materials = {}
        combined.forEach((val, i) => {
            if(i % 2 == 0) {
                features[val.trim()] = combined[i+1].trim()
            }
        })
        let most_recent_percent = -1
        let total_co2_emissions = 0
        let total_water_consump = 0
        const weight = features['Item weight'] ? parseFloat(features['Item weight'].split(' ')[0]) : 0
        if(features['About this item']) {
            features['About this item'].split(' ').forEach((val, i) => {
                const lower = val.toLowerCase()
                if(val.includes('%')) most_recent_percent = parseFloat(val.substring(0, val.length-1))/100.0
                const percent = most_recent_percent != -1 ? most_recent_percent : null
                let carbon, water
                // water - L, carbon - g
                switch(lower){
                    case 'paper':
                        carbon = 3*weight*percent
                        water = 4*weight*percent
                        total_co2_emissions += carbon
                        materials['paper'] = {
                            'water': water,
                            'carbon': carbon,
                            'waste': 'recyclable',
                            'percentage': percent
                        }; break
                    case 'cotton':
                        carbon = 1.5*weight*percent
                        water = 20*weight*percent
                        total_co2_emissions += carbon
                        materials['cotton'] = {
                            'water': water,
                            'carbon': carbon,
                            'waste': 'biodegradable',
                            'percentage': percent
                        }; break
                    case 'bamboo':
                        materials['bamboo'] = {
                            'water': 'very little',
                            'carbon': 'absorb',
                            'waste': 'biodegradable',
                            'percentage': percent
                        }; break
                }
                most_recent_percent = -1
            })
        }
        let product_details = $('#detailBulletsWrapper_feature_div').text().split('\n').join(' ').trim().split('      ')
        product_details = product_details.filter((val) => {
            return val != ""
        })
        product_details = product_details.slice(2, 6)
        const product_detail_vals = {}
        product_details.forEach((val) => {
            const str = val.split('    :    ')
            if(str[0].trim()!=='Date First Available')
                product_detail_vals[str[0].trim()] = str[1].trim()
        })
        // console.log(features)
        // console.log(product_detail_vals)
        const location = product_detail_vals['Place of Business']
        postal_code = location.substring(location.length - 11, location.length - 4).split(' ').join('+')
        transportation_query = "https://www.zip-codes.com/distance_calculator.asp?zip1=" + user_postal_code + "&zip2=" + postal_code + "&submit=Calculate"
        console.log(transportation_query)
        let postal_res = await axios.get(transportation_query)
        const $p = cheerio.load(postal_res.data)
        let distance = $p(".km:first-of-type").text()
        distance = distance.substring(0, distance.indexOf('C'))
        total_co2_emissions += 206 * distance

        const grades = {}
        if(total_co2_emissions <= 1000) {
            grades[co2_emissions] = 'A'
        }

        console.log('response sent!')
        res.send({
            features: features,
            details: product_detail_vals,
            distance: distance,
            materials: materials,
            categories: {
                co2_emissions: total_co2_emissions,
                water_consump: total_water_consump
            }
        });
    })
    
     
})

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})