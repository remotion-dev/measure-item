const MEASURER_SIZE = 10;

type Result = {
	getBoundingClientRectHeight: number;
	getBoundingClientRectWidth: number;
	correctedHeight: number;
	correctedWidth: number;
};

import {AbsoluteFill} from 'remotion';
import {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';

export const MyComposition = () => {
	const ref = useRef<HTMLDivElement>(null);
	const measurer = useRef<HTMLDivElement>(null);

	const [state, setState] = useState<Result | null>(null);

	const measure = useCallback(() => {
		const {current} = ref;
		const measurerCurrent = measurer.current;
		if (!current || !measurerCurrent) {
			return;
		}

		const rect = current.getBoundingClientRect();
		const measurerRect = measurerCurrent.getBoundingClientRect();
		const scale = MEASURER_SIZE / measurerRect.width;
		const correctedHeight = rect.height * scale;
		const correctedWidth = rect.width * scale;

		setState({
			getBoundingClientRectHeight: rect.height,
			getBoundingClientRectWidth: rect.width,
			correctedHeight,
			correctedWidth,
		});
	}, []);

	useEffect(() => {
		const interval = setInterval(measure, 200);
		return () => {
			clearInterval(interval);
		};
	}, [measure]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'sans-serif',
			}}
		>
			<div
				ref={ref}
				style={{
					border: '3px solid black',
					fontSize: 100,
					display: 'inline-block',
				}}
			>
				Hello World!
			</div>
			<div
				ref={measurer}
				style={{
					height: MEASURER_SIZE,
					width: MEASURER_SIZE,
					position: 'fixed',
					top: -99999,
				}}
			/>
			{state ? (
				<div
					style={{
						background: 'black',
						color: 'white',
						padding: 10,
						fontSize: 30,
						textAlign: 'center',
					}}
				>
					getBoundingClientRect(): {state.getBoundingClientRectWidth.toFixed(0)}
					x{state.getBoundingClientRectHeight.toFixed(0)} <br />
					Natural size: {state.correctedWidth.toFixed(0)}x
					{state.correctedHeight.toFixed(0)}
				</div>
			) : null}
		</AbsoluteFill>
	);
};
