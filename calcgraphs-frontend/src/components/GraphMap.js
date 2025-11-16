import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import '@/styles/components.css';
import { getEdges, getVertices } from '@/services/neighborhood';

const VERTEX_RADIUS = 10;

const GraphMap = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);
    const [vertices, setVertices] = useState({});
    const [edges, setEdges] = useState([]);

    const clearData = () => {
        setStartNode(null);
        setEndNode(null);
    };

    useImperativeHandle(ref, () => ({
        clearData,
    }))

    useEffect(() => {
        const loadData = async () => {
            const v = await getVertices();
            const e = await getEdges();
            setVertices(v);
            setEdges(e);
        };
        loadData();
    }, [props.startNode, props.endNode, props.path]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || Object.keys(vertices).length === 0) return;

        const rect = canvas.parentNode.getBoundingClientRect();

        canvas.width = rect.width; 
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');

        const isPathEdge = (edge) => {
            if (!props.path || props.path.length === 0) return false;

            return props.path.some(pathEdge => {
                const start = edge.start;
                const end = edge.end;
                const pathStart = pathEdge.fromNode;
                const pathEnd = pathEdge.toNode;
                
                const match1 = start === pathStart && end === pathEnd;
                const match2 = start === pathEnd && end === pathStart; 
                
                return match1 || match2;
            });
        };

        const drawGraph = async () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            edges.forEach(edge => {
                const startPos = vertices[edge.start];
                const endPos = vertices[edge.end];

                if (!startPos || !endPos) return;

                let lineColor = '#858585ff';
                let lineWidth = 1;

                if (isPathEdge(edge)) {
                    lineColor = 'red'; 
                    lineWidth = 3;
                }

                ctx.beginPath();
                ctx.moveTo(startPos.x, startPos.y);
                ctx.lineTo(endPos.x, endPos.y);
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = lineWidth;
                ctx.stroke();

                const midX = (startPos.x + endPos.x) / 2;
                const midY = (startPos.y + endPos.y) / 2;

                const text = `${edge.distance}km`;

                ctx.fillStyle = 'black';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';

                let textMetrics = ctx.measureText(text);
                let textWidth = textMetrics.width;
                let textHeight = 12;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillRect(midX - textWidth / 2 - 2, midY - textHeight / 2 - 2, textWidth + 4, textHeight + 4);
                ctx.fillStyle = 'black';
                ctx.fillText(text, midX, midY + 4);
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
                ctx.fillText(label, pos.x, pos.y - 15);
            }
        };

        drawGraph();

    }, [vertices, edges, startNode, endNode, props.path]); 


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
                props.updateStartNode(clickedVertex);
            } else if (!endNode || clickedVertex !== startNode) {
                setEndNode(clickedVertex);
                props.updateEndNote(clickedVertex);
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
                <div className='log-properties'>
                    <p className='gray-line'> 
                        ponto inicial: {startNode}
                    </p>
                    <p className='white-line'>
                        ponto final: {endNode}
                    </p>
                    <p className='gray-line'>
                        algoritmo: {props.algorithm}
                    </p>
                </div>
                <br />
                <div className='log-box'>
                    { props.path?.map((p, index) => (
                            <div key={index}>
                                { p.logInformation }
                                <br />
                                <br />
                            </div>
                        )) 
                    }
                </div>
            </div>
        </div>
    );
});

export default GraphMap;