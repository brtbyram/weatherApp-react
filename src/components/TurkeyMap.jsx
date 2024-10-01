import { useState } from 'react';
import TurkeyMap from 'turkey-map-react';

function TurkeyWeatherMap() {

    const [cityNumber, setCityNumber] = useState("Trabzon");

    return (
        <div className="w-full">
            <TurkeyMap
                hoverable={true}
                onClick={({ name }) => setCityNumber(name)}
                onHover={({ plateNumber, name }) => console.log(plateNumber + " - " + name + " is just hovered!")}
                style={{ width: '100%', height: '100vh' }}
                showTooltip={true}
                tooltipText={({ plateNumber, name }) => plateNumber + " - " + name}
                selectedCity={ cityNumber }     
                selectedCityStyle={{ fill: 'red', stroke: 'black', strokeWidth: 2 }}
                selectedCityText={({ plateNumber, name }) => plateNumber + " - " + name}
            />
        </div>
    )
}

export default TurkeyWeatherMap