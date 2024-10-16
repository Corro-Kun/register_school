import mail from "nodemailer";

const transporter = mail.createTransport({
    service: "gmail",
    auth: {
        user: import.meta.env.SECRET_EMAIL,
        pass: import.meta.env.SECRET_EMAIL_PASSWORD
    }
});

function email(code: String, em: String){
    return{
        from: "sigma@manyanet.edu.co",
        to: `${em}`,
        subject: "Autenticación",
        html: `
            <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="512" align="center" style="margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto;width:512px;max-width:512px;background-color:#ffffff;padding:0px" >
              <tbody>
                <p style="font-size:16px;line-height:1.625;color:#51545e" >Hola querido padre</p>
                <p style="font-size:16px;line-height:1.625;color:#51545e" >Se te informa que se solicitó permiso para realizar una reserva de cupo</p>
                <p style="font-size:16px;line-height:1.625;color:#51545e" >Si no fuiste tú, no compartas este código con nadie.</p>
                <p style="font-size:16px;line-height:1.625;color:#000" >Codigo: ${code}</p>
                <p style="font-size:16px;line-height:1.625;color:#51545e" >Saludos cordiales,</p>
                <p style="font-size:16px;line-height:1.625;color:#51545e" >El equipo de Manyanet.</p>
              </tbody>
            </table>
        `
    }
}


export default function sendMail(code: String, em: String) {
    transporter.sendMail(email(code, em),(err, info) => {
    })
}