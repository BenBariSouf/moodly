import { useState, useEffect } from "react";
import styled from "styled-components";
import { useWindowWidth } from "@react-hook/window-size";
import { useDispatch } from "react-redux";
import { setAudioProperties } from "../reducers/spotifyReducer";
import MoodIcon from "./MoodIcon";

const Square = styled.div`
	height: ${({ size }) => size}px;
	width: ${({ size }) => size}px;
	border: 1px solid white;
	border-radius: 20px;
	position: relative;
	margin: 2rem 0 4rem 0;
	@media only screen and (max-width: 600px) {
		margin: 1.5rem;
	}
	touch-action: none;
`;

const Label = styled.div`
	font-size: ${({ fontSize }) => fontSize}px;
`;

const xLabel = styled(Label)`
	width: 100%;
	text-align: center;
`;

const yLabel = styled(Label)`
	position: absolute;
	top: ${({ squareSize }) => squareSize / 2 - 8}px;
`;

const TopLabel = styled(xLabel)`
	position: relative;
	font-weight: 900;
	font-size: 1.125rem;
	top: ${({ fontSize }) => -1.6 * fontSize}px;
`;

const BottomLabel = styled(xLabel)`
	position: absolute;
	top: ${({ squareSize }) => squareSize + 8}px;
	font-weight: 900;
	font-size: 1.125rem;
`;

const LeftLabel = styled(yLabel)`
	left: ${({ fontSize }) => -2.8 * fontSize}px;
	font-weight: 900;
	font-size: 1.125rem;
`;

const RightLabel = styled(yLabel)`
	left: ${({ squareSize }) => squareSize + 8}px;
	font-weight: 900;
	font-size: 1.125rem;
`;

const MoodIconWrapper = styled.div`
	position: absolute;
	${({ x, y, squareSize, circleSize }) => `
    top: ${y * squareSize - circleSize / 2}px;
    left: ${x * squareSize - circleSize / 2}px;
  `}
	cursor: pointer;
	touch-action: none;
`;

const normalizeCoord = (coord, squareSize, circleSize) => Math.min(Math.max(0 + circleSize / 2, coord), squareSize - circleSize / 2) / squareSize;

const MoodSelector = () => {
	const dispatch = useDispatch();
	const [isPointerDown, setPointerDown] = useState(false);
	const [{ x, y }, setCoords] = useState({ x: 0.5, y: 0.5 });
	const windowWidth = useWindowWidth();
	const squareSize = Math.min(350, 0.7 * windowWidth);
	const circleSize = squareSize / 9;

	useEffect(() => {
		const mouseUpHandler = () => {
			if (isPointerDown) {
				setPointerDown(false);
				const audioProperties = {
					valence: x,
					energy: 1 - y,
				};
				dispatch(setAudioProperties(audioProperties));
			}
		};
		document.addEventListener("pointerup", mouseUpHandler);
		return () => document.removeEventListener("pointerup", mouseUpHandler);
	}, [isPointerDown, x, y, dispatch]);

	const labelProps = {
		squareSize,
		fontSize: squareSize / 18.5,
	};

	const moveMoodIcon = (pointerEvent) => {
		const rect = pointerEvent.currentTarget.getBoundingClientRect();
		const x = normalizeCoord(pointerEvent.clientX - rect.left, squareSize, circleSize);
		const y = normalizeCoord(pointerEvent.clientY - rect.top, squareSize, circleSize);
		setCoords({ x, y });
	};

	return (
		<Square
			onPointerDown={(e) => {
				e.preventDefault();
				setPointerDown(true);
				moveMoodIcon(e);
			}}
			onPointerMove={(e) => {
				e.preventDefault();
				if (isPointerDown) {
					moveMoodIcon(e);
				}
			}}
			size={squareSize}
		>
			<TopLabel {...labelProps}>Energetic</TopLabel>
			<BottomLabel {...labelProps}>Calm</BottomLabel>
			<LeftLabel {...labelProps}>Sad</LeftLabel>
			<RightLabel {...labelProps}>Happy</RightLabel>
			<MoodIconWrapper x={x} y={y} pointerDown={isPointerDown} squareSize={squareSize} circleSize={circleSize}>
				<MoodIcon size={circleSize} valence={x} energy={1 - y} />
			</MoodIconWrapper>
		</Square>
	);
};

export default MoodSelector;
