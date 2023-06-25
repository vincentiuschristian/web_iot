// Import library yang diperlukan
const express = require('express');
const { MongoClient } = require('mongodb');

// Inisialisasi Express
const app = express();
const port = 3000;

// Konfigurasi koneksi ke MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

// Menghubungkan ke MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

// Menghubungkan ke MongoDB saat server berjalan
connectToDatabase();

// Menentukan rute untuk menampilkan data dari MongoDB
app.get('/', async (req, res) => {
  try {
    // Mendapatkan koneksi ke database dan collection yang tepat
    const database = client.db('Firedect');
    const collection = database.collection('sensors');

    // Mengambil semua dokumen dari collection
    const data = await collection.find({}).toArray();

    // Menampilkan data menggunakan template EJS
    res.render('index.ejs', { data });
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB', error);
    res.sendStatus(500);
  }
});

// Menentukan folder publik untuk file-file statis (CSS, JS, dll.)
app.use(express.static('public'));

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
