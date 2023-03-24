// import React, { useRef } from 'react';
// // import { Canvas } from 'react-three-fiber';
//
//
// interface ImageRendererProps {
//     matrix: number[][][];
// }
//
// export const ImageRenderer : React.FC<ImageRendererProps> = ({ matrix }) => {
//     const meshRef = useRef();
//
//     const colors = matrix.flat().map((pixel) => {
//         const r = pixel[0];
//         const g = pixel[1];
//         const b = pixel[2];
//         return `rgb(${r},${g},${b})`;
//     });
//
//     return (
//         <Canvas>
//             {/*<mesh ref={meshRef}>*/}
//             {/*    <planeBufferGeometry args={[matrix[0].length, matrix.length]} />*/}
//             {/*    <meshBasicMaterial vertexColors={true} />*/}
//             {/*    <bufferAttribute*/}
//             {/*        attachObject={['attributes', 'color']}*/}
//             {/*        count={colors.length}*/}
//             {/*        array={new Float32Array(colors.flatMap((color) => color.split(',').map(parseFloat)))}*/}
//             {/*        itemSize={3}*/}
//             {/*    />*/}
//             {/*/!*</mesh>*!/*/}
//         </Canvas>
//     );
// }
//
export {}
