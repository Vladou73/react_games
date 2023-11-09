import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import { useEffect, useState } from "react"
import axios from "axios"
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';


const StarWars = () => {
    const [people, setPeople] = useState([])
    const [genderData, setGenderData] = useState([])
    const [maleFilmData, setMaleFilmData] = useState([])
    const [femaleFilmData, setFemaleFilmData] = useState([])
    const [filmSeries, setFilmSeries] = useState([])

    const [controls, setControls] = useState({"male":true, "female": true, "other": true});

    const handleControlChange = (event, gender) => {
        let tmp = controls;
        tmp[gender] = event.target.checked 
        setControls(tmp);
        setChartsData(people);
    };

    const updateGenderData = (filtered) => {
        let length = 0;
        for (const [key, value] of Object.entries(filtered)) {
            if (controls[key])
                length += filtered[key].length
        }
        let genderTmp = []
        if (controls.male)
            genderTmp.push({name: "Male", y: filtered.male.length / length})
        if (controls.female)
            genderTmp.push({name: "Female", y: filtered.female.length / length})
        if (controls.other)
            genderTmp.push({name: "Other", y: filtered.other.length / length})
        setGenderData(genderTmp)
    }

    const updateFilmData = (filtered) => {
        let maleCounts = filtered.male.map(e => e.films.length).sort();
        const maleMap = maleCounts.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        setMaleFilmData([...maleMap.values()])
        
        let femaleCounts = filtered.female.map(e => e.films.length).sort();
        const femaleMap = femaleCounts.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        setFemaleFilmData([...femaleMap.values()])
    }

    const updateFilmSeries = () => {
        let tmp = []
        if (controls.male)
            tmp.push({name: 'Male', data: maleFilmData});
        if (controls.female)
            tmp.push({name: 'Female', data: femaleFilmData});
        setFilmSeries([...tmp])
    }

    const setChartsData = (peopleData) => {
        let filtered = {}
        filtered["male"] = peopleData.filter(e=>e.gender === "male");
        filtered["female"] = peopleData.filter(e=>e.gender === "female");
        filtered["other"] = peopleData.filter(e=>e.gender === "n/a" || e.gender === "hermaphrodite")

        updateGenderData(filtered);
        updateFilmData(filtered);
        updateFilmSeries();
    }

    useEffect(()=>{
        const getPeople = async () => {
            try {
                    let response = await axios.get("https://swapi.dev/api/people/")
                    let tmp = response.data.results;
                    let next = response.data.next 
                    let i = 0
                    while (next && i < 10) {
                        response = await axios.get(next)
                        tmp = [...tmp, ...response.data.results]
                        next = response.data.next
                        i++;
                    }
                    setPeople(tmp);
                    setChartsData(tmp);
            } catch (e) {
                console.log(e)
            }
        }
        getPeople();
    }, [])

    const genderOptions = {
        chart: {
            type: 'pie'
        },
        title: {
            text: "Gender distribution with " + people.length + " characters"
        },
        tooltip: {
            valueDecimals: 2,
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    distance: 20
                },
            }
        },
        series: [{
            name: 'Gender repartition',
            colorByPoint: true,
            data: genderData
        }]
    }

    const filmOptions = {
    chart: {type: 'area'},
    title: {text: 'Gender distribution in films'},
    xAxis: {
        allowDecimals: false,
        title: {text: "Star Wars films"}
    },
    yAxis: {
        title: {text: 'Star Wars characters appearing'}
    },
    tooltip: {
        pointFormat: '<b>{point.y:,.0f}</b> {series.name} characters <br/>appear in {point.x} films'
    },
    plotOptions: {
        area: {
            pointStart: 1,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: filmSeries
};

    return (
        <div className="gameContainer">
            <header className="star_wars_header">STAR WARS DATA</header>
            {people.length ? <div style={{"display": "flex"}}>
                <div style={{width: "75%"}}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={genderOptions}
                        />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={filmOptions}
                        />
                </div>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked checked={controls.male} onChange={(e)=>handleControlChange(e, "male")}/>} label="male" />
                    <FormControlLabel control={<Checkbox defaultChecked checked={controls.female} onChange={(e)=>handleControlChange(e, "female")}/>} label="female" />
                    <FormControlLabel control={<Checkbox defaultChecked checked={controls.other} onChange={(e)=>handleControlChange(e, "other")}/>} label="other" />
                </FormGroup>
            </div> : <p>loading data ...</p>}

        </div>
    )
}

export default StarWars