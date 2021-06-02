const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '60a90887f6033716f4c4bffc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum exercitationem possimus quis aliquam recusandae natus debitis repellat sequi facilis eos dolorum commodi cumque, mollitia praesentium asperiores obcaecati laboriosam suscipit molestias!',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/daifm4b7p/image/upload/v1622116039/YelpCamp/ph28o2s8gsmigtapkvsc.jpg',
                    filename: 'YelpCamp/ph28o2s8gsmigtapkvsc'
                },
                {
                    url: 'https://res.cloudinary.com/daifm4b7p/image/upload/v1622116039/YelpCamp/xzdzkzsoxgrrb371lz1z.jpg',
                    filename: 'YelpCamp/xzdzkzsoxgrrb371lz1z'
                }
              ]
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})