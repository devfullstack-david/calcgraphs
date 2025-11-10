import api from "@/config/api"

export async function getVertices() {
    const response = await api.get('/neighborhood');
    const vertices = {};
    response.data.items.forEach(item => {
        vertices[item.name] = {
            x: item.x,
            y: item.y
        }
    });
    
    return vertices;
}

export async function getEdges() {
    const response = await api.get('/paths');
    return response.data.items;
}

export async function generatePath(start, final, algorithm, transport) {
    const response = await api.get('/calculate/path', {
        params: {
            start, 
            final,
            algorithm,
            transport
        }
    });
    
    return response.data.items;
};