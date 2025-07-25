"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const transition = {
	type: "spring",
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001,
};

// Dropdown Positions
const positions = {
	center: "left-1/2 -translate-x-1/2",
	left: "left-0",
	right: "-right-24",
};

type PositionType = "center" | "left" | "right";

export const MenuItem = ({
	setActive,
	active,
	item,
	children,
	position = "center",
}: {
	setActive: (item: string) => void;
	active: string | null;
	item: string;
	children?: React.ReactNode;
	position?: PositionType;
}) => {
	const positionClass = positions[position];

	return (
		<div onMouseEnter={() => setActive(item)} className="relative">
			<motion.p
				transition={{ duration: 0.3 }}
				className="cursor-pointer hover:opacity-[0.9] text-white flex items-center gap-1.5 text-sm"
			>
				{item}
				<ChevronDown
					className={cn("size-4", {
						"rotate-180 transition-all duration-150": active === item,
					})}
				/>
			</motion.p>
			{active !== null && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
				>
					{active === item && (
						<div
							className={cn(
								"absolute top-[calc(100%_+_1.55rem)] transform pt-2",
								positionClass
							)}
						>
							<motion.div
								transition={transition}
								layoutId="active" // layoutId ensures smooth animation
								className="bg-white dark:bg-black backdrop-blur-sm overflow-hidden shadow-xl"
							>
								<motion.div
									layout // layout ensures smooth animation
									className="w-max h-full p-4"
								>
									{children}
								</motion.div>
							</motion.div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export const Menu = ({
	setActive,
	children,
}: {
	setActive: (item: string | null) => void;
	children: React.ReactNode;
}) => {
	return (
		<nav
			onMouseLeave={() => setActive(null)} // resets the state
			className="hidden relative rounded-full dark:bg-black dark:border-white/[0.2] shadow-input lg:flex justify-center items-center space-x-9 pl-52 py-6"
		>
			{children}
		</nav>
	);
};

export const ProductItem = ({
	title,
	description,
	href,
	src,
}: {
	title: string;
	description: string;
	href: string;
	src: string;
}) => {
	return (
		<Link href={href} className="flex space-x-2">
			<Image
				src={src}
				width={140}
				height={70}
				alt={title}
				className="flex-shrink-0 rounded-md shadow-2xl"
			/>
			<div>
				<h4 className="text-xl font-bold mb-1 text-black dark:text-white">
					{title}
				</h4>
				<p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
					{description}
				</p>
			</div>
		</Link>
	);
};

export const HoveredLink = ({ children, ...rest }: any) => {
	return (
		<Link
			{...rest}
			className="text-neutral-700 dark:text-neutral-200 hover:text-primary"
		>
			{children}
		</Link>
	);
};
