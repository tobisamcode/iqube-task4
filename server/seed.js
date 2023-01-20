import Apartment from "./models/Apartment";

const apartmentsData = [{
        address: "Apartment address 1",
    },

    {
        address: "Apartment address 2",
    },

    {
        address: "Apartment address 3",
    },

    {
        address: "Apartment address 4",
    },

    {
        address: "Apartment address 5",
    },

    {
        address: "Apartment address 6",
    },

    {
        address: "Apartment address 7",
    },
];

export default async function seedData() {
    await Apartment.deleteMany({});
    await Apartment.insertMany([...apartmentsData]);
    console.log("seed done!");
}