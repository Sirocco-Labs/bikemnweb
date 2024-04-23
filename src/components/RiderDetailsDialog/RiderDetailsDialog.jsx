import { useEffect, useState } from "react";
import styles from "../../app/page.module.css";
import RiderDemoDetails from "../RiderDemoDetails/RiderDemoDetails";

import RiderScreeningDetails from "../RiderScreeningDetails/RiderScreeningDetails";
import RiderStatsDetails from "../RiderStatsDetails/RiderStatsDetails";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

export default function RiderDetailsDialog({ rider }) {
	const views = {
		demo: "demo",
		screening: "screening",
		stats: "stats",
	};
	const [show, setShow] = useState(0);

	const { screening, demographics, addresses, stats, challenges } = rider;

	// const panels = {
	// 	demo: (RiderDemoDetails) => (
	// 		<RiderDemoDetails demo={{demographics_data_junction, addresses_junction}} />
	// 	),
	// 	screening: (RiderScreeningDetails) => (
	// 		<RiderScreeningDetails screening={screening_data_junction} />
	// 	),
	// 	stats: (RiderStatsDetails) => (
	// 		<RiderStatsDetails
	// 			stats={{
	// 				travel_stats_junction,
	// 				user_incentive_tracking_junction,
	// 			}}
	// 		/>
	// 	),
	// };
	// const [panel, setPanel] = useState(panels);

	const CurrentView = () => {
		switch (show) {
			case 0:
				return <RiderDemoDetails demo={{ demographics, addresses }} />;
			case 1:
				return <RiderScreeningDetails screening={screening} />;
			case 2:
				return (
					<RiderStatsDetails
						details={{
							stats,
							challenges,
						}}
					/>
				);
		}
	};
	const handleBack = () => {
		show > 0
			? setShow((last) => (last -= 1))
			: setShow((last) => (last += 0));
	};
	const handleForward = () => {
		show < 2
			? setShow((last) => (last += 1))
			: setShow((last) => (last += 0));
	};

	return (
		<>
			<RiderDemoDetails
				rider={rider}
			/>
			
		</>
	);
}
