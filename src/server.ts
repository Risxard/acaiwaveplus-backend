import app from './app'
import { initDeleteGuestsCron } from './cron/deleteGuestsCron'

const PORT = process.env.PORT || 3000


initDeleteGuestsCron()
console.log('Cron de exclusão de convidados iniciado🗑️')

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}🚀`)
})
