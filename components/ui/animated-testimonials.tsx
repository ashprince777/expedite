"use client";

import {
	GetTestimonialQueryResult,
	internalGroqTypeReferenceTo,
	SanityImageCrop,
	SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
	testimonials,
	autoplay = false,
}: {
	testimonials: GetTestimonialQueryResult;
	autoplay?: boolean;
}) => {
	const [active, setActive] = useState(0);
	const [randomRotations, setRandomRotations] = useState<number[]>([]);

	useEffect(() => {
		// Generate random rotations ONCE when testimonials load
		const rotations = testimonials.map(
			() => Math.floor(Math.random() * 21) - 10
		);
		setRandomRotations(rotations);
	}, [testimonials]);

	const handleNext = () => {
		setActive((prev) => (prev + 1) % testimonials.length);
	};

	const handlePrev = () => {
		setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
	};

	const isActive = (index: number) => {
		return index === active;
	};

	useEffect(() => {
		if (autoplay) {
			const interval = setInterval(handleNext, 5000);
			return () => clearInterval(interval);
		}
	}, [autoplay]);

	return (
		<div className="mx-auto max-w-sm px-4 lg:py-16  font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 bg-gradient-to-b from-transparent to-primary/70 lg:from-primary/20 lg:bg-gradient-to-br shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
			<div className="relative grid grid-cols-1 gap-14 md:grid-cols-2">
				<div>
					<div className="relative h-80 w-full">
						<AnimatePresence>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.name}
									initial={{
										opacity: 0,
										scale: 0.9,
										z: -100,
										rotate: randomRotations[index] || 0,
									}}
									animate={{
										opacity: isActive(index) ? 1 : 0.7,
										scale: isActive(index) ? 1 : 0.95,
										z: isActive(index) ? 0 : -100,
										rotate: isActive(index) ? 0 : randomRotations[index] || 0,
										zIndex: isActive(index)
											? 40
											: testimonials.length + 2 - index,
										y: isActive(index) ? [0, -80, 0] : 0,
									}}
									exit={{
										opacity: 0,
										scale: 0.9,
										z: 100,
										rotate: randomRotations[index] || 0,
									}}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									className="absolute inset-0 origin-bottom"
								>
									<img
										src={
											testimonials[active]?.image
												? urlFor(testimonials[active]?.image).url()
												: ""
										}
										alt={testimonial.name ?? ""}
										width={500}
										height={500}
										draggable={false}
										className="h-full w-full object-cover object-center"
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>

				<div className="flex flex-col justify-between py-4">
					<motion.div
						key={active}
						initial={{
							y: 20,
							opacity: 0,
						}}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: -20,
							opacity: 0,
						}}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
						}}
					>
						<h3 className="text-xl lg:text-2xl font-bold text-black dark:text-white">
							{testimonials[active].name}
						</h3>
						<p className="text-sm text-gray-500 dark:text-neutral-500">
							{testimonials[active].role} at {testimonials[active].company}
						</p>

						<motion.p className="mt-8 text-sm lg:text-lg text-gray-700">
							{testimonials[active].quote?.split(" ").map((word, index) => (
								<motion.span
									key={index}
									initial={{
										filter: "blur(10px)",
										opacity: 0,
										y: 5,
									}}
									animate={{
										filter: "blur(0px)",
										opacity: 1,
										y: 0,
									}}
									transition={{
										duration: 0.2,
										ease: "easeInOut",
										delay: 0.02 * index,
									}}
									className="inline-block text-primaary"
								>
									{word}&nbsp;
								</motion.span>
							))}
						</motion.p>
					</motion.div>

					<div className="flex gap-4 pt-8 md:pt-0">
						<button
							onClick={handlePrev}
							className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 cursor-pointer"
						>
							<ArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
						</button>
						<button
							onClick={handleNext}
							className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 cursor-pointer"
						>
							<ArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
