import ChatBox from '../Components/Chatbot/Chatbot'

export default function RotaResponsavel() {
    return (
        <main className="bg-gradient-to-r from-gray-900 to-gray-500 h-screen">
            <div className=""><img className="w-190 pt-30 pl-20" src="/Mapa.png" alt="Perfil" /></div>
            <div><h1 className="absolute ml-190 -mt-80 text-white text-5xl">Rota do onibus escolar</h1></div>
             <ChatBox />
        </main>
    )
}