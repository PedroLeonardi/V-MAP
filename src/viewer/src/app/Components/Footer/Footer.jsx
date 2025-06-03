export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4 lg:grid-cols-4">
        {/* Logo e descrição */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <img 
              src="./Logo.png" 
              alt="Logo" 
              className="h-20 w-18 mr-3"
            />
            <span className="text-2xl font-bold text-white">
              VMAP
            </span>
          </div>
          <p className="text-gray-300 font-bold text-sm text-center md:text-left max-w-md lg:text-[20px]">
            Sistema de Gestão de Transporte Escolar
          </p>
        </div>

     
        <div>
          <h3 className="font-bold text-lg mb-4 text-center md:text-left relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 md:after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r from-blue-400 to-purple-500">
            Redes Sociais
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {['Instagram', 'Twitter', 'LinkedIn', 'Facebook'].map((social) => (
              <li key={social}>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {social}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-center md:text-left relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 md:after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r from-blue-400 to-purple-500">
            Links Úteis
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {['Termos de Uso', 'Política de Privacidade', 'FAQ'].map((link) => (
              <li key={link}>
                <a 
                  href="#" 
                  className="hover:text-white transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* copyright */}
        <div className="md:col-span-4 lg:col-span-5 border-t border-gray-700 pt-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-sm text-gray-400 mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} VMAP. Todos os direitos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}