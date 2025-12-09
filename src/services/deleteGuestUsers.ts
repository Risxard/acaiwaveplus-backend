import admin from "../config/firebaseAdmin";


export async function deleteGuestUsers() {
  console.log("🧹 [deleteGuestUsers] Iniciando limpeza...");

  const list = await admin.auth().listUsers();
  console.log("👥 [deleteGuestUsers] Total de usuários retornados:", list.users.length);

  const guestUsers = list.users.filter((user) => user.providerData.length === 0);

  console.log("🎯 [deleteGuestUsers] Guests encontrados:");
  guestUsers.forEach((u) => {
    console.log(`  - uid=${u.uid}, email=${u.email}, providerData.length=${u.providerData.length}`);
  });

  for (const user of guestUsers) {
    try {
      await admin.auth().deleteUser(user.uid);
      console.log(`✅ [deleteGuestUsers] Guest deletado: ${user.uid}`);
    } catch (err) {
      console.error(`❌ [deleteGuestUsers] Erro ao deletar ${user.uid}`, err);
    }
  }

  console.log("✨ [deleteGuestUsers] Limpeza concluída!");
}
