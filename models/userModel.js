const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const projectSchema = mongoose.Schema(
    {
        name:{
            type: String
        },
        description:{
            type: String
        },
        accepted:{
            type:Boolean,
            default:false
        },
        fa_applied:{
            type:String,
            default:"none"
        },
        funds_proposed:{
            type: Number
        },
        funds_approved:{
            type: Number
        },
        funds_used:{
            type: Number
        },
        category:{
            type: Boolean,  //true for public, false for private
            default: false
        },
        status:{
            type:String,
            default:"none"
        },
        duration:{
            type: Number
        }
    },
    {
        timestamps: true,
    }
);

const applySchema = mongoose.Schema(
    {
        hei:{
            type:String
        },
        project:new Array(String)
        // project:{
        //     type:String
        // }
    },
    {
        timestamps: true,
    }
);

const userSchema = mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    fa_category:{    
        type: String,    //private, government, government-aided
        default: "N/A"
    },
    fa_applications:new Array(applySchema),
    project: new Array(projectSchema),    
},
{
    timestamps: true,
}
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;

