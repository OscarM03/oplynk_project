"use client";
// import { TrendingUp } from "lucide-react";
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatter, imageUrl } from "@/lib/utils";
import Image from "next/image";
import { appwriteconfig } from "@/lib/appwrite/config";

// Calculate the percentage of the target achieved
const calculatePercentage = (contributed: number, target: number) => {
	return Math.min((contributed / target) * 100, 100); // Cap at 100%
};

const ContributionChart = ({ target, contributed, gifts }: { target: number; contributed: number; gifts: string[] }) => {
	const percentage = calculatePercentage(contributed, target);

	const chartData = [
		{
			label: "Contributed",
			value: percentage,
			fill: "#209CFF", // Contribution progress color
		},
	];

	const chartConfig = {
		contributed: {
			label: "Amount Contributed",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex max-xl:flex-col items-center border-none rounded-lg h-full">
			<CardHeader className="items-center justify-center pb-10 w-[40%] max-xl:w-full">
				<CardTitle className="text-3xl font-extrabold">Contribution Progress</CardTitle>
				<CardDescription className="textcolor font-extrabold text-md">
					$ {formatter.format(contributed)} / $ {formatter.format(target)} (Target)
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[130px]"
				>
					<RadialBarChart
						data={chartData}
						startAngle={90}
						endAngle={90 + percentage * 3.6} // Convert percentage to angle (0–360)
						innerRadius={45}
						outerRadius={70}
					>
						<PolarGrid
							gridType="circle"
							radialLines={false}
							stroke="none"
							className="first:fill-muted last:fill-background"
							polarRadius={[86, 74]}
						/>
						<RadialBar dataKey="value" background cornerRadius={10} />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-2xl font-bold"
												>
													{Math.round(percentage)}%
												</tspan>
												{/* <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Contributed
                        </tspan> */}
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
				<CardFooter className=" gap-2 text-sm">
					<div className="leading-none text-gray-900 font-medium text-center">
						Showing contribution progress towards the target
					</div>
				</CardFooter>
			</CardContent>

			<div className="w-[30%] max-xl:w-full text-center max-xl:mt-6 ">
				<h1 className="text-black font-extrabold text-2xl">Gifts Received</h1>
				<div className="flex justify-center space-x-2 overflow-hidden overflow-x-scroll remove-scrollbar mt-4">
				{gifts.length > 0 && (
					gifts.map((gift) => (
						<div
							key={gift}
							className="flex-none flex items-center gap-2">
							<Image
								src={imageUrl(appwriteconfig.giftsBucketId, gift)}
								alt="gift"
								width={60}
								height={60}
								className="transform transition duration-300 hover:scale-110"
							/>
						</div>
					))
				)}
				</div>
			</div>


		</Card>
	);
}

export default ContributionChart;
