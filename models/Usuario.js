import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Crea dos columnas mas, una de creado y otra de actualizado
    timestamps: true,
  }
);

usuarioSchema.pre('save', async function(next){
  // Revisa que el password no sea cambiado por ejemplo cuando edito mi perfil
  if(!this.isModified('password')){
    next
  }
  const salt = await bcrypt.genSalt(10)
  this.password =await bcrypt.hash(this.password, salt)
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
