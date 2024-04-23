import { supabase } from "@/utils/supabase/supabase";

import { setOrgBikes, setOrgInfo, setOrgStaff } from "../slices/orgSlice";

export const getOrgInfo = () => async (dispatch) => {
	console.log("IN ORG THUNK ----> getOrgInfo(): ");
	try {
		const countIssued = await supabase.from("issued_bikes").select("*");

		if (countIssued.error) {
			console.log("SUPABASE COUNT ORG BIKES ERROR!: ", countIssued.error);
		} else {
			console.log(
				"SUPABASE COUNT ORG BIKES SUCCESS!: ",
				countIssued.data
			);
			for (let i = 0; i < countIssued.data.length; i++) {
				let updateItem = countIssued.data[i];

				const updateIssued = await supabase
					.from("partner_organizations")
					.update({
						bikes_issued_total: updateItem.bikes_issued_total,
					})
					.eq("id", updateItem.id);
				if (updateIssued.error) {
					console.log(
						"SUPABASE UPDATE ISSUED ORG BIKES ERROR!: ",
						updateIssued.error
					);
				} else {
					console.log(
						"SUPABASE UPDATE ISSUED ORG BIKES SUCCESS!: ",
						updateIssued.data
					);
				}
			}

			const orgInfo = await supabase
				.from("partner_organizations")
				.select("*")
				.order("id", { ascending: true });
			if (orgInfo.error) {
				console.log("SUPABASE GET ORG INFO ERROR!: ", orgInfo.error);
			} else {
				console.log("SUPABASE GET ORG INFO SUCCESS!: ", orgInfo.data);
				dispatch(setOrgInfo(orgInfo.data));
			}
		}
	} catch (error) {
		console.log("ORG THUNK ERROR --> getOrgInfo():", error);
	}
};
export const getOrgBikes = () => async (dispatch) => {
	console.log("IN ORG THUNK ----> getOrgBikes(): ");
	try {
		const orgBikes = await supabase
			.from("bike_registration_junction")
			.select(
				`
             id,
             bikes:bike_id(
                id,
                nickname,
                make,
                color,
                serial_number,
                notes
             ),
             org:org_id(
                name
             ),
             in_use,
             check_out_date,
             return_by,
             appUser:checked_out_by(
                first_name,
                last_name
             )
  `
			)
			.order("id", { ascending: true });
		if (orgBikes.error) {
			console.log("SUPABASE GET ORG BIKES ERROR!: ", orgBikes.error);
		} else {
			console.log("SUPABASE GET ORG BIKES SUCCESS!: ", orgBikes.data);
		}
		dispatch(setOrgBikes(orgBikes.data));
	} catch (error) {
		console.log("ORG THUNK ERROR --> getOrgBikes():", error);
	}
};

export const getOrgStaff = () => async (dispatch) => {
	console.log("IN ORG THUNK ----> getOrgStaff(): ");
	try {
		const orgStaff = await supabase
			.from("users")
			.select(
			`
            	id,
            	org:org_id(
            	   id,
            	   name
            	),
            	first_name,
            	last_name
            	)
 			 `
			)
			.order("id", { ascending: true });
		if (orgStaff.error) {
			console.log("SUPABASE GET ORG STAFF ERROR!: ", orgStaff.error);
		} else {
			console.log("SUPABASE GET ORG STAFF SUCCESS!: ", orgStaff.data);
			dispatch(setOrgStaff(orgStaff.data))
		}
	} catch (error) {
		console.log("ORG THUNK ERROR --> getOrgStaff():", error);
	}
};


export const addNewOrg = (formData) =>async(dispatch)=>{
	console.log("IN ORG THUNK ----> addNewOrg(formData): ", formData);
	try {
		const newOrg = await supabase
			.from("partner_organizations")
			.insert(formData).select()
		if (newOrg.error) {
			console.log("SUPABASE ADD NEW ORG ERROR!: ", newOrg.error);
		} else {
			console.log("SUPABASE ADD NEW ORG SUCCESS!: ", newOrg.status, newOrg.data);
			dispatch(getOrgInfo());
		}
	} catch (error) {
		console.log("ORG THUNK ERROR --> addNewOrg(formData):", error);
	}

}