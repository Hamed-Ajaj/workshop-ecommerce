import { Button } from "../ui/button.tsx"
import { ArrowRight } from "lucide-react"
export const Hero = () => {
	return (
		<div className="relative h-80 md:h-[500px] lg:h-[600px] p-0 m-0 bg-black w-full">
			<div className="flex flex-col justify-center items-center gap-4 md:gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 w-full max-w-4xl mx-auto">
				<h1 className="text-white font-bold uppercase text-3xl md:text-5xl lg:text-6xl text-center">Summer <br /> collection<br /> 2026<br /></h1>
				<p className="text-gray-400 text-sm md:text-lg lg:text-xl text-center">Discover the latest trends in fashion, Redefine your style with our exclusive new arrivals.</p>
				<div>
					<Button className="bg-blur flex gap-2 items-center cursor-pointer px-6 md:px-10 py-3 md:py-4 border border-white rounded-full bg-white/20 backdrop-blur-lg text-white text-sm md:text-base"><span>Shop Now</span><ArrowRight size={8} className="md:w-4" /></Button>
				</div>
			</div>
		</div>
	)
}
