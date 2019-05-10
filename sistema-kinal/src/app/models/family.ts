export class Family{
    constructor(
        public _id: string,
        public FamilyName: String,
        public Encargado: [{}],
        public Madre: [{}],
        public Padre: [{}],
        public Hijo: [{}]
    ){}
}