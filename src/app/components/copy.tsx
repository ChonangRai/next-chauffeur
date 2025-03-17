import { useEffect } from "react";

export default function LandingPage() {
    useEffect(() => {
        const handleScroll = () => {};
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative w-full h-screen bg-cover bg-center flex items-center px-10 md:px-20" 
             style={{ backgroundImage: "url('/images/car-bg.jpg')" }}>
            
            {/* Left Section */}
            <div className="w-full md:w-1/2 text-white space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">Your Personal Chauffeur Service</h1>
                <p className="text-lg md:text-xl">Awarded Best UK Chauffeur Company</p>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-700 text-center">GET A PRICE & BOOK</h2>
                
                <form className="mt-6 w-full space-y-4">
                    <div className="flex justify-between bg-gray-200 p-2 rounded-lg">
                        <button className="w-1/2 py-2 bg-blue-500 text-white font-semibold rounded-lg">One Way</button>
                        <button className="w-1/2 py-2 text-gray-600 font-semibold rounded-lg">By the Hour</button>
                    </div>
                    
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
                        <label htmlFor="destination" className="block text-gray-600">Where to?</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            className="w-full mt-2 p-3 border rounded-lg border-gray-300"
                            placeholder="Enter Destination Address"
                        />
                    </div>

                    <button type="submit" className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg">
                        GET MY PRICES
                    </button>
                </form>
            </div>
        </div>
    );
}
