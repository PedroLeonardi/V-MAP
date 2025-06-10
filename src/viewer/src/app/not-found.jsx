export default function not() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80 brightness-140"
        >
          <source src="/404-Not-Found.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
        </div>
    )
}