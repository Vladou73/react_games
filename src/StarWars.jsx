import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import { useEffect, useState } from "react"
import axios from "axios"


const StarWars = () => {
    const [people, setPeople] = useState([])
    const [genderData, setGenderData] = useState([])
    const [maleFilmData, setMaleFilmData] = useState([])
    const [femaleFilmData, setFemaleFilmData] = useState([])

    const setChartsData = (peopleData) => {
        let genderTmp = []

        let males = peopleData.filter(e=>e.gender === "male");
        let females = peopleData.filter(e=>e.gender === "female")
        let undefs = peopleData.filter(e=>e.gender === "n/a")
        let herma = peopleData.filter(e=>e.gender === "hermaphrodite")

        genderTmp.push({name: "Male", y: males.length / peopleData.length})
        genderTmp.push({name: "Female", y: females.length / peopleData.length})
        genderTmp.push({name: "n/a", y: undefs.length / peopleData.length})
        genderTmp.push({name: "hermaphrodite", y: herma.length / peopleData.length})
        setGenderData(genderTmp)

        let maleCounts = males.map(e => e.films.length).sort();
        const maleMap = maleCounts.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        setMaleFilmData([...maleMap.values()])
        
        let femaleCounts = females.map(e => e.films.length).sort();
        const femaleMap = femaleCounts.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
        setFemaleFilmData([...femaleMap.values()])
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
            text: "Gender distribution on " + people.length + " characters"
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
    title: {text: 'Gender distribution and films'},
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
    series: [{
        name: 'Males',
        data: maleFilmData
    }, {
        name: 'Females',
        data: femaleFilmData
    }]
};

    return (
        <div className="gameContainer">
            <header>STAR WARS</header>
            {people.length && <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={genderOptions}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={filmOptions}
                />

            </div>}

        </div>
    )
}

export default StarWars