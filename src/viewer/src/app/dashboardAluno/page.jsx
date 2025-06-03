export default function DashboardPage() {
  return (
  <main className="bg-gradient-to-r from-gray-300 to-gray-400 h-screen">
    <div>
        <h1 className="text-black text-7xl pt-15 ml-10">Bem vindo ao V-MAP</h1>
        <h2 className="text-black text-xl pt-5 ml-10"> Aqui você pode acompanhar seu onibus escolar de forma rápida e simples!</h2>
        <p className="text-black text-lg pt-10 ml-10"> Com um sistema de rastreamento, nós te oferecemos a localização em tempo real do seu onibus em relação a você.<br />
        Agora se atrasar não é mais opção, utilizando o V-MAP você pode sempre chegar no horário.</p>
    </div>
    <div><img className="w-220" src="/Aluno.png" alt="aluno"></img></div>
  </main>
  )
}