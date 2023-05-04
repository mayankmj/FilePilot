import mongoose from "mongoose";



const DBConnection = async (USERNAME,PASSWORD) =>{
    const MONGODB_URL=`mongodb://${USERNAME}:${PASSWORD}@ac-jcr0mwh-shard-00-00.zakykqz.mongodb.net:27017,ac-jcr0mwh-shard-00-01.zakykqz.mongodb.net:27017,ac-jcr0mwh-shard-00-02.zakykqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-m56sdv-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(MONGODB_URL,{useNewUrlParser: true})
        console.log('database connected succesfully');
    } catch (error) {
        console.error('error while connecting wiht db',error.message);
    }
}
export default DBConnection