import { Link } from "react-router-dom"

export const FeaturedCard = ({
	title,
	href,
}: {
	title: string
	href: string
}) => {
	return (
		<Link to={href} className="block">
			<div
				className="group w-[320px] h-[320px] rounded-2xl
					bg-black/60 backdrop-blur-md
					border border-white/10
					flex items-center justify-center
					transition-colors duration-300
					hover:bg-black/70 hover:border-white/20"
			>
				<span
					className="text-white text-3xl font-semibold tracking-wide
						relative
						after:absolute after:left-0 after:-bottom-1
						after:h-[2px] after:w-0 after:bg-white
						after:transition-all after:duration-300
						group-hover:after:w-full"
				>
					{title}
				</span>
			</div>
		</Link>
	)
}




