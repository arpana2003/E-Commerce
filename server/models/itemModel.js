import {Schema , model} from "mongoose";

const itemSchema= new Schema({
    Category:{
        type:String,
        required: [true,"Category of item is required"],
    },
    description:String,
    thumbnail:{
        public_id:{
            type: String,
            required: true,
        },
        secure_url:{
            type: String,
            required: true,
        }
    },
    items: [{
        title: String,
        description: String,
        cost: Number,
        itemImage:{
            public_id:{
                type:String,
                required:true,
            },
            secure_url:{
                type:String,
                required:true,
            }
        },
        numberOfOrders:{
            type:Number,
            default:0,
        },
        createdBy:{
            type:String,
            required:true
        }
    }],
},{
    timestamps: true
});

const Item=model('Item',itemSchema);
export default Item ;