import { useEffect, useState } from "react";

export default function LandingPage() {
    const [selectedOption, setSelectedOption] = useState("oneWay");

    useEffect(() => {
        const handleScroll = () => {};
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden animated-bg flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
            
            {/* Left Text Section */}
            <div className="text-white w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold">Luxury Chauffeur Services</h1>
                <p className="mt-4 text-lg md:text-xl">Experience Comfort, Elegance & Professionalism</p>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-2/5 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start">
                <h2 className="text-2xl font-semibold text-gray-700 text-center md:text-left">GET A PRICE & BOOK</h2>
                
                {/* Selection Tabs */}
                <div className="flex justify-between gap-2 p-1 rounded-lg mt-4 w-full">
                    <div 
                        className={`w-1/2 py-2 text-center cursor-pointer font-semibold outline transition ${selectedOption === "oneWay" ? "bg-gray-500 text-white" : "text-gray-600"}`}
                        onClick={() => setSelectedOption("oneWay")}
                    >
                        One Way
                    </div>
                    <div 
                        className={`w-1/2 py-2 text-center cursor-pointer font-semibold outline transition ${selectedOption === "hourly" ? "bg-gray-500 text-white" : "text-gray-600"}`}
                        onClick={() => setSelectedOption("hourly")}
                    >
                        By the Hour
                    </div>
                </div>
                
                {/* Booking Form */}
                <form className="mt-6 w-full space-y-4">
                    <div>
                        <label htmlFor="pickup" className="block text-gray-600">Where from?</label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            className="w-full mt-2 p-3 border rounded-lg border-gray-300"
                            placeholder="Enter Collection Address"
                        />
                    </div>

                    <div>
                        <label htmlFor="destination" className="block text-gray-600">
                            {selectedOption === "oneWay" ? "Where to?" : "How Long?"}
                        </label>
                        
                        {selectedOption === "oneWay" ? (
                            <input
                                type="text"
                                id="destination"
                                name="destination"
                                className="w-full mt-2 p-3 border rounded-lg border-gray-300"
                                placeholder="Enter Destination Address"
                            />
                        ) : (
                            <select
                                id="duration"
                                name="duration"
                                className="w-full mt-2 p-3 border rounded-lg border-gray-300"
                            >
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                                <option value="4">4 Hours</option>
                                <option value="5">5+ Hours</option>
                            </select>
                        )}
                    </div>

                    <button type="submit" className="mt-6 w-full py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-lg">
                        GET MY PRICES
                    </button>
                </form>
            </div>
        </div>
    );
}
