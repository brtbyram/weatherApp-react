import CanvasJSReact from '@canvasjs/react-charts';
import { useSelector } from 'react-redux';

const { CanvasJSChart } = CanvasJSReact;


export default function HourlyChart() {


    const { weatherData } = useSelector(state => state.data)

    console.log(weatherData.forecast.forecastday[0].hour, "chart");


    const options = {
        animationEnabled: true, // bu ayar ile animasyon aktif edilir
        animationDuration: 2000, // animasyon süresi belirlenir
        exportEnabled: false, // bu ayar ile sağ üst köşede export butonu gösterilir
        theme: "dark1", // "light1", "light2", "dark1", "dark2"
        color: "#000000",
        backgroundColor: "transparent",
        title: {
            text: ""
        },
        axisY: { // y eksenine ait ayarlar yapılır (dikey eksen)
            prefix: "",
            gridThickness: 0,
            lineThickness: 0,
            tickLength: 0,
            tickThickness: 0,
            labelFontSize: 0,
            labelFontColor: "white",
            valueFormatString: "",

            intervalType: "number",
            tickPlacement: "inside",
        },
        axisX: { // x eksenine ait ayarlar yapılır (yatay eksen)
            labelAutoFit: true, // x eksenindeki saat etiketlerinin otomatik boyutlandırılmasını sağlar
            gridThickness: 0, // grid çizgilerinin kalınlığı belirlenir
            lineThickness: 0, // x ekseninin kalınlığı belirlenir
            tickPlacement: "inside", // x eksenindeki işaretçilerin yeri belirlenir
            tickThickness: 0, // x eksenindeki işaretçilerin kalınlığı belirlenir
            labelFontSize: 0, // x eksenindeki saat etiketlerinin boyutu belirlenir
            labelPlacement: "inside",
            tickLength: 0,
            valueFormatString: "", // saat ve dakika formatı belirlenir
            interval: 1, // saat aralığı belirlenir
            intervalType: "hour", // saat aralığı belirlenir
            labelFontColor: "white", // x eksenindeki saat etiketlerinin rengi belirlenir
        },
        toolTip: { // bu ayar ile mouse ile üstüne gelindiğinde detaylı bilgi gösterilir
            shared: true, // birden fazla veri seti varsa hepsini gösterir
            content: "{name}: {y}°C", // hangi veri seti hangi değeri gösterir
            fontSize: 16,
            cursor: "pointer",
            color: "white",
            cornerRadius: 4,
            backgroundColor: "rgba(0,0,0,.7)",
            borderThickness: 0,
            animationEnabled: true, // bu ayar ile animasyon aktif edilir



        },
        legend: { // bu ayar ile sağ üst köşede veri setlerinin isimlerini gösterir
            fontSize: 4,
            cursor: "pointer",
        },
        data: [ // veri setleri burada tanımlanır ve gösterilir
            {
                type: "splineArea", // veri setinin tipi belirlenir
                showInLegend: false,
                name: "Temperature",
                markerSize: 0,
                color: "rgba(54,158,173,.9)",
                dataPoints: weatherData.forecast.forecastday[0].hour.map((item) => {
                    return {
                        x: new Date(item.time).getHours(),
                        y: item.temp_c
                    }
                })
            },
            {
                type: "splineArea",
                showInLegend: false,
                name: "Wind Chill",
                markerSize: 0,
                color: "#3F72AF",
                dataPoints: weatherData.forecast.forecastday[0].hour.map((item) => {
                    return {
                        x: new Date(item.time).getHours(),
                        y: item.dewpoint_c
                    }
                })
            },
            {
                type: "splineArea", // veri setinin tipi belirlenir
                showInLegend: false, // bu ayar ile sağ üst köşede veri setinin ismi gösterilir veya gizlenir default
                name: "Sensed Temperature",
                markerSize: 0, // noktaların boyutu 
                color: "#112d4e",
                dataPoints: weatherData.forecast.forecastday[0].hour.map((item) => {
                    return {
                        x: new Date(item.time).getHours(),
                        y: item.feelslike_c
                    }
                })
            }
        ]
    };

    return (
        <>
            <CanvasJSChart options={options} />
        </>
    );

}
