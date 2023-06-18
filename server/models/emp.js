import mongoose from "mongoose";

//All attributes in here 
const empSchema = mongoose.Schema({
    empid : {
        type: String,
    },
    name : {
        type: String,
    },
    nic : {
        type: String,
    },
    email : {
        type: String,
    },
    address : {
        type: String,
    },
    designation : {
        type: String
    },
    salary : {
        type: String,
    },
    phone : {
        type: String,
    },
    
});

const empModel = mongoose.model("emp", empSchema);
export default empModel;
