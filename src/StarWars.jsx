import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import { useEffect, useState } from "react"
import axios from "axios"


const StarWars = () => {
    const [people, setPeople] = useState([])
    const [genderData, setGenderData] = useState([])


    const setChartsData = (peopleData) => {
        let genderTmp = []
        genderTmp.push({name: "Male", y: peopleData.filter(e=>e.gender === "male").length / peopleData.length})
        genderTmp.push({name: "Female", y: peopleData.filter(e=>e.gender === "female").length / peopleData.length})
        genderTmp.push({name: "n/a", y: peopleData.filter(e=>e.gender === "n/a").length / peopleData.length})
        genderTmp.push({name: "hermaphrodite", y: peopleData.filter(e=>e.gender === "hermaphrodite").length / peopleData.length})
        setGenderData(genderTmp)
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
                    options={genderOptions}
                />

            </div>}

        </div>
    )
}

export default StarWars