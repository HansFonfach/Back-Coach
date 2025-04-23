import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hans.fonfach@gmail.com",
    pass: "psuheuqcptcyfnbz",
  },
});

export const sendEmail = async (req, res) => {
  const { email, mensaje, nombre, apellido } = req.body;

  try {
    const info = await transporter.sendMail({
      from: email,
      to: "hans.fonfach@gmail.com", // te lo mandás a vos mismo
      replyTo: email, // este es el correo real del visitante
      subject: "Contacto pagina web",
      text: `Estimado Jaime Rojas, le escribe ${nombre} ${apellido}.\n
             Me comunico con usted para:\n
             ${mensaje}\n\n
             Quedo atento/a a su respuesta.\n
             Saludos cordiales.`,
    });
    
    console.log("Mensaje enviado:", info.messageId);
    res.status(200).json({ message: "Correo enviado exitosamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo" });
  }
};

