import {H1} from "#root/components/ui/typography";
import {Link} from "@tanstack/react-router";

export const Header = () => {
	return (
		<header className="flex items-center justify-between p-4 w-full mb-5 shadow">
			<Link to="/">
				<H1>Proproducts</H1>
			</Link>
		</header>
	)
}