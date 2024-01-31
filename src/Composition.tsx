import {AbsoluteFill} from 'remotion';
import {useCallback, useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';

const MEASURER_SIZE = 10;

export const MyComposition = () => {
	const ref = useRef<HTMLDivElement>(null);
	const measurer = useRef<HTMLDivElement>(null);

	const [dimensions, setSimensions] = useState<{
		correctedHeight: number;
		correctedWidth: number;
	} | null>(null);

	const measure = useCallback(() => {
		if (!ref.current || !measurer.current) {
			return;
		}

		const rect = ref.current.getBoundingClientRect();
		const measurerRect = measurer.current.getBoundingClientRect();
		const scale = MEASURER_SIZE / measurerRect.width;

		setSimensions({
			correctedHeight: rect.height * scale,
			correctedWidth: rect.width * scale,
		});
	}, []);

	useEffect(() => {
		measure();
	}, [measure]);

	return (
		<AbsoluteFill>
			<div ref={ref}>Hello World!</div>
			<div
				ref={measurer}
				style={{
					width: MEASURER_SIZE,
					position: 'fixed',
					top: -99999,
				}}
			/>
		</AbsoluteFill>
	);
};
