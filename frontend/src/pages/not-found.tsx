import {Link} from "@tanstack/react-router";
import {H2} from "#root/components/ui/typography.tsx";
import {ArrowLeft} from "lucide-react";

export function NotFound() {
	return (
		<div className="flex items-center justify-center flex-wrap gap-3">
			<div>
				<H2>La ressource demandée n'a pas été trouvée</H2>
				<Link to="/" className="flex items-centert gap-3">
					<ArrowLeft size={24} />
					Retour à la page d'accueil
				</Link>
			</div>
			<img src="/404.png" alt="Image d'un chat qui pleure - 404" className="w-96" />
		</div>
	)
}