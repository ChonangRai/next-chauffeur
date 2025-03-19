"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Car = {
    name: string;
    price: number;
    image: string;
    features: string[];
};

export default function SelectCar() {
    const router = useRouter();

    
    const [cars, setCars] = useState<Car[]>([]);
    const searchParams = useSearchParams();
    const pickup = searchParams.get("pickup");
    const destination = searchParams.get("destination");

    // Mock function to simulate fetching available cars
    useEffect(() => {
        if (pickup && destination) {
            setCars([
                { name: "Mercedes E-Class", price: 120.77, image: "/e-class.jpg", features: ["First class chauffeur", "Free 60 mins airport waiting"] },
                { name: "Mercedes S-Class", price: 150.50, image: "/s-class.jpg", features: ["Luxury comfort", "WiFi included"] },
            ]);
        }
    }, [pickup, destination]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">Select Your Car</h1>
            <p className="text-gray-600">From <strong>{pickup}</strong> to <strong>{destination}</strong></p>

            <div className="grid gap-6 mt-6">
                {cars.map((car, index) => (
                    <div key={index} className="p-6 border rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">{car.name}</h2>
                        <img src={car.image} alt={car.name} className="w-full h-40 object-cover mt-2" />
                        <ul className="mt-3">
                            {car.features.map((feature, i) => (
                                <li key={i}>✅ {feature}</li>
                            ))}
                        </ul>
                        <p className="text-lg font-semibold mt-2">£{car.price.toFixed(2)}</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2">Select Car</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
