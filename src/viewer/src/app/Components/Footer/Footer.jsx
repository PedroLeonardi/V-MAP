export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-950 to-gray-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 text-center md:text-left">

        {/* Redes sociais */}
        <div>
          <h3 className="font-mono font-extrabold text-lg mb-2">Redes Sociais</h3>
          <ul className="space-y-1 text-sm text-gray-400 font-bold">
            <li>
              <a href="#" className="hover:text-white transition">bla bla</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">bla bla</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">bla bla</a>
            </li>
           
          </ul>
        </div>


        {/* Copyright */}
        <div className="md:col-span-1 flex flex-col justify-center items-center md:items-end">
          <span className="text-sm font-semibold text-gray-400">
            &copy; Vmap 2025. Todos os direitos reservados.
          </span>

        </div>
      </div>
    </footer>
  );
}
