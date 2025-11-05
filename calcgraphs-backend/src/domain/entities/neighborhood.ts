export type NeighborhoodProps = {
    name: string;
    coordinateId: number;
}

export class NeighborhoodEntity {
    private name: string;
    private coordinateId: number;

    constructor(props: NeighborhoodProps) {
        this.validate(props);

        this.name = props.name;
        this.coordinateId = props.coordinateId;
    }

    validate(props: NeighborhoodProps) {
        if (props.name.length < 1 || props.name.length > 50) {
            throw new Error('The name property must be have 1 - 50 characters');
        }

        if (!props.coordinateId || props.coordinateId < 1) {
            throw new Error('The coordinateId is mandatory');
        }
    }

    get getName(): string {
        return this.name;
    }

    get getCoordinateId(): number {
        return this.coordinateId;
    }
}