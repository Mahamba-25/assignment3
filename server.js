const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.error('Connection error:', err));

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        const users = await User.find({ name: { $regex: query, $options: 'i' } });
        res.render('index', { users });
    } catch (error) {
        res.status(500).send('Error searching users.');
    }
});

router.get('/page/:page', async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    try {
        const users = await User.find().skip(skip).limit(limit);
        res.render('index', { users });
    } catch (error) {
        res.status(500).send('Error fetching users.');
    }
});

