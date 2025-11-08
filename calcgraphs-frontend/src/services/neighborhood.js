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

export async function generatePath() {
    const response = await api.get('/generate/path');
    return response.data.items;
};