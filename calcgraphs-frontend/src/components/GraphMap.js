import React, { useRef, useEffect, useState } from 'react';
import '@/styles/components.css';
import { vertices, edges } from '@/config/graph'; 

const VERTEX_RADIUS = 10;

const GraphMap = () => {
    const canvasRef = useRef(null);
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.parentNode.getBoundingClientRect();

        canvas.width = rect.width; 
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');

        const drawGraph = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            edges.forEach(edge => {
                const startPos = vertices[edge.start];
                const endPos = vertices[edge.end];

                ctx.beginPath();
                ctx.moveTo(startPos.x, startPos.y);
                ctx.lineTo(endPos.x, endPos.y);
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            for (const label in vertices) {
                const pos = vertices[label];
                
                let fillColor = 'white';
                if (label === startNode) fillColor = 'green'; 
                if (label === endNode) fillColor = 'red';     

                ctx.beginPath();
                ctx.arc(pos.x, pos.y, VERTEX_RADIUS, 0, 2 * Math.PI);
                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.stroke(); 
                
                ctx.fillStyle = 'black';
                ctx.font = '12px Arial';
                ctx.fillText(label, pos.x + 15, pos.y + 5);
            }
        };

        drawGraph();

    }, [startNode, endNode]); 


    const findClickedVertex = (x, y) => {
        for (const label in vertices) {
            const pos = vertices[label];
            const distanceSquared = (x - pos.x) ** 2 + (y - pos.y) ** 2;
            if (distanceSquared < VERTEX_RADIUS ** 2) {
                return label; 
            }
        }
        return null;
    };
    
    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        const clickedVertex = findClickedVertex(mouseX, mouseY);
        
        if (clickedVertex) {
            if (!startNode) {
                setStartNode(clickedVertex);
                console.log('Início:', clickedVertex);
            } else if (!endNode || clickedVertex !== startNode) {
                setEndNode(clickedVertex);
                console.log('Fim:', clickedVertex);
            }
        }
    };


    return (
        <div className='graph-map__container'>
            <div className='graph-map__map'>
                <div className='graph-map__title'>
                    GraphMap
                </div>
                <div className='graph-map__map-canva'>
                    <canvas 
                        ref={canvasRef} 
                        onClick={handleCanvasClick}
                        id='graphMap' 
                    />
                </div>
            </div>

            <div className='graph-map__algorithm-log'>
                <div className='graph-map__title'>
                    Logs do algoritmo
                </div>
            </div>
        </div>
    );
};

export default GraphMap;