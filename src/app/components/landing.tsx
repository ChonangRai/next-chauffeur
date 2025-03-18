import { useState } from "react";

type Place = {
    display_name: string;
    lat: string;
    lon: string;
};

export default function LandingPage() {
    const [selectedOption, setSelectedOption] = useState("oneWay");
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [pickupSuggestions, setPickupSuggestions] = useState<Place[]>([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState<Place[]>([]);
    const [activeInput, setActiveInput] = useState<"pickup" | "destination" | null>(null);

    const fetchSuggestions = async (query: string, type: "pickup" | "destination") => {
        if (query.length < 2) {
            if (type === "pickup") setPickupSuggestions([]);
            else setDestinationSuggestions([]);
            return;
        }

        try {
            // Search for the postal code
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=gb&addressdetails=1`
            );
            const data: Place[] = await response.json();

            if (type === "pickup") setPickupSuggestions(data);
            else setDestinationSuggestions(data);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
        }
    };

    const handleInputChange = (value: string, type: "pickup" | "destination") => {
        setActiveInput(type);
        if (type === "pickup") {
            setPickup(value);
            fetchSuggestions(value, "pickup");
        } else {
            setDestination(value);
            fetchSuggestions(value, "destination");
        }
    };

    const handleSelectSuggestion = (place: Place, type: "pickup" | "destination") => {
        if (type === "pickup") {
            setPickup(place.display_name);
            setPickupSuggestions([]); // Clear only pickup suggestions
        } else {
            setDestination(place.display_name);
            setDestinationSuggestions([]); // Clear only destination suggestions
        }

        setActiveInput(null); // Reset active input
    };

    return (
        <div className="relative w-full h-screen overflow-hidden animated-bg flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
            
            {/* Left Text Section */}
            <div className="text-white w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold">Luxury Chauffeur Services</h1>
                <p className="mt-4 text-lg md:text-xl">Experience Comfort, Elegance & Professionalism</p>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/4 bg-white p-8  shadow-lg flex flex-col items-center md:items-start relative">
                <h2 className="text-2xl font-semibold text-gray-700 md:text-center">GET A PRICE & BOOK</h2>
                
                {/* Selection Tabs */}
                <div className="flex justify-between gap-2 p-1  mt-4 w-full">
                    <div 
                        className={`w-1/2 py-2 text-center cursor-pointer font-semibold transition ${selectedOption === "oneWay" ? "bg-gray-500 text-white" : "text-gray-600 outline"}`}
                        onClick={() => setSelectedOption("oneWay")}
                    >
                        One Way
                    </div>
                    <div 
                        className={`w-1/2 py-2 text-center cursor-pointer font-semibold transition ${selectedOption === "hourly" ? "bg-gray-500 text-white" : "text-gray-600 outline"}`}
                        onClick={() => setSelectedOption("hourly")}
                    >
                        By the Hour
                    </div>
                </div>
                
                {/* Booking Form */}
                <form className="mt-6 w-full space-y-4">
                    {/* Pickup Input */}
                    <div className="relative">
                        <label htmlFor="pickup" className="block text-gray-600">Where from? (Enter Postcode)</label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            className="w-full mt-2 p-3 border  border-gray-300"
                            placeholder="Enter Collection Postcode"
                            value={pickup}
                            onFocus={() => setActiveInput("pickup")}
                            onChange={(e) => handleInputChange(e.target.value, "pickup")}
                        />
                        {activeInput === "pickup" && pickupSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 mt-1 w-full  shadow-lg max-h-40 overflow-y-auto z-50">
                                {pickupSuggestions.map((place, index) => (
                                    <li 
                                        key={index} 
                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSelectSuggestion(place, "pickup")}
                                    >
                                        {place.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Destination Input */}
                    {selectedOption === "oneWay" ? (
                        <div className="relative">
                            <label htmlFor="destination" className="block text-gray-600">Where to? (Enter Postcode)</label>
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                className="w-full mt-2 p-3 border  border-gray-300"
                                placeholder="Enter Destination Postcode"
                                value={destination}
                                onFocus={() => setActiveInput("destination")}
                                onChange={(e) => handleInputChange(e.target.value, "destination")}
                            />
                            {activeInput === "destination" && destinationSuggestions.length > 0 && (
                                <ul className="absolute bg-white border border-gray-300 mt-1 w-full  shadow-lg max-h-40 overflow-y-auto z-50">
                                    {destinationSuggestions.map((place, index) => (
                                        <li 
                                            key={index} 
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSelectSuggestion(place, "destination")}
                                        >
                                            {place.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="duration" className="block text-gray-600">How Long?</label>
                            <select
                                id="duration"
                                name="duration"
                                className="w-full mt-2 p-3 border  border-gray-300"
                            >
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                                <option value="4">4 Hours</option>
                                <option value="5">5+ Hours</option>
                            </select>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="mt-6 w-full py-3 bg-gray-500 text-white font-semibold  shadow-lg">
                        GET MY PRICES
                    </button>
                </form>
            </div>
        </div>
    );
}
