const app = require('./app');

const PORT = process.env.PORT || 4000;


app.listen(PORT, (err) => {

    if (err) console.log(err);

    console.log(`Server is running on port ${PORT}`);    
});