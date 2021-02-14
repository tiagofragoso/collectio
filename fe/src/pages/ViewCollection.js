import React, { useEffect, useState } from "react";

export const ViewCollection = (props) => {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState({});

	const url = `${process.env.REACT_APP_API_URL}/collections/${props.id}`;
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url);
				if (res.status !== 200) {
					setError(true);
					setLoading(false);
					return;
				}
				setData(await res.json());
				setLoading(false);
			} catch (err) {
				console.error(err);
				setError(true);
				setLoading(false);
			}
		}
		fetchData();
	}, [url]);
	
	return (
		<div>
		{ loading && <p>loading</p> }
		{ error && <p>error</p> }
		{!loading && !error && data && <div>
				<h2>{data.name}</h2>
				{data.items.map(({label, url}, index) => <p key={index}>{index+1}. <a href={url}>{label}</a></p>)}
			</div>
		}
		</div>
	);
}

export default ViewCollection;