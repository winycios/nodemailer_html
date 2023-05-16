const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/sendEmail', (req, res) => {
    const { name, email, select, message, attachmentData } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email',
            pass: 'senha app (google)', 
        }
    });


    const mailOptions = {
        from: 'email',
        to: 'destinatario',
        subject: select,
        html: `Olá ${name},\n\n ${message} \n\n ${email}
        \n\n\n\n`,

        attachments: [{
            path: attachmentData,
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Ocorreu um erro ao enviar o email.');
        } else {
            console.log('Email enviado: ' + info.response);
            res.send('Email enviado com sucesso!');
        }
    });
});

app.listen(4002, () => {
    console.log(`Servidor rodando na porta 4002`);
});
