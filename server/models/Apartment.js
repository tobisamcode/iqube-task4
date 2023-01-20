import mongoose from "mongoose";

const apartmentSchema = mongoose.Schema({

  address: {
    type: String,
    required: true
  }
})

export default mongoose.model("Apartment", apartmentSchema);