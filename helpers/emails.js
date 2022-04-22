import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    //   Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre} comprueba tu cuenta en UpTask.</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        </p>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>

        `
    })

}

export const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    //   Informacion del email
    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu password",
        text: "Reestablece tu password en UpTask",
        html: `<p>Hola: ${nombre} has solicitado reestablecer tu password.</p>
        <p>Sigue el siguiente enlace para generar el nuevo password: 
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
        </p>
        <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>

        `
    })

}