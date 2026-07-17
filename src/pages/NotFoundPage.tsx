import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";

const NotFoundPage = () => {
  return (
    <PageTransition>
      <section className="page-section flex items-center justify-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />

        <div className="relative z-10 text-center max-w-lg">
          <h1 className="text-8xl sm:text-9xl font-display font-bold gradient-text mb-4">
            404
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Página não encontrada
          </p>
          <p className="text-gray-500 text-sm mb-8">
            A página que você procura não existe ou foi movida.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark text-white font-semibold rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Voltar ao início
          </Link>
        </div>
      </section>
    </PageTransition>
  );
};

export default NotFoundPage;
