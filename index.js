const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const key = 'f6ef18ad4d55acb6daa70c1826976ee8c86ce6c0174e8bf9874889f1c2efd465'; // AES-256 encryption key

// Encrypt function
function encrypt(text) {
    let iv = crypto.randomBytes(16); // Ensure 16 bytes IV
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('base64') + ':' + encrypted.toString('base64'); // IV and encrypted data concatenated
}

// Decrypt function
function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'base64'); // Extracting the IV
    let encryptedText = Buffer.from(textParts.join(':'), 'base64');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// Endpoint implementations
app.post('/posts', async (req, res) => {
    try {
        const decryptedContent = JSON.parse(decrypt(req.body.content));
        const count = decryptedContent.count;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data.slice(0, count > response.data.length ? response.data.length : count);
        res.json({ content: encrypt(JSON.stringify(posts)) });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

app.post('/todos', async (req, res) => {
    try {
        const decryptedContent = JSON.parse(decrypt(req.body.content));
        const count = decryptedContent.count;
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = response.data.slice(0, count > response.data.length ? response.data.length : count);
        res.json({ content: encrypt(JSON.stringify(todos)) });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));