export type NeighborhoodPathProps = {
    start: string;
    end: string;
    distance: number;
}

export class NeighborhoodPathEntity {
    private start: string;
    private end: string;
    private distance: number;

    constructor (props: NeighborhoodPathProps) {
        this.validate(props);

        this.start = props.start;
        this.end = props.end;
        this.distance = props.distance;
    }

    private validate(props: NeighborhoodPathProps) {
        if (props.start.length < 1) {
            throw new Error('The start property must be have more than 0 characters');
        }

        if (props.end.length < 1) {
            throw new Error('The end property must be have more than 0 characters');
        }

        if (props.distance < 0) {
            throw new Error('Distance cannot negative');
        }
    }

    get getStart(): string {
        return this.start;
    }

    get getEnd(): string {
        return this.end;
    }

    get getDistance(): number {
        return this.distance;
    }
}