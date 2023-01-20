import Apartment from "../models/Apartment";

export const getApartments = async (req, res) => {
  const data = await Apartment.find({});
  return res.status(200).json({
    data
  })
}