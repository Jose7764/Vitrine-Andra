export function Footer() {
  return (
    <footer id="contato" className="border-t border-gold/20 bg-coffee text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="font-signature text-5xl text-gold-soft">Andra</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-cream/78">
            Uma coleção de livros digitais para aproximar o coração de Deus com
            beleza, cuidado e profundidade.
          </p>
        </div>
        <div className="text-sm text-cream/78 md:text-right">
          <p className="font-serif text-2xl text-ivory">Contato</p>
          <p className="mt-3">contato@andraexemplo.com</p>
          <p className="mt-2">Compras finalizadas com seguranca pela Hotmart.</p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/55">
        © 2026 Andra. Todos os direitos reservados.
      </div>
    </footer>
  );
}
